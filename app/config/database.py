from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base 

DB_url = 'postgresql://postgres:root@localhost/chatbot_db'

engine = create_engine(DB_url)

SessionLocal = sessionmaker()(bind=engine)

Base = declarative_base()
