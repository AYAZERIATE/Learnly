from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # get constants stored in (.env) file
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",  # ignore unrelated variables in .env
    )

    database_url: str
    migration_database_url: str | None = (
        None  # used by Alembic (non-pooled Neon endpoint)
    )
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    # Optional with defaults
    debug: bool = False  # if True, SQL logging is enabled
    pool_recycle: int = 300


    # SMTP for Email Sending for auth
    smtp_host: str
    smtp_port: int
    smtp_user: str
    smtp_password: str
    mail_from: str


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
