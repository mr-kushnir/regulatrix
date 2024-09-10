from pathlib import Path

from dynaconf import settings as config

PROJECT_PATH = str(Path(__file__).parent.parent.resolve())

settings = config
settings.configure(ENVVAR_PREFIX_FOR_DYNACONF=False)

