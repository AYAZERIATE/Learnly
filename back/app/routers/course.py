"""
endpoints requirements:
    post /create:
        user: authorized and professor
    get /{course_id}:
        nothing
    get /{course_id}/learning:
        user: authorized
    patch /{course_id}:
        user: authorized and professor of the course
    delete /{course_id}:
        user: authorized and professor of the course
"""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from app.deps import get_current_user
from ..db import SessionDep
from ..deps import CurrentUser
from ..models import Professor, Course
from ..schemas import CourseCreate, CoursePatch, CourseResponse, CourseWithoutLessonsResponse

router = APIRouter(prefix="/course", tags=["course"])


@router.post("/create", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
def create_course(data: CourseCreate, session: SessionDep, current_user: CurrentUser):
    # check if the user is a professor
    if current_user is not Professor:
        raise HTTPException(
            status.HTTP_403_FORBIDDEN, "Only professors can create courses"
        )

    # save to database
    db_course = Course(**data.model_dump(), professor=current_user)
    session.add(db_course)
    session.commit()
    session.refresh(db_course)
    return db_course


def is_course_exists(
    # Depends(oauth2_scheme): FastAPI pulls the token from the header and passes it in as a string
    course_id: int,
    # Database session (opened per request and closed afterwards)
    session: SessionDep,
) -> Course:
    """makes sure the course exists, if not raises 404"""
    course = session.get(Course, course_id)
    if course is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "course not found")
    return course


# Reusable shortcut:
# any route that declares (course: CheckCourseExists) makes sure the course exists (and returns it), if not raises 404
# endpoint that uses this dependency must have path param 'course_id'
CheckCourseExists = Annotated[Course, Depends(is_course_exists)]


@router.get(
    "/{course_id}",
    response_model=CourseWithoutLessonsResponse,
    status_code=status.HTTP_200_OK
)
def get_course_info(course: CheckCourseExists):
    return course


@router.get(
    "/{course_id}/learning",
    response_model=CourseResponse,
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_current_user)]
)
def get_course_learning(course: CheckCourseExists):
    return course


def is_professor_owner_of_course(
    current_user: CurrentUser,
    course: CheckCourseExists,
) -> Course:
    """Check if the current_user is the professor of the course"""
    # I have to check if current_user is Professor
    # not just course.professor_id == current_user.id
    # because current_user could be a Student
    # so his id might be the same as the id of the professor of the course
    if course.user.email != current_user.email:
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            "You are not the user to update or delete this course",
        )
    return course


@router.patch("/{course_id}", response_model=CoursePatch, status_code=status.HTTP_200_OK)
def update_course_info(
    course_id: int,
    data: CoursePatch,
    session: SessionDep,
    course: Annotated[Course, Depends(is_professor_owner_of_course)],
):
    course = session.get(Course, course_id)
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")

    update_data = data.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided")

    course.sqlmodel_update(update_data)
    session.commit()
    session.refresh(course)
    return course


@router.delete("/{course_id}", status_code=status.HTTP_200_OK)
def delete_course(
    session: SessionDep,
    course: Annotated[Course, Depends(is_professor_owner_of_course)],
):
    session.delete(course)
    session.commit()
    return {"details": "course deleted successfully"}
