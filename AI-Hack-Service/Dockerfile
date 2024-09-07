FROM python:3.12-slim
RUN apt-get update \
    && apt-get install -y curl \
    && curl -sSL https://install.python-poetry.org | python3 - \
    && apt-get clean
ENV PATH="/root/.local/bin:$PATH"
WORKDIR /app
COPY pyproject.toml poetry.lock /app/
RUN poetry install --no-interaction --no-ansi
COPY . /app
EXPOSE 8070

CMD ["poetry", "run", "python", "main.py"]