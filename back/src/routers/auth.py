from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select

from ..db import SessionDep
from ..deps import CurrentUser
from ..models.user import Token, User, UserRegister, UserResponse
from ..security.hashing import hash_password, verify_password
from ..security.jwt import create_access_token

router = APIRouter(prefix='/auth', tags=["auth"])

@router.post(
    "/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED
)
def register(data: UserRegister, session: SessionDep):
    # check username not exists
    user = session.exec(select(User).where(User.username == data.username)).first()
    if user is not None:
        raise HTTPException(status.HTTP_409_CONFLICT, "username already exists")

    # encrypt password
    user = User(
        full_name=data.full_name,
        username=data.username,
        hashed_password=hash_password(data.password),
    )

    # save user to DB
    session.add(user)
    session.commit()
    session.refresh(user)

    # return OK
    return user


@router.post("/token", response_model=Token)
def token(data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep):
    """Gets (username and password), Returns (token)"""
    error = HTTPException(
        status.HTTP_409_CONFLICT,
        "username or password is not correct",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # check username exists
    user = session.exec(select(User).where(User.username == data.username)).first()
    if user is None:
        raise error

    # verify password
    is_password_correct = verify_password(data.password, user.hashed_password)
    if not is_password_correct:
        raise error

    # return OK
    return Token(access_token=create_access_token(str(user.id)))


@router.get("/userinfo", response_model=UserResponse)
def me(user: CurrentUser): # pyright: ignore[reportInvalidTypeForm]
    """Gets (token), Returns (full_name, username)"""
    return user
