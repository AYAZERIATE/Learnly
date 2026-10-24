from typing import Annotated

from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select

from ..db import SessionDep
from ..deps import CurrentUser
from ..security.hashing import hash_password, verify_password
from ..security.jwt import create_access_token
from ..models import Professor, Student
from ..schemas import Token, UserRegister, UserResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(data: Annotated[UserRegister, Body()], session: SessionDep):
    # check professor or student exists
    professor = session.exec(select(Professor).where(data.email == Professor.email)).first()
    student = session.exec(select(Student).where(data.email == Student.email)).first()
    if professor or student:
        raise HTTPException(status.HTTP_409_CONFLICT, "email already exists")

    # create the object
    if data.is_professor:
        user = Professor(
            email=data.email,
            hashed_password=hash_password(data.password),
            name=data.name,
        )
    else:
        user = Student(
            email=data.email,
            hashed_password=hash_password(data.password),
            name=data.name,
        )

    # save the object to database
    session.add(user)
    session.commit()
    session.refresh(user)

    # return Ok
    return user


@router.post("/token", response_model=Token)
def token(data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep):
    """Gets (email and password), Returns (token)"""
    # I will treat (OAuth2PasswordRequestForm)'s username as email
    error = HTTPException(
        status.HTTP_409_CONFLICT,
        "email or password is not correct",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # check professor or student exists
    professor = session.exec(select(Professor).where(data.username == Professor.email)).first()
    student = session.exec(select(Student).where(data.username == Student.email)).first()
    if (professor is None) and (student is None):
        raise error

    user = professor or student

    # verify password
    is_password_correct = verify_password(data.password, user.hashed_password)
    if not is_password_correct:
        raise error

    # return Ok
    return Token(access_token=create_access_token(str(user.email)))


@router.get("/userinfo", response_model=UserResponse)
def me(user: CurrentUser):
    """Gets (token), Returns UserResponse"""
    return user
