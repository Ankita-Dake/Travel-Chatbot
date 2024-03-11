from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends,status,HTTPException
from passlib.context import CryptContext
from app.config.database import SessionLocal
from datetime import datetime,timedelta
from fastapi.security import OAuth2PasswordBearer
from jose import jwt

oauth2_bearer = OAuth2PasswordBearer(tokenUrl='/login')

SECRET_KEY = 'kjsjad23422@skdjfdsk'
ALGORITHM='HS256'

def get_db():
    db = SessionLocal
    try:
        yield db
    finally:
        db.close()
db_depenency = Annotated[Session,Depends(get_db)]

# create acces token
def create_access_token(user):
    data={
        "id": user.id,
        "name" : user.name,
        "email" : user.email,
        "password ":user.password,
       "phone_number":user.phone_number,
       "user_type":user.user_type,
       "is_active":user.is_active,
       "exp":datetime.utcnow()+timedelta(minutes=60)
       }
    return jwt.encode(claims=data,key=SECRET_KEY,algorithm=ALGORITHM)

# Verify token
def verify_token(token):
    try:
        payload = jwt.decode(token,key=SECRET_KEY)
        return payload
    except Exception as e:
        print("Exception found   ",e)

def check_active(token:str=Depends(oauth2_bearer)):
    payload = verify_token(token)
    active = payload.get("is_active")
    if not active :
        raise HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail=  "please activate your account",
        header = {
            "WWW-Authetication":"Bearer"}
        )
    else:
        return payload


def check_admin(payload:str=Depends(check_active)):
    user_type = payload.get("user_type")
    if user_type!="ADMIN" :
        raise HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail="this is admin routes"
        )
    else:
        return payload
       