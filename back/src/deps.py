# Extracts the token from the header: Authorization: Bearer <token>
# If the header is missing, the request is rejected automatically with 401

from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from .db import SessionDep
from .models.user import User
from .security.jwt import decode_access_token

# tokenUrl tells the /docs page where to log in (the Authorize button)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


def get_current_user(
    # Depends(oauth2_scheme): FastAPI pulls the token from the header and passes it in as a string
    token: Annotated[str, Depends(oauth2_scheme)],
    # Database session (opened per request and closed afterwards)
    session: SessionDep,
) -> User:
    # Build the error once and reuse it for every failure case, with a single
    # generic message (so we don't reveal to an attacker exactly why it failed)
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        # Header required by the HTTP spec for 401 responses
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Decode the token, verify the signature and expiry, and get the `sub` value (a string)
        # Then convert it to an int because the table's id column is an int
        user_id = int(decode_access_token(token))
    except (jwt.InvalidTokenError, ValueError):
        # InvalidTokenError: forged, expired, or malformed token
        # ValueError: `sub` is not a valid number
        raise credentials_error

    # Fetch the user from Postgres by primary key (the fastest lookup)
    user = session.get(User, user_id)

    # The user may have been deleted or deactivated after the token was issued,
    # so we always check
    if (user is None) or (not user.is_active):
        raise credentials_error

    # Return the user object for the protected route to use
    return user


# Reusable shortcut:
# any route that declares (user: CurrentUser) becomes protected and receives the current user
CurrentUser = Annotated[User, Depends(get_current_user)]
