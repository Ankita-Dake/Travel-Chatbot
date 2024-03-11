from fastapi import APIRouter,HTTPException,status
from app.model.user import ChatHistoryModel, TagModel, NotAnswer_Question, UserModel
from app.validation.tag_validation import ChatHistory, Tag,NotAnswerQuestion,BotModel
from chatbot import *
from fastapi import APIRouter,Depends
from app.services.db_service import check_active,verify_token,check_admin
from app.services.db_service import db_depenency
from chatbot import *

bot_router = APIRouter()  

@bot_router.post('/chat/{token}')
async def chat_create(
       user_ip : BotModel,
       db: db_depenency,
      token:str
):
    
    current_user = verify_token(token) # To get loggedin current user
    print(current_user['id'])
    loggedin_user_latest_tags = db.query(TagModel).filter(TagModel.user_id == current_user['id']).all()[-1] # To get latest tag id of current loggedin user
    print(loggedin_user_latest_tags.tag_id)

    chatbot_response = mainresponse(user_ip.user_query)
    if chatbot_response == "I am sorry! I don't understand you":
            notquestion = NotAnswer_Question(
                  questions = user_ip.user_query,
                  user_id= current_user['id'],
    
            )
            db.add(notquestion)
            db.commit()
            db.refresh(notquestion)
            

            history = ChatHistoryModel(
                user_query = user_ip.user_query,
                bot_response = chatbot_response,
                tag_id = loggedin_user_latest_tags.tag_id
            )

            db.add(history)
            db.commit()
            db.refresh(history)

            return{
                'success': True,
                'msg': 'not anwser question created sucessfully',
                'user': notquestion,
            }
    else:    
            history = ChatHistoryModel(
                user_query = user_ip.user_query,
                bot_response = chatbot_response,
                tag_id = loggedin_user_latest_tags.tag_id
            )

            db.add(history)
            db.commit()
            db.refresh(history)

            return{
                'success': True,
                'msg': 'Chat-History created sucessfully',
                'user': history,
            }

# To display all tags of the logged in user
@bot_router.get('/tags-by-user/{id}')
async def tag_by_user_id(id: int, db: db_depenency):
    user_tags = db.query(TagModel).filter(TagModel.user_id == id).all()
    if user_tags:
        return user_tags
   
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No tags for this user")

@bot_router.get("/histroy/{tag_id}")
def response_tag(
      db:db_depenency,
      tag_id:int
    ):
    res = db.query(ChatHistoryModel).filter(ChatHistoryModel.tag_id==tag_id).all()
    return res
      
@bot_router.get("/not-answer-question/",dependencies=[Depends(check_admin)])
def response_tag(
      db:db_depenency,
    ):
    result = db.query(NotAnswer_Question).all()
    return result
