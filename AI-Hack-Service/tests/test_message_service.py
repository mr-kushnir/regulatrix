import pytest

from app.services.message_service import MessageService
from app.core.context import ApplicationContext
from app.core.artificial_intelligence import AIService
from app.schemas.message import DataSchema, ResponseMessageSchema
from app.core.enums import MessageTypeEnum
from datetime import datetime

class TestMessageService:
    @pytest.mark.asyncio
    async def test_process_message(self):
        message_service = MessageService()
        app_context = ApplicationContext(None, AIService())
        question = "Как необходимо защищать постоянные рабочие места, расположенные на " \
                   "расстоянии менее 3 м от наружных дверей и 6 м от ворот?"
        # question = '''Согласно СП 60.13330.2020 "Отопление, вентиляция и кондиционирование" какие трубопроводы не допускается прокладывать через помещения вентиляционного оборудования?'''
        # question = "Можно ли согласно сп 54.13330.2016 разместить электрощитовую под помещением с мокрыми процессами?"
        question = "Какая должна быть ширина лестницы для жилых зданий коридорного типа?"
        answer = "В документации не указана точная ширина лестницы для жилых зданий коридорного типа. " \
                   "Однако в фрагменте 2 говорится, что ширина пути эвакуации по лестнице, предназначенной " \
                   "для эвакуации людей, должна быть не менее требуемой ширины любого эвакуационного выхода " \
                   "на неё, но не менее 1,2 м для остальных зданий, за исключением зданий класса Ф1.3, Ф1.4, Ф5; 0,7 м " \
                   "— для лестниц, ведущих к одиночным рабочим местам или предназначенным для эвакуации не более 5 человек; " \
                   "1,05 м — для зданий класса Ф1.3. \n\nТакже в документации нет информации о том, как ширина лестницы " \
                   "зависит от её типа или назначения. Поэтому для более точного ответа на вопрос необходимо " \
                   "больше контекста или дополнительной информации."
        question = "Да, ширина лестницы зависит от ширины эвакуации. Жилые помещения не входят в классы Ф1.3, Ф1.4, Ф1.5," \
                   "в них может быть больше 5 человек. Какая в итоге должна быть ширина?"
        context = [
            ResponseMessageSchema(
                id=0,
                message="Какая должна быть ширина лестницы для жилых зданий коридорного типа?",
                message_type=MessageTypeEnum.USER,
                date_created=datetime(2024, 9, 13)
            ),
            ResponseMessageSchema(
                id=1,
                message=answer,
                message_type=MessageTypeEnum.AI,
                date_created=datetime(2024, 9, 13)
            ),
        ]
        data = DataSchema(message=question, context=context)
        output = await message_service.process_message(app_context, data)
        print(output)
        assert len(output) > 1