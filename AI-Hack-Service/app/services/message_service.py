import pandas as pd
from transformers import AutoModel, AutoTokenizer
import torch
import json
import torch.nn.functional as F
from torch import Tensor
import requests


class MessageService:
    def __init__(self):
        df = pd.read_csv('../data/chunk_df.csv')
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        self.model = AutoModel.from_pretrained('intfloat/multilingual-e5-base').to(self.device)
        self.tokenizer = AutoTokenizer.from_pretrained('intfloat/multilingual-e5-base')
        self.embeddings = torch.vstack([torch.Tensor(json.loads(emb)) for emb in df.embeds])
        self.chunks = df['text'].tolist()
        self.llm_prompt = "Ты выступаешь как LLM для RAG. Пользователь задает тебе вопросы, тебе предоставлены " \
                          "фрагменты документации, в которых может содержаться ответ " \
                          "на него. Проанализируй эти фрагменты и попробуй находить точные ответы на поставленные вопросы." \
                          "\n\nФрагменты из документации:\n\n {chunks}" \
                          "\n\nЕсли во фрагментах содержится точный ответ на вопрос, ответь на него согласно документации," \
                          " ни в коем случае не упусти важных деталей, в этой задаче важно соблюдения точности. " \
                          "Если точного ответа нет, первым делом скажи: 'Я не могу найти точный ответ на данный вопрос. " \
                          "Попробуйте сформулировать вопрос конкретнее.'" \
                          " После этого попробуй описать релевантную вопросу информацию, которая у тебя есть." \

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
                                             tokenized['attention_mask'])).detach().cpu() # type: ignore
        return F.normalize(embedding, p=2, dim=1)[0]

    def _get_yagpt_answer(self, messages):
        ya_gpt_prompt = {
            "modelUri": "gpt://b1gk6eq8dgq50340i2bk/yandexgpt-lite",
            "completionOptions": {
                "stream": False,
                "temperature": 0,
                "maxTokens": "2000"
            },
            "messages": messages
        }
        url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Api-Key AQVNzfw58ED6-aiQQx9n1O-K8cGkRXUUmFjE50I6"
        }
        response = requests.post(url, headers=headers, json=ya_gpt_prompt)
        response_text = json.loads(response.text)['result']['alternatives'][0]['message']['text']
        return response_text

    async def process_message(self, history, message: str) -> str:
        if history:
            final_message = message
            for m in history:
                if m['role'] == 'user':
                    final_message += m['content']
            final_message += message
        else:
            final_message = message
        query_embed = await self._get_query_embedding(final_message)
        scores = (query_embed @ self.embeddings.T) * 100
        sorted_ind_scores = list(sorted(enumerate(scores), key=lambda x: x[1], reverse=True))
        best_inds = [x[0] for x in sorted_ind_scores[:3]]
        best_chunks = [self.chunks[ind] for ind in best_inds]

        chunks_prompt = ""
        for i, chunk in enumerate(best_chunks, 1):
            chunks_prompt += f"Фрагмент {i}: \n{chunk}\n\n"

        messages = [{"role": "system", "text": self.llm_prompt.format_map({'chunks': chunks_prompt})}]
        messages += history
        messages.append(message)
        llm_answer = self._get_yagpt_answer(messages)

        # print(*best_chunks, sep='\n\n')
        # print(prompt)
        # print(llm_answer)

        return llm_answer
