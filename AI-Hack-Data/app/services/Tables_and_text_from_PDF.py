import os
from PIL import Image
from pdf2image import convert_from_path
import pytesseract
import pdfplumber

# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe' 

class TakeText:
    def __init__(self, pdf_folder, output_folder):
        self.pdf_folder = pdf_folder
        self.output_folder = output_folder

    def clean_filename(self, text):
        
        return ''.join(char for char in text if char.isalnum() or char in ' _-')

    def extract_text_from_pdf(self, pdf_path, skip_pages=None):
        images = convert_from_path(pdf_path)
        text = ""
        first_page = pytesseract.image_to_string(images[0], lang='rus')[:200]
        for i, image in enumerate(images):
            if skip_pages and i + 1 in skip_pages:
                continue
            page_text = pytesseract.image_to_string(image, lang='rus')
            
            
            if skip_pages is None:
                
                if "Таблица" in page_text or "Окончание таблицы" in page_text or "Продолжение таблицы" in page_text:
                    if "Таблица" in page_text:
                        output_filename = f"{self.clean_filename(first_page)}, страница № {i+1} Таблица.png"
                    elif "Окончание таблицы" in page_text:
                        output_filename = f"{self.clean_filename(first_page)}, страница № {i+1} Окончание таблицы.png"
                    else:
                        output_filename = f"{self.clean_filename(first_page)}, страница № {i+1} Продолжение таблицы.png"
                    
                    image.save(os.path.join(self.output_folder, output_filename))
                    print(f"Страница с таблицей или окончанием/продолжением таблицы сохранена: {output_filename}")
            
            
            text += f"{first_page}, страница № {i+1}:\n{page_text}\n\n"

        
        output_filename = f"{self.clean_filename(first_page)}.txt"
        with open(os.path.join(self.output_folder, output_filename), 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Текст из файла сохранен в {output_filename}")

    def extract_table_pages(self, pdf_path):
        with pdfplumber.open(pdf_path) as pdf:
            table_pages = set()
            images = convert_from_path(pdf_path)
            first_page_text = pytesseract.image_to_string(images[0], lang='rus')[:200]
            
            for page_num, page in enumerate(pdf.pages):
           
                tables = page.find_tables()
                if tables:
                    table_pages.add(page_num + 1) 
                    image_path = f"{self.clean_filename(first_page_text)}, страница № {page_num+1} Таблица.png"
                    images[page_num].save(os.path.join(self.output_folder, image_path))
                    print(f"Таблица найдена на странице {page_num+1}. Сохранена как {image_path}")
            
            return table_pages

    def process(self):
        
        if not os.path.exists(self.output_folder):
            os.makedirs(self.output_folder)
        for filename in os.listdir(self.pdf_folder):
            if filename.endswith(".pdf"):
                pdf_path = os.path.join(self.pdf_folder, filename) 
                table_pages = self.extract_table_pages(pdf_path)
                if table_pages:
                    self.extract_text_from_pdf(pdf_path, skip_pages=table_pages)
                else:
                    self.extract_text_from_pdf(pdf_path)
                
                print(f"Обработка файла {filename} завершена")

