from pydantic import EmailStr
from sqlmodel import JSON, Column, Field, Relationship, SQLModel


# --- Global Shared Fields ---
class GlobalBase(SQLModel):
    id: int | None = Field(default=None, primary_key=True)


# --- Database Tables ---
class Professor(GlobalBase, table=True):
    email: EmailStr = Field(index=True, unique=True)
    hashed_password: str

    name: str = Field(index=True)
    bio: str | None = None

    is_active_user: bool | None = True # to be able to block users

    is_professor: bool = True

    courses: list["Course"] = Relationship(back_populates="professor")


class StudentAndCourseLink(SQLModel, table=True):
    student_id: int = Field(foreign_key="student.id", primary_key=True)
    course_id: int = Field(foreign_key="course.id", primary_key=True)


class Student(GlobalBase, table=True):
    email: EmailStr = Field(index=True, unique=True)
    hashed_password: str

    name: str = Field(index=True)
    bio: str | None = None

    is_active_user: bool | None = True # to be able to block users

    is_professor: bool = False

    courses: list["Course"] = Relationship(back_populates="students", link_model=StudentAndCourseLink)


class Course(GlobalBase, table=True):
    name: str = Field(index=True)
    description: str | None = None

    professor_id: int = Field(foreign_key="professor.id")
    professor: "Professor" = Relationship(back_populates="courses")

    students: list["Student"] = Relationship(back_populates="courses", link_model=StudentAndCourseLink)

    modules: list["Module"] = Relationship(back_populates="course")


class Module(GlobalBase, table=True):
    name: str = Field(index=True)
    description: str | None = None

    course_id: int = Field(foreign_key="course.id")
    course: "Course" = Relationship(back_populates="modules")

    lessons: list["Lesson"] = Relationship(back_populates="module")


class Lesson(GlobalBase, table=True):
    name: str = Field(index=True)
    description: str | None = None
    text: str | None = None
    images_urls: list[str] | None = Field(default=[], sa_column=Column(JSON))
    videos_urls: list[str] | None = Field(default=[], sa_column=Column(JSON))

    module_id: int = Field(foreign_key="module.id")
    module: "Module" = Relationship(back_populates="lessons")
