"""
Lesson is a part of a module (a module is a part of a course),
endpoints requirements:
    patch /{user_id}:
        user: the same user authorized
    delete /{user_id}:
        user: the same user authorized
"""

from typing import Annotated

from fastapi import APIRouter, Body, Depends, HTTPException, status
from pydantic import EmailStr

from ..models import Professor, Student
from ..schemas import UserPatch, UserResponse

from ..db import SessionDep
from ..deps import CurrentUser

router = APIRouter(prefix="/user", tags=["user"])


def is_user_current_user(
    email: Annotated[EmailStr, Body()],
    current_user: CurrentUser,
) -> Professor | Student:
    if email != current_user.email:
        raise HTTPException(
            status.HTTP_403_FORBIDDEN,
            "This is not your user to update or delete it"
        )

    return current_user


@router.patch(
    "/{user_id}",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK
)
def update_user(
    data: UserPatch,
    session: SessionDep,
    user: Annotated[Professor | Student, Depends(is_user_current_user)],
):
    update_data = data.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided")

    user.sqlmodel_update(update_data)
    session.commit()
    session.refresh(user)
    return user


@router.delete(
    "/{user_id}",
    status_code=status.HTTP_200_OK
)
def delete_user(
    session: SessionDep,
    user: Annotated[Professor | Student, Depends(is_user_current_user)],
):
    session.delete(user)
    session.commit()
    return {"details": "user deleted successfully"}
