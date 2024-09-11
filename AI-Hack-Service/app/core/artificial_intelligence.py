import logging
import os
import pathlib

import pandas as pd
from transformers import AutoModel, AutoTokenizer
import torch
import json

DEFAULT_PROMPT = "Ты выступаешь как LLM для RAG. Я подам тебе вопрос, а также фрагменты документации, в них " \
                 "может содержаться ответ " \
                 "на него. Проанализируй эти фрагменты и попробуй найти точный ответ на поставленный вопрос." \
                 "\n\nВопрос: \n{question} \n\nФрагменты из документации:\n\n {chunks}" \
                 "\n\nЕсли во фрагментах содержится точный ответ на вопрос, ответь на него согласно документации," \
                 " ни в коем случае не упусти важных деталей, в этой задаче важно соблюдения точности. " \
                 "Если точного ответа нет, первым делом скажи: 'Я не могу найти точный ответ на данный вопрос.'" \
                 " После этого попробуй описать релевантную вопросу информацию, которая у тебя есть."

CUDA = "cuda"
CPU = "cpu"
E5_BASE = "intfloat/multilingual-e5-base"


class AIService:
    def __init__(self):
        logging.info("Инициализация AI сервиса")
        self.device = CUDA if torch.cuda.is_available() else CPU
        self.model = AutoModel.from_pretrained(E5_BASE).to(self.device)
        self.tokenizer = AutoTokenizer.from_pretrained(E5_BASE)
        self.llm_prompt = DEFAULT_PROMPT

        # TODO Переместить файл в S3
        PROJECT_DIR = pathlib.Path(__file__).parent.parent.parent.resolve()
        filepath = os.path.join(f"{PROJECT_DIR}/data/chunk_df.csv")
        with open(filepath, "r", encoding="utf-8") as f:
            df = pd.read_csv(f)
            self.embeddings = torch.vstack([torch.Tensor(json.loads(emb)) for emb in df.embeds])
            self.chunks = df['text'].tolist()
        logging.info("Инициализация AI сервиса завершена")
