from datetime import datetime
from pydantic import BaseModel,Field
from sqlalchemy.orm import validates

class Tag(BaseModel):
    id: int
    tag_title:str
    user_id : int
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at  : datetime = Field(default_factory=datetime.now)

class ChatHistory(BaseModel):
    history_id: int
    user_query: str
    tag_id: int
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at  : datetime = Field(default_factory=datetime.now)

class BotModel(BaseModel):
    user_query: str

class NotAnswerQuestion(BaseModel):
    questions:str
    user_id : int
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at  : datetime = Field(default_factory=datetime.now)

