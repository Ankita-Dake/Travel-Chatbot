import nltk
import random
import string
import warnings
from fastapi import APIRouter
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

warnings.filterwarnings('ignore')

chat_routes = APIRouter() 

path = r"D:\Travel Chatbot-Ankita Dake\Travel_ChatBot_Project\posts.txt"
assert os.path.isfile(path)
# with open(path, "r") as f:
f = open(path,'r',errors='ignore')
raw_data = f.read()
raw = raw_data.lower()

sent_tokens = nltk.sent_tokenize(raw)
word_tokens = nltk.word_tokenize(raw)

# print(sent_tokens)
# print(word_tokens) 

# Pre processing
lemmer = nltk.stem.WordNetLemmatizer()

def lemtoken(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def len_normalize(text):
    return lemtoken(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

# greeting 
greeting_input = ("hello",'hi','hey')
greeting_response = ['hi','hey','hello']

def greeting(sentense):
    for word in sentense.split():
        if word.lower() in greeting_input:
            return random.choice(greeting_response)
        
# vectorizer
def response(user_response):
    my_response=''
    final_str = ""
    sent_tokens.append(user_response)
    TfidfVec = TfidfVectorizer(tokenizer=len_normalize, stop_words='english')
    tfidf = TfidfVec.fit_transform(sent_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx=vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if(req_tfidf==0):
        my_response=my_response+"I am sorry! I don't understand you"
        return my_response
    else:
        my_response = my_response+sent_tokens[idx]
        return my_response
    
def mainresponse(user_response):
    flag=True
    while(flag==True):
        user_response=user_response.lower()
        if(user_response!='bye'):
            if(user_response=='thanks' or user_response=='thank you' ):
                flag=False
                result=("Bot Response: You are welcome..")
            else:
                if(greeting(user_response)!=None):
                   result=(greeting(user_response))
                else:
                    result=response(user_response)
                    sent_tokens.remove(user_response)
            return result
        else:
            flag=False
            print("Bot Response: Bye! take care..")
