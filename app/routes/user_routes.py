from fastapi import APIRouter,Depends,HTTPException,status
from app.validation.auth_validation import CreateUser,UpdateUser
from app.services.db_service import db_depenency
from app.model.user import UserModel, TagModel,NotAnswer_Question,ChatHistoryModel
from passlib.context import CryptContext
from typing import Annotated
from app.services.db_service import create_access_token,check_active,check_admin,verify_token
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm


bcryypt_context = CryptContext(schemes=['bcrypt'],deprecated = 'auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='/login')

auth_routes = APIRouter()

def verify_password(plain_password,hasted_password):
    return bcryypt_context.verify(plain_password,hasted_password)

def get_password_hash(password):
    return bcryypt_context.hash(password)

def get_user_by_email(db:db_depenency,email:str):
    return db.query(UserModel).filter(UserModel.email == email ).first()

# register user
@auth_routes.post('/create-user',status_code=status.HTTP_201_CREATED)
async def create_user(
    db:db_depenency,
    user_request:CreateUser):
    existing_user = db.query(UserModel).filter_by(email=user_request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hash_pass = get_password_hash(user_request.password)
    user_data= UserModel(
       name = user_request.name,
       email = user_request.email,
       password = hash_pass,
       phone_number=user_request.phone_number,
       user_type=user_request.user_type,
       is_active=user_request.is_active,
    ) 
    # token = create_access_token(user_data)
    db.add(user_data)
    db.commit()
    db.refresh(user_data)
    return{
        'success': True,
        'msg': 'User created sucessfully',
        'user': user_data,
        # 'token':token
    }

#login
@auth_routes.post("/login")
async def login_user(
    form_data:Annotated[OAuth2PasswordRequestForm,Depends()],
    db:db_depenency):

    db_user = get_user_by_email(db=db ,email = form_data.username)
    if not db_user:
        raise HTTPException(
            status_code=401,detail="This username not found"
        )
    if verify_password(form_data.password,db_user.password):
        token = create_access_token(db_user)
        tag = TagModel(
        user_id = db_user.id,
        )
        db.add(tag)
        db.commit()
        db.refresh(tag)
        return{
            "access_token":token,
            "token_type":"bearer"
        }
    
# get all users
@auth_routes.get("/users/",response_model=list[CreateUser], dependencies=[Depends(check_admin)])
async def read_user(db:db_depenency):
    users = get_user(db)
    return users

@auth_routes.get("/users_current/{token}")
async def current_user(token:str):
    current_user = verify_token(token)
    return current_user

def get_user(db:db_depenency):
    return db.query(UserModel)

#get user by id
@auth_routes.get("/users/{id}", response_model=CreateUser)
async def read_users(id:int,db:db_depenency):
    db_user = get_users(db ,id = id)
    if db_user is None:
        raise HTTPException(status_code=404,detail="user not found")
    return db_user

def get_users(db:db_depenency,id:int):
    return db.query(UserModel).filter(UserModel.id==id).first()

# Update User
@auth_routes.put('/update_user/{id}')
async def update_user(
    db: db_depenency,
    id: int,
    user_request : UpdateUser
):
    
    update_details = db.query(UserModel).filter(UserModel.id == id).first()
   
    if update_details is None:
        raise HTTPException(status_code=404, detail="User details not found")
   
    update_details.name = user_request.name
    update_details.email = user_request.email
    update_details.phone_number = user_request.phone_number
    
   
    db.add(update_details)
    db.commit()
 
    return{
        'success': True,
        'message': 'User updated successfully'
    }


@auth_routes.post("/logout")
def logout_user(get_user: UserModel = Depends(current_user)):
    return {"message": "User logged out successfully"}


# Delete User by id
@auth_routes.delete('/delete-user/{user_id}')
async def delete_user(
    db: db_depenency,
    user_id: int,
):
    user_to_delete = db.query(UserModel).filter(UserModel.id == user_id).first()
 
    if user_to_delete is None:
        raise HTTPException(
            status_code=404,
            detail="User details not found"
        )
   
    db.query(NotAnswer_Question).filter(NotAnswer_Question.user_id == user_id).delete()
    db.commit()
       
    db.query(UserModel).filter(UserModel.id == user_id).delete()
    db.commit()
   
    return{
        'success': True,
        'message': 'User deleted successfully'
    }  
   
 
# Delete Tags by user-id
@auth_routes.delete('/delete-tags-by-userID/{tag_id}')
async def delete_tag_by_user_id(
    db: db_depenency,
    tag_id: int,
):
   
    db.query(TagModel).filter(TagModel.id == tag_id).delete()
    db.commit()
   
    return{
        'success': True,
        'message': 'Tags deleted successfully'
    }  
   
   
# Delete Chat by Tag-id
@auth_routes.delete('/delete-chat-by-tag/{tag_id}')
async def delete_chat_by_tag(
    db: db_depenency,
    tag_id: int,
):
   
    db.query(ChatHistoryModel).filter(ChatHistoryModel.tag_id == tag_id).delete()
    db.commit()
   
    return {
        'success': True,
        'message': 'Chat deleted successfully'
    }  