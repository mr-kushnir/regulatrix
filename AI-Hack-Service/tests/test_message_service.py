import pytest

from app.services.message_service import MessageService

class TestMessageService:
    @pytest.mark.asyncio
    async def test_process_message(self):
        message_service = MessageService()
        question = "Как необходимо защищать постоянные рабочие места, расположенные на " \
                   "расстоянии менее 3 м от наружных дверей и 6 м от ворот?"
        # question = '''Согласно СП 60.13330.2020 "Отопление, вентиляция и кондиционирование" какие трубопроводы не допускается прокладывать через помещения вентиляционного оборудования?'''
        # question = "Можно ли согласно сп 54.13330.2016 разместить электрощитовую под помещением с мокрыми процессами?"
        # question = "Какая должна быть ширина лестницы для жилых зданий коридорного типа?"
        output = await message_service.process_message(question)
        print(output)
        assert len(output) > 1