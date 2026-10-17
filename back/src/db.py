from typing import Annotated

from fastapi import Depends
from sqlmodel import Session, SQLModel, create_engine

from .config import settings

# Database Config
# Create the database engine
engine = create_engine(settings.database_url, echo=True)


# Function to create tables in the database
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# Dependency Injection for Database Sessions
def get_session():
    with Session(engine) as session:
        yield session


# type shortcut
# being used when user must have active session
SessionDep = Annotated[Session, Depends(get_session)]
