from sqlalchemy import(
    DateTime,Column,String,Integer,Boolean,Enum,ForeignKey
)
from datetime import datetime
from app.config.database import Base
from sqlalchemy.orm import relationship,validates
from app.validation.auth_validation import User_Type
from fastapi import HTTPException

class UserModel(Base):

    __tablename__ = 'users'

    id = Column(Integer(),primary_key=True,index=True)
    name = Column(String)
    email = Column(String,unique=True)
    password = Column(String)
    phone_number= Column(String)
    user_type= Column(Enum(User_Type),nullable=True,default=User_Type.user)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    items = relationship("TagModel", back_populates="user",uselist=True)
    not_answer = relationship("NotAnswer_Question", back_populates="auth_user",uselist=True)

    @validates("phone_number")
    def validate_phone_number(self, key, number):
        if len(number) > 10 or len(number) < 10 :
               raise HTTPException(status_code=404, detail="phone number should be 10 digits")
        return number
    
class TagModel(Base):

    __tablename__ = 'tag'

    tag_id = Column(Integer(),primary_key=True,index=True)
    tag_title = Column(DateTime,default=datetime.now)
    user_id = Column(Integer(),ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    user = relationship("UserModel", back_populates="items")
    tags =relationship("ChatHistoryModel", back_populates="chats")

class ChatHistoryModel(Base):

    __tablename__ = 'chat_history'

    history_id = Column(Integer(),primary_key=True,index=True)
    user_query = Column(String)
    bot_response = Column(String)
    tag_id = Column(Integer(), ForeignKey("tag.tag_id"))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    chats = relationship("TagModel",back_populates="tags")


class NotAnswer_Question(Base):

    __tablename__ = 'naq'

    nqa_id = Column(Integer(),primary_key=True,index=True)
    questions = Column(String)
    user_id = Column(Integer(),ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    auth_user = relationship("UserModel", back_populates="not_answer")
    