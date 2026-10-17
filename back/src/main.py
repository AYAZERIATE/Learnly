from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager

from .db import create_db_and_tables
from .routers import auth


# Modern FastAPI Lifespan (Handles startup events)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Code executed on application startup
    create_db_and_tables()
    yield
    # Code executed on shutdown (if any)


app = FastAPI(title="Learnly backend", lifespan=lifespan)

# include routers
app.include_router(auth.router)
