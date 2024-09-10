import logging
import os
import pathlib

import pandas as pd
from transformers import AutoModel, AutoTokenizer
import torch
import json
import torch.nn.functional as F
from torch import Tensor
import requests




class MessageService:
    def __init__(self):
        logging.info("Инициализация")
        PROJECT_DIR = pathlib.Path(__file__).parent.parent.parent.resolve()
        filepath = os.path.join(f"{PROJECT_DIR}/data/chunk_df.csv")
        with open(filepath, "r", encoding="utf-8") as f:
            df = pd.read_csv(f)

            self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
            self.model = AutoModel.from_pretrained('intfloat/multilingual-e5-base').to(self.device)
            self.tokenizer = AutoTokenizer.from_pretrained('intfloat/multilingual-e5-base')
            self.embeddings = torch.vstack([torch.Tensor(json.loads(emb)) for emb in df.embeds])
            self.chunks = df['text'].tolist()
            self.llm_prompt = "Ты выступаешь как LLM для RAG. Я подам тебе вопрос, а также фрагменты документации, в них " \
                              "может содержаться ответ " \
                              "на него. Проанализируй эти фрагменты и попробуй найти точный ответ на поставленный вопрос." \
                              "\n\nВопрос: \n{question} \n\nФрагменты из документации:\n\n {chunks}" \
                              "\n\nЕсли во фрагментах содержится точный ответ на вопрос, ответь на него согласно документации," \
                              " ни в коем случае не упусти важных деталей, в этой задаче важно соблюдения точности. " \
                              "Если точного ответа нет, первым делом скажи: 'Я не могу найти точный ответ на данный вопрос.'" \
                              " После этого попробуй описать релевантную вопросу информацию, которая у тебя есть."
            logging.info("Инициализация завершена")

    async def _average_pool(self, last_hidden_states: Tensor,
                            attention_mask: Tensor) -> Tensor:
        last_hidden = last_hidden_states.masked_fill(~attention_mask[..., None].bool(), 0.0)
        return last_hidden.sum(dim=1) / attention_mask.sum(dim=1)[..., None]

    async def _get_query_embedding(self, query: str):
        query = f'query: {query}'
        tokenized = self.tokenizer([query], max_length=512, truncation=True, return_tensors='pt')
        tokenized = {k: v.to(self.device) for k, v in tokenized.items()}
        outputs = self.model(**tokenized)
        embedding = (await self._average_pool(outputs.last_hidden_state,
                                              tokenized['attention_mask'])).detach().cpu()  # type: ignore
        return F.normalize(embedding, p=2, dim=1)[0]

    def _get_yagpt_answer(self, prompt):
        ya_gpt_prompt = {
            "modelUri": "gpt://b1gk6eq8dgq50340i2bk/yandexgpt-lite",
            "completionOptions": {
                "stream": False,
                "temperature": 0,
                "maxTokens": "2000"
            },
            "messages": [
                {
                    "role": "user",
                    "text": prompt
                },
            ]
        }
        url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Api-Key AQVNzfw58ED6-aiQQx9n1O-K8cGkRXUUmFjE50I6"
        }
        response = requests.post(url, headers=headers, json=ya_gpt_prompt)
        response_text = json.loads(response.text)['result']['alternatives'][0]['message']['text']
        return response_text

    async def process_message(self, message: str) -> str:
        logging.info("Старт обработки сообщения")
        query_embed = await self._get_query_embedding(message)
        scores = (query_embed @ self.embeddings.T) * 100
        sorted_ind_scores = list(sorted(enumerate(scores), key=lambda x: x[1], reverse=True))
        best_inds = [x[0] for x in sorted_ind_scores[:3]]
        best_chunks = [self.chunks[ind] for ind in best_inds]

        chunks_prompt = ""
        for i, chunk in enumerate(best_chunks, 1):
            chunks_prompt += f"Фрагмент {i}: \n{chunk}\n\n"
        prompt = self.llm_prompt.format_map({'question': message, 'chunks': chunks_prompt})
        llm_answer = self._get_yagpt_answer(prompt)
        logging.info("Обработка сообщения завершена")
        # print(*best_chunks, sep='\n\n')
        # print(prompt)
        # print(llm_answer)

        return llm_answer
