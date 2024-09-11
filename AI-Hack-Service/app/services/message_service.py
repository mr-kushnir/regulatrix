import logging
import json
import torch.nn.functional as F
from torch import Tensor
import requests
from app.core.context import ApplicationContext
from app.core.artificial_intelligence import AIService


class MessageService:

    async def _average_pool(self, last_hidden_states: Tensor,
                            attention_mask: Tensor) -> Tensor:
        last_hidden = last_hidden_states.masked_fill(~attention_mask[..., None].bool(), 0.0)
        return last_hidden.sum(dim=1) / attention_mask.sum(dim=1)[..., None]

    async def _get_query_embedding(self, AI: AIService, query: str):
        query = f'query: {query}'
        tokenized = AI.tokenizer([query], max_length=512, truncation=True, return_tensors='pt')
        tokenized = {k: v.to(AI.device) for k, v in tokenized.items()}
        outputs = AI.model(**tokenized)
        embedding = (await self._average_pool(outputs.last_hidden_state,
                                              tokenized['attention_mask'])).detach().cpu()  # type: ignore
        return F.normalize(embedding, p=2, dim=1)[0]

    def _get_yagpt_answer(self, prompt: str) -> str:
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

    async def process_message(self, context: ApplicationContext, message: str) -> str:
        logging.info("Старт обработки сообщения")
        AI = context.AI
        query_embed = await self._get_query_embedding(AI, message)
        scores = (query_embed @ AI.embeddings.T) * 100
        sorted_ind_scores = list(sorted(enumerate(scores), key=lambda x: x[1], reverse=True))
        best_inds = [x[0] for x in sorted_ind_scores[:3]]
        best_chunks = [AI.chunks[ind] for ind in best_inds]

        chunks_prompt = ""
        for i, chunk in enumerate(best_chunks, 1):
            chunks_prompt += f"Фрагмент {i}: \n{chunk}\n\n"
        prompt = AI.llm_prompt.format_map({'question': message, 'chunks': chunks_prompt})
        llm_answer = self._get_yagpt_answer(prompt)
        logging.info("Обработка сообщения завершена")
        return llm_answer
