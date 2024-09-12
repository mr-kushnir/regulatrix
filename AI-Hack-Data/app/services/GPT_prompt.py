
# OpenAI API Key
api_key = ""  # Вставьте ваш ключ API от OpenAI

import os  # Модуль для работы с операционной системой и файловой системой
import base64  # Модуль для кодирования и декодирования данных в формате Base64
import requests  # Модуль для отправки HTTP-запросов

class ImageProcessor:
    def __init__(self, api_key):
        """
        Инициализация класса ImageProcessor.
        
        :param api_key: Ключ API от OpenAI.
        """
        self.api_key = api_key

    def encode_image(self, image_path):
        """
        Кодирование изображения в формат Base64.
        
        :param image_path: Путь к файлу изображения.
        :return: Кодированное изображение в формате Base64.
        """
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')

    def get_image_description(self, image_path):
        """
        Получение описания изображения с помощью API OpenAI.
        
        :param image_path: Путь к файлу изображения.
        :return: Описание изображения или None в случае ошибки.
        """
        base64_image = self.encode_image(image_path)

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"  # Авторизация с помощью ключа API
        }

        payload = {
            "model": "gpt-4o-mini",  # Модель языка GPT-4o-mini
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": """Это картинка из документации, сохрани текст как есть. А так же распознай таблицы и отдай в виде markdown разметки
                            Первая запись в файле - его название, дальше текст файла , с учетом расположения таблицы"""
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"  # URL-кодированное изображение
                            }
                        }
                    ]
                }
            ],
            "max_tokens": 1000  # Максимальное количество токенов для ответа
        }

        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

        if response.status_code == 200:
            return response.json()['choices'][0]['message']['content'].strip()
        else:
            print(f"Ошибка: {response.status_code}, {response.text}")
            return None

    def process_images(self, image_folder, output_folder):
        """
        Обработка всех изображений в указанной папке и сохранение их описаний в другую папку.
        
        :param image_folder: Папка с изображениями.
        :param output_folder: Папка для сохранения описаний изображений.
        """
        if not os.path.exists(output_folder):
            os.makedirs(output_folder)  # Создание папки для вывода, если она не существует
        
        for filename in os.listdir(image_folder):
            if filename.endswith(('.jpg', '.jpeg', '.png')):
                img_path = os.path.join(image_folder, filename)
                description = self.get_image_description(img_path)

                output_filename = os.path.basename(img_path).replace('.jpg', '.txt').replace('.jpeg', '.txt').replace('.png', '.txt')
                with open(os.path.join(output_folder, output_filename), 'w', encoding='utf-8') as f:
                    f.write(description)
                print(f"Описание изображения сохранено в {output_filename}")
