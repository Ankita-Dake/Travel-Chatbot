from typing import Optional
from datetime import datetime
from enum import Enum
from pydantic import BaseModel,Field
from sqlalchemy.orm import validates

class User_Type(str,Enum):
    user = "USER"
    admin = "ADMIN"

class CreateUser(BaseModel):
    name: str
    email: str
    password: str
    phone_number:str
    user_type :Optional[User_Type]=User_Type.user
    is_active:Optional[bool]=True
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at  : datetime = Field(default_factory=datetime.now)
     
class UserLogin(BaseModel):
    email: str
    password: str

class UpdateUser(BaseModel):
    name: str
    email: str
    phone_number:str
    user_type :User_Type=User_Type.user
    is_active:Optional[bool]=True
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at  : datetime = Field(default_factory=datetime.now)