from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    pass


class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True, ge=1)
    full_name: str | None = Field(default=None, min_length=3, max_length=30)
    username: str | None = Field(default=None, min_length=3, max_length=30)
    hashed_password: str | None = None
    is_active: bool = True


class UserRegister(UserBase):
    full_name: str
    username: str
    password: str


class UserResponse(UserBase):
    full_name: str
    username: str


class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"
