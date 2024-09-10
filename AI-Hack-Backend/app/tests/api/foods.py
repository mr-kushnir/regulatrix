import pytest

from app.models import Food
from app.utils.session import fetch_instance


class TestFoodController:
    """Тесты проверки работоспособности сервера"""

    uri = "/food"

    async def test_create_food__success(
        self, db_session, rest_client, make_food_category
    ):
        """Проверка создания сущности блюдо"""
        food_category = await make_food_category()
        response = rest_client.post(
            self.uri,
            json={
                "name": "string",
                "description": "string",
                "price": 2000,
                "is_special": False,
                "is_vegan": True,
                "is_publish": False,
                "category_id": food_category.id,
            },
        )
        assert await fetch_instance(db_session, model=Food, instance_id=1)
        assert response.status_code == 200
        assert response.json() == {
            "id": 1,
            "category_id": food_category.id,
            "description": "string",
            "is_special": False,
            "is_vegan": True,
            "is_publish": False,
            "name": "string",
            "price": 2000,
        }

    async def test_update_food__success(
        self, db_session, rest_client, make_food, make_food_category
    ):
        """Проверка обновления сущности блюда"""
        food = await make_food()
        food_category = await make_food_category()
        response = rest_client.put(
            f"{self.uri}/{food.id}/",
            json={
                "name": "string",
                "description": "string",
                "price": 2000,
                "is_special": False,
                "is_vegan": True,
                "is_publish": False,
                "category_id": food_category.id,
            },
        )
        assert response.status_code == 200
        assert response.json() == {
            "id": food.id,
            "name": "string",
            "description": "string",
            "price": 2000,
            "is_special": False,
            "is_vegan": True,
            "is_publish": False,
            "category_id": food_category.id,
        }

    async def test_patch_food__success(self, db_session, rest_client, make_food):
        food = await make_food()
        response = rest_client.patch(
            f"{self.uri}/{food.id}/", json={"description": "string", "price": 34000}
        )
        assert response.status_code == 200
        assert response.json() == {
            "id": food.id,
            "name": "Наименование блюда",
            "description": "string",
            "price": 34000,
            "is_special": False,
            "is_vegan": True,
            "is_publish": True,
            "category_id": food.category_id,
        }

    async def test_get_current_food__success(
        self, db_session, rest_client, make_food, make_food_category
    ):
        """Проверка получения сущности блюда"""
        food = await make_food()
        response = rest_client.get(f"{self.uri}/{food.id}/")
        assert response.status_code == 200
        assert response.json() == {
            "id": food.id,
            "name": "Наименование блюда",
            "description": "Описание блюда",
            "price": 200,
            "is_special": False,
            "is_vegan": True,
            "is_publish": True,
            "category_id": food.category_id,
        }
