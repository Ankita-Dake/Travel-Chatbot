from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_chat():
    login_response = client.post("/login", 
                           data={"username": "shiv12@gmail.com", "password": "12345"}
                           )
    assert login_response.json() == {
        "access_token":login_response.json()['access_token'],"token_type":"bearer"}
    token = login_response.json()['access_token']
    chat_data = {
        "history_id": 1,
        "user_query": "hi",
        "tag_id": 1,
    }
    chat_response = client.post(f"/chat/{token}",json=chat_data)
    assert chat_response.status_code==200

def test_create_chat_naq():
    login_response = client.post("/login", 
                           data={"username": "shiv12@gmail.com", "password": "12345"}
                           )
    assert login_response.json() == {
        "access_token":login_response.json()['access_token'],"token_type":"bearer"}
    token = login_response.json()['access_token']
    data = {
        "history_id": 1,
        "user_query": "I am sorry! I don't understand you",
        "tag_id": 1,
    }
    naq_respone = client.post(f"/chat/{token}",json=data)
    assert naq_respone.status_code==200

def test_get_history():
    history_response = client.get("/histroy/1")
    assert history_response.status_code == 200
    print("Get tag by id successfull")

def test_get_naq():
    login_response = client.post("/login", 
                           data={"username": "test123@gmail.com", "password": "12345"}
                           )
    print(login_response.json()['access_token'])
    headers = {
        'Authorization': f"Bearer {login_response.json()['access_token']}"
    }
    naq_response = client.get("/not-answer-question/",headers=headers)
    assert naq_response.status_code == 200
    print("Get naq successfull")