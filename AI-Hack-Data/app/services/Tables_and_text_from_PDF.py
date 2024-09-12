import os  # Модуль для работы с операционной системой и файловой системой
from PIL import Image  # Модуль для работы с изображениями
from pdf2image import convert_from_path  # Модуль для конвертации PDF в изображения
import pytesseract  # Модуль для распознавания текста на изображениях (OCR)
import pdfplumber  # Модуль для работы с PDF-файлами

# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # Путь к исполняемому файлу Tesseract-OCR

class TakeText:
    def __init__(self, pdf_folder, output_folder):
        """
        Инициализация класса TakeText.
        
        :param pdf_folder: Папка с PDF-файлами.
        :param output_folder: Папка для сохранения результатов.
        """
        self.pdf_folder = pdf_folder
        self.output_folder = output_folder

    def clean_filename(self, text):
        """
        Очистка имени файла от недопустимых символов.
        
        :param text: Исходное имя файла.
        :return: Очищенное имя файла.
        """
        return ''.join(char for char in text if char.isalnum() or char in ' _-')

    def extract_text_from_pdf(self, pdf_path, skip_pages=None):
        """
        Извлечение текста из PDF-файла и сохранение страниц с таблицами.
        
        :param pdf_path: Путь к PDF-файлу.
        :param skip_pages: Список страниц, которые нужно пропустить (по умолчанию None).
        """
        images = convert_from_path(pdf_path)  # Конвертирование PDF в изображения
        text = ""
        first_page = pytesseract.image_to_string(images[0], lang='rus')[:200]  # Текст первой страницы для использования в названии файла
        
        for i, image in enumerate(images):
            if skip_pages and i + 1 in skip_pages:
                continue  # Пропуск страниц, указанных в skip_pages
            
            page_text = pytesseract.image_to_string(image, lang='rus')  # Распознавание текста на странице
            
            if skip_pages is None:
                # Проверка наличия таблиц на странице
                if "Таблица" in page_text or "Окончание таблицы" in page_text or "Продолжение таблицы" in page_text:
                    if "Таблица" in page_text:
                        output_filename = f"{self.clean_filename(first_page)}, страница № {i+1} Таблица.png"
                    elif "Окончание таблицы" in page_text:
                        output_filename = f"{self.clean_filename(first_page)}, страница № {i+1} Окончание таблицы.png"
                    else:
                        output_filename = f"{self.clean_filename(first_page)}, страница № {i+1} Продолжение таблицы.png"
                    
                    image.save(os.path.join(self.output_folder, output_filename))  # Сохранение страницы с таблицей как изображения
                    print(f"Страница с таблицей или окончанием/продолжением таблицы сохранена: {output_filename}")
            
            text += f"{first_page}, страница № {i+1}:\n{page_text}\n\n"  # Добавление текста страницы к общему тексту
        
        output_filename = f"{self.clean_filename(first_page)}.txt"  # Имя файла для сохранения текста
        with open(os.path.join(self.output_folder, output_filename), 'w', encoding='utf-8') as f:
            f.write(text)  # Запись текста в файл
        print(f"Текст из файла сохранен в {output_filename}")

    def extract_table_pages(self, pdf_path):
        """
        Выделение номеров страниц, содержащих таблицы.
        
        :param pdf_path: Путь к PDF-файлу.
        :return: Набор номеров страниц с таблицами.
        """
        with pdfplumber.open(pdf_path) as pdf:  # Открытие PDF-файла с помощью pdfplumber
            table_pages = set()
            images = convert_from_path(pdf_path)
            first_page_text = pytesseract.image_to_string(images[0], lang='rus')[:200]
            
            for page_num, page in enumerate(pdf.pages):  # Перебор страниц PDF-файла
                
                tables = page.find_tables()  # Поиск таблиц на странице
                
                if tables:  # Если таблицы найдены
                    table_pages.add(page_num + 1)  # Добавление номера страницы в набор
                    
                    image_path = f"{self.clean_filename(first_page_text)}, страница № {page_num+1} Таблица.png"
                    images[page_num].save(os.path.join(self.output_folder, image_path))  # Сохранение страницы с таблицей как изображения
                    
                    print(f"Таблица найдена на странице {page_num+1}. Сохранена как {image_path}")
            
            return table_pages

    def process(self):
        """
        Обработка всех PDF-файлов в указанной папке.
        """
        
        if not os.path.exists(self.output_folder):  # Создание папки для вывода, если она не существует
            os.makedirs(self.output_folder)
        
        for filename in os.listdir(self.pdf_folder):  # Перебор файлов в папке с PDF-файлами
            
            if filename.endswith(".pdf"):  # Проверка наличия расширения .pdf
                
                pdf_path = os.path.join(self.pdf_folder, filename)  # Путь к текущему PDF-файлу
                
                table_pages = self.extract_table_pages(pdf_path)  # Выделение номеров страниц с таблицами
                
                if table_pages:  # Если найдены страницы с таблицами
                    
                    self.extract_text_from_pdf(pdf_path, skip_pages=table_pages)  # Извлечение текста, пропуская страницы с таблицами
                    
                else:
                    
                    self.extract_text_from_pdf(pdf_path)  # Извлечение текста без пропуска страниц
                    
                print(f"Обработка файла {filename} завершена")

