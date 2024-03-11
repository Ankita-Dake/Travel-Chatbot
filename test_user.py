from fastapi.testclient import TestClient
from main import app
from fastapi import status

client = TestClient(app)

# def test_create_user():
#     payload = {
#         "name" : "pratik gade",
#         "email" :"pg11@gmail.com",
#         "password" :"12345",
#        "phone_number":"8767876788",
#        "user_type":"ADMIN",
#        "is_active":"True"
#     }
#     response = client.post("/create-user", json=payload)
#     assert response.status_code == status.HTTP_201_CREATED

def test_create_user_fail():
    payload = {
        # "name" : "test",
        "email" :"test@gmail.com",
        "password" :"12345",
       "phone_number":"8767876788",
       "user_type":"ADMIN",
       "is_active":"True"
    }
    user_response = client.post("/create-user", json=payload)
    assert user_response.status_code == 422

def test_duplicate_email():
    duplicate_data = {
        "name" : "test",
        "email" :"test123@gmail.com",
        "password" :"12345",
       "phone_number":"8767876788",
       "user_type":"ADMIN",
       "is_active":"True"
    }
    dupilcate_email_respone = client.post("/create-user", json=duplicate_data)
    assert dupilcate_email_respone.status_code==400
    assert dupilcate_email_respone.json()=={"detail":"Email already registered"}

def test_user_login():
    login_response = client.post("/login", 
                           data={"username": "shiv12@gmail.com", "password": "12345"}
                           )
    assert login_response.status_code == 200
    print(login_response.json())
    assert login_response.json() == {
        "access_token":login_response.json()['access_token'],"token_type":"bearer"}
    print("user login successfull")

def test_user_login_fail():
    data={
        'username':'test123@gmail.com',
        # 'password':'12345',
    }
    login_response = client.post("/login", data=data)
    assert login_response.status_code == 422
    print("user login fail")

def test_user_email_not_found():
    data={
        'username':'test1111@gmail.com',
        'password':'12345',
    }
    email_notfound_response = client.post("/login", data=data)
    assert email_notfound_response.status_code == 401
    assert email_notfound_response.json()=={"detail":"This username not found"}

def test_user_get():
    get_response = client.get("/users/37")
    assert get_response.status_code == 200
    print("Get user by id successfull")

def test_user_all_get():
    login_response = client.post("/login", 
                           data={"username": "test123@gmail.com", "password": "12345"}
                           )
    print(login_response.json()['access_token'])
    headers = {
        'Authorization': f"Bearer {login_response.json()['access_token']}"
    }

    all_user_response = client.get("/users/",headers= headers)
    assert all_user_response.status_code == 200
    print("Get all user successfull")

def test_update_user():
    update_data= {
    "name": "demo",
    "email": "demo99@gmail.com",
    "phone_number": "9878987678",
    "user_type": "USER",
    "is_active":"True",
    "created_at": "2024-02-08T19:00:18.635635",
    "updated_at": "2024-02-08T19:00:18.635635"
     }
   
    update_response=client.put("/update_user/34", json=update_data)
    assert update_response.status_code == 200
    print("User updates successfull")
    
def test_update_user_failID():
    update_data= {
    "name": "yash patil",
    "email": "yp@gmail.com",
    "phone_number": "9878987678",
    "user_type": "USER",
    "is_active":"True",
    "created_at": "2024-02-08T19:00:18.635635",
    "updated_at": "2024-02-08T19:00:18.635635"
     }
   
    update_response=client.put("/update_user/90", json=update_data)
    assert update_response.status_code == 404
    print("User details not found")

# def test_user_delete():
#     delete_reponse = client.delete("/delete-user/1")
#     assert delete_reponse.status_code == 200
#     print("Get user by id  deleted successfull")

def test_user_delete_failID():
    delete_reponse = client.delete("/delete-user/90")
    assert delete_reponse.status_code == 404
    print("User details not found")
