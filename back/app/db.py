from typing import Annotated

from fastapi import Depends
from sqlmodel import Session, create_engine

from .config import settings

# Database Config
# Create the database engine
engine = create_engine(
    settings.database_url,
    echo=settings.debug,  # SQL logging only when DEBUG=true
    pool_pre_ping=True,
    pool_recycle=settings.pool_recycle,
)


# # Function to create tables in the database
# def create_db_and_tables():
#     SQLModel.metadata.create_all(engine)


# Dependency Injection for Database Sessions
def get_session():
    with Session(engine) as session:
        yield session


# type shortcut
# being used when user must have active session
SessionDep = Annotated[Session, Depends(get_session)]
