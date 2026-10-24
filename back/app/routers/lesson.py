"""
Lesson is a part of a module (a lesson is a part of a course),
endpoints requirements:
    post /create:
        user: authorized and professor of the course of the certain lesson of the certain lesson
    patch /{lesson_id}:
        user: authorized and professor of the course of the certain lesson of the certain lesson
    delete /{lesson_id}:
        user: authorized and professor of the course of the certain lesson of the certain lesson
"""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status


from ..models import Professor, Lesson
from ..schemas import LessonCreate, LessonPatch, LessonResponse, ModuleWithoutLessonsResponse

from ..db import SessionDep
from ..deps import CurrentUser

router = APIRouter(prefix="/lesson", tags=["lesson"])


@router.post(
    "/create",
    response_model=ModuleWithoutLessonsResponse,
    status_code=status.HTTP_201_CREATED
)
def create_lesson(data: LessonCreate, session: SessionDep, current_user: CurrentUser):
    lesson = Lesson(**data.model_dump())

    if current_user.email != lesson.module.course.professor.email:
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            "You are not authorized to create this lesson"
        )

    session.add(lesson)
    session.commit()
    session.refresh(lesson)
    return lesson


def is_professor_owner_of_lesson(
    lesson_id: int,
    session: SessionDep,
    current_user: CurrentUser,
) -> Lesson:
    """
    Check if the current_user is the professor of the course to
    which this lesson belongs.
    this dependency checks if the lesson and its module and its course exists,
    and if the user is the owner of the course to which this lesson belongs.
    """
    # made the name of this function like this,
    # to distinguish it from the other function that checks if the user
    # is a professor and the owner of the course (routers/course.py)

    error = HTTPException(
        status.HTTP_403_FORBIDDEN,
        "You are not authorized to update or delete this lesson"
    )

    # if user is professor
    if current_user is not Professor:
        raise error

    # check if the lesson and its module and its course exists
    lesson = session.get(Lesson, lesson_id)
    if (lesson.module.course is None) or (lesson.module is None) or (lesson is None):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "module or its course not found")

    # check if the current user is the owner of the course
    if current_user.email != lesson.module.course.professor.email:
        raise error

    return lesson


@router.patch(
    "/{lesson_id}",
    response_model=LessonResponse,
    status_code=status.HTTP_200_OK
)
def update_lesson(
    data: LessonPatch,
    session: SessionDep,
    lesson: Annotated[Lesson, Depends(is_professor_owner_of_lesson)],
):
    update_data = data.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided")

    lesson.sqlmodel_update(update_data)
    session.commit()
    session.refresh(lesson)
    return lesson


@router.delete(
    "/{lesson_id}",
    status_code=status.HTTP_200_OK
)
def delete_lesson(
    session: SessionDep,
    lesson: Annotated[Lesson, Depends(is_professor_owner_of_lesson)],
):
    session.delete(lesson)
    session.commit()
    return {"details": "lesson deleted successfully"}
