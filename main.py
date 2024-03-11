import uvicorn
from fastapi import FastAPI
from app.config.database import engine
from app.model.user import UserModel
from app.routes.user_routes import auth_routes
# from app.routes.web_routes import web_routes,bot_routes
from app.routes.bot_route import bot_router
from fastapi.middleware.cors import CORSMiddleware
from chatbot import *



app = FastAPI(
    docs_url= "/api/docs",
    title= "Travel Chatbot Project",
    description= "Travel,Weather,Hotel ",
    version= "1.0",
    openapi_url= "/api/openapi.json"

)
# Connecting Fast API with React
origins = [
    "http://localhost:3000",
    "localhost:3000"
]
 
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/", tags=['MY ChatBot'])
async def demo():
    return "Hello FastAPI this is My chatBot"

app.include_router(auth_routes, tags=["ChatBot Project"])
app.include_router(bot_router, tags=["Chat-Bot Routes"])



if __name__=='__main__':
    uvicorn.run("main:app",host="0.0.0.0",
                port=8000,
                reload=True
                )
    
