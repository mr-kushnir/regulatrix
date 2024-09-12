#!make
# Setup the shell and python version.
# It's necessary to set this because some environments don't link sh -> bash.
SHELL := /bin/bash
PYTHON := python3
SERVICES := ./app

.PHONY: help venv sort lint black migrations migrate format_code

help:
	@echo "Использование: make <command>"
	@echo
	@echo "Доступные команды:"
	@echo "  venv                             Создание виртуального окружения"
	@echo "  sort                     		  Сортировка импортов"
	@echo "  lint                     		  Запуск линтеров"
	@echo "  black                    		  Запуск форматтера black"

venv:
	@$(PYTHON) -m venv .venv
	@echo "Для активации venv используйте 'source .venv/bin/activate'"

sort:
	@isort .

lint:
	@flake8 --max-line-length 120 $(SERVICES)
	@pylint $(SERVICES)

black:
	@black .

migrations:
	@alembic revision --autogenerate -m "auto"
	@git add ./db/migration/versions/.

migrate:
	@alembic upgrade head