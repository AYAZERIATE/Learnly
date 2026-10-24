from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()  # Argon2id


def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(plain: str, hashed: str | None) -> bool:
    # TODO: checking is 'hashed' param could be None in places of using this function
    # Always run a verify, even for unknown users, to blunt timing attacks
    return (hashed is not None) and (password_hash.verify(plain, hashed))
