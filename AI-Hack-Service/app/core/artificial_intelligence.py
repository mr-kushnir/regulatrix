import logging
import os
import pathlib

import pandas as pd
from transformers import AutoModel, AutoTokenizer
import torch
import json

DEFAULT_PROMPT = "Ты выступаешь как LLM для RAG. Пользователь задает тебе вопросы, тебе предоставлены " \
                 "фрагменты документации, в которых может содержаться ответ " \
                 "на него. Проанализируй документы и попробуй находить точные ответы на поставленные вопросы." \
                 "\n\nДокументы:\n\n {chunks}" \
                 "\n\nЕсли во фрагментах содержится ответ на вопрос, ответь на него согласно документации," \
                 " не упусти важных деталей, в этой задаче важно соблюдения точности, а также " \
                 "упомяни название документа (и номер формата **.*****, если он дан), из которого информация была взята, " \
                 "Если точного ответа нет, попроси сформулировать вопрос точнее." \
                 " После этого попробуй описать релевантную вопросу информацию, которая у тебя есть."
CHUNK_PROMPT = "Фрагмент взят из документа \"{title}\"\n{chunk}"
ADDITIONAL_PROMPT = "Тебе представлены фрагменты документации, а также задан вопрос. Твоя задача определить," \
                    " достаточно ли предоставленных фрагментов, чтобы точно ответить на вопрос. Если во фрагментах не" \
                    " содержится точного ответа на вопрос, скажи НЕТ, а затем опиши, какая информация тебе нужна, чтобы " \
                    "ответить. Не говори, зачем тебе эта информация, только опиши, что именно тебе нужно знать. " \
                    "Используй побольше ключевых слов для необходимой информации, чтобы ее было проще найти для тебя. " \
                    "Измени заданный тебе вопрос так, чтобы он стал более детальным и подробным. Если" \
                    "фрагментов достаточно для ответа, ответь ДА." \
                    "Фрагменты: \n {chunks}. \n\nВопрос:{question}"

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
        self.chunk_prompt = CHUNK_PROMPT
        self.additional_prompt = ADDITIONAL_PROMPT

        # TODO Переместить файл в S3
        PROJECT_DIR = pathlib.Path(__file__).parent.parent.parent.resolve()
        filepath = os.path.join(f"{PROJECT_DIR}/data/chunk_df.csv")
        with open(filepath, "r", encoding="utf-8") as f:
            df = pd.read_csv(f)
            self.embeddings = torch.vstack([torch.Tensor(json.loads(emb)) for emb in df.embeds])
            self.chunks = df['text'].tolist()
            self.titles = df['title'].tolist()
        logging.info("Инициализация AI сервиса завершена")
