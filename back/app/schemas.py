from pydantic import EmailStr
from sqlmodel import SQLModel

# --- Token ---
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"



# --- users ---
# register
class UserRegister(SQLModel):
    name: str
    email: EmailStr
    password: str
    is_professor: bool


# patch
class UserPatch(SQLModel):
    name: str | None = None
    email: EmailStr | None = None
    bio: str | None = None

    is_professor: bool | None = None


# response
class UserResponse(SQLModel): # used in (routers/auth.py)
    id: int | None
    
    name: str
    email: EmailStr
    bio: str | None = None

    is_professor: bool


class ProfessorResponse(SQLModel):  # used in (this file at class CourseResponse)
    name: str
    email: EmailStr



# --- Course ---
# create
class LessonCreate(SQLModel):
    name: str   # it is strange that you can make a lesson with just the name of the lesson.
    description: str | None
    text: str | None = None
    images_urls: list[str] | None = []
    videos_urls: list[str] | None = []


class ModuleCreate(SQLModel):
    name: str
    description: str | None
    course_id: int


class CourseCreate(SQLModel):
    name: str
    description: str | None


# patch
class LessonPatch(SQLModel):
    name: str | None = None
    description: str | None = None
    text: str | None = None
    images_urls: list[str] | None = None
    videos_urls: list[str] | None = None


class ModulePatch(SQLModel):
    name: str | None = None
    description: str | None = None


class CoursePatch(SQLModel):
    name: str | None = None
    description: str | None = None


# response -> with lessons
class LessonResponse(SQLModel):
    name: str
    description: str | None
    text: str | None
    images_urls: list[str] | None
    videos_urls: list[str] | None


class ModuleResponse(SQLModel):
    name: str
    description: str | None
    lessons: list[LessonResponse]


class CourseResponse(SQLModel):
    name: str
    description: str | None
    professor: ProfessorResponse
    modules: list[ModuleResponse]



# response -> without lessons
class ModuleWithoutLessonsResponse(SQLModel):
    name: str
    description: str | None


class CourseWithoutLessonsResponse(SQLModel):
    name: str
    description: str | None
    professor: ProfessorResponse
    modules: list[ModuleWithoutLessonsResponse]
