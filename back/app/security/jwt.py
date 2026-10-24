from datetime import UTC, datetime, timedelta

from jwt import decode as jwt_decode
from jwt import encode as jwt_encode

from ..config import settings


def create_access_token(subject: str) -> str:
    now = datetime.now(UTC)
    payload = {
        "sub": subject,  # PyJWT requires sub to be a string
        "iat": now,
        "exp": now + timedelta(minutes=settings.access_token_expire_minutes),
    }
    return jwt_encode(payload, key=settings.secret_key, algorithm=settings.algorithm)


def decode_access_token(token: str) -> str:
    payload = jwt_decode(
        token,
        key=settings.secret_key,
        algorithms=[settings.algorithm],  # always pin the algorithm
        options={"require": ["exp", "sub"]},
    )
    return payload["sub"]
