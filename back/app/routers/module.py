"""
Module is a part of a course,
endpoints requirements:
    post /create:
        user: authorized and professor of the course of the certain module
    patch /{module_id}:
        user: authorized and professor of the course of the certain module
    delete /{module_id}:
        user: authorized and professor of the course of the certain module
"""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status


from app.deps import get_current_user
from ..models import Module, Professor
from ..schemas import ModuleCreate, ModulePatch, ModuleWithoutLessonsResponse

from ..db import SessionDep
from ..deps import CurrentUser

router = APIRouter(prefix="/module", tags=["module"])


@router.post(
    "/create",
    response_model=ModuleWithoutLessonsResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(get_current_user)]
)
def create_module(data: ModuleCreate, session: SessionDep):
    module = Module(**data.model_dump())

    session.add(module)
    session.commit()
    session.refresh(module)
    return module


def is_professor_owner_of_module(
    module_id: int,
    session: SessionDep,
    current_user: CurrentUser,
) -> Module:
    """
    Check if the current_user is the professor of the course to
    which this module belongs.
    this dependency checks if the module and its course exists,
    and if the user is the owner of the course to which this module belongs.
    """
    # made the name of this function like this,
    # to distinguish it from the other function that checks if the user
    # is a professor and the owner of the course (routers/course.py)

    error = HTTPException(
        status.HTTP_403_FORBIDDEN,
        "You are not the user to update or delete this module"
    )

    # if user is professor
    if current_user is not Professor:
        raise error

    # check if the module and its course exists
    module = session.get(Module, module_id)
    if (module is None) or (module.course is None):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "module or its course not found")

    # check if the current user is the owner of the course
    if current_user.email != module.course.professor.email:
        raise error

    return module


@router.patch(
    "/{module_id}",
    response_model=ModuleWithoutLessonsResponse,
    status_code=status.HTTP_200_OK
)
def update_module(
    data: ModulePatch,
    session: SessionDep,
    module: Annotated[Module, Depends(is_professor_owner_of_module)],
):
    update_data = data.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided")

    module.sqlmodel_update(update_data)
    session.commit()
    session.refresh(module)
    return module


@router.delete(
    "/{module_id}",
    status_code=status.HTTP_200_OK
)
def delete_module(
    session: SessionDep,
    module: Annotated[Module, Depends(is_professor_owner_of_module)],
):
    session.delete(module)
    session.commit()
    return {"details": "module deleted successfully"}
