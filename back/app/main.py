import logging

from fastapi import FastAPI

from .routers import auth, user, course, module, lesson


app = FastAPI(title="Learnly backend")
logger = logging.getLogger(__name__)

# include routers
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(course.router)
app.include_router(module.router)
app.include_router(lesson.router)
