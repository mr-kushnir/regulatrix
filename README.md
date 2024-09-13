# Проект: Regulatrix

## Описание проекта

**Regulatrix** — это система умного поиска и анализа нормативной документации для специалистов в области проектирования и строительства. Она упрощает доступ к нормативным документам, снижает время на поиск сложной информации и минимизирует риски ошибок при соблюдении стандартов.

Платформа предоставляет пользователям возможность быстрого получения ответов на сложные вопросы по нормам, анализируя тексты документов и выдавая готовые решения. 

## Целевая аудитория

Проект ориентирован на следующих пользователей:
- Инженеры проектных компаний и институтов
- Эксперты в строительной сфере
- Служба технического заказчика в строительных компаниях

## Уникальная ценность

- **Быстрый поиск** нормативных документов и решение сложных вопросов за счет анализа текстов.
- **Экономия времени** на поиске нормативной информации.
- **Снижение риска ошибок** в процессе проектирования и работы с документами.

## Установка и запуск

### Требования

- Node.js >= 14.0
- Docker (опционально, если используется контейнеризация)
- База данных (например, PostgreSQL)

### Установка

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/username/Regulatrix.git
   cd Regulatrix
2. Установите зависимости:
    ```bash
    npm install
3. Настройте переменные окружения:
   ```bash
   cp .env.example .env
4. Запустите приложение:
   npm start
   
### Запуск с использованием Docker
  ```bash
  docker-compose up --build
```
## Используемые технологии

- **Yandex GPT** — Генеративная предобученная трансформерная модель от Яндекса для обработки естественного языка и генерации текста.
- **intfloat/multilingual-e5-base** — Многоязычная модель для извлечения текстовых признаков, разработанная для работы с различными языками, используемая для задач классификации и кластеризации текста.
- **Python/FastAPI** — Современный веб-фреймворк для создания API на языке программирования Python, который обеспечивает высокую производительность и удобство разработки.
- **PostgreSQL** — Мощная реляционная база данных с открытым исходным кодом для хранения и управления структурированными данными.
- **S3 Yandex** — Облачное хранилище объектов, используемое для хранения и извлечения любых объемов данных.
- **Tesseract OCR** — Оптическое распознавание символов с открытым исходным кодом, используемое для преобразования изображений текста в текстовые данные.
- **React** — JavaScript-библиотека для создания пользовательских интерфейсов, особенно одностраничных приложений (SPA), с использованием компонентов.

## Ссылки на материалы

- [Yandex GPT Documentation](https://ya.ru/ai/gpt-2)
- [T-Lite LLM Documentation](https://huggingface.co/IlyaGusev/T-lite-instruct-0.1-abliterated)
- [intfloat/multilingual-e5-base Model](https://huggingface.co/intfloat/multilingual-e5-base)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [LanceDB Documentation](https://lancedb.github.io/)
- [Tesseract OCR Documentation](https://github.com/tesseract-ocr/tesseract)
- [React Documentation](https://reactjs.org/)


## План развития (Roadmap)

- [x] Разработка бэкенда и фронтенда
- [x] Интеграция с базой данных нормативки
- [ ] Добавление нескольких моделей поиска и возможности выбора из интерфейса
- [ ] Реализация добавления собственных документов в базу знаний
- [ ] Оптимизация интерфейса и UX
- [x] Решение проблемы с CORS для корректной работы в браузерах

## Команда

- **Константин Веснин** — LLM, ML инженер ([TG](https://t.me/Mopchik))
- **Никита Симонов** — LLM, ML инженер ([TG](https://t.me/N0t_Kit))
- **Михаил Третьяков** — Backend/Frontend разработчик ([TG](https://t.me/Tretyakkov))
- **Алексей Кушнир** — PM/PO/DevOps ([TG](https://t.me/kushnir_aa))






   
