from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # get constants stored in (.env) file
    model_config = SettingsConfigDict(env_file=".env")

    database_url: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int


settings = Settings()
