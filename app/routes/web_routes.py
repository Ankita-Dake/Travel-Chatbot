# from bs4 import BeautifulSoup
# from fastapi import APIRouter
# import requests
# from app.validation.tag_validation import Question
# from chatbot import *

# web_routes = APIRouter()
# bot_routes = APIRouter()

# @web_routes.get("/scrape_web")
# async def scrape_web():
#     try:
#         html_text = requests.get("https://www.kayak.co.in/hotels/Pune,Maharashtra,India-c16803/2024-02-07/2024-02-08/2adults?sort=rank_a")
#         print(html_text)
#         soup = BeautifulSoup(html_text,"html.parser")
#         hotels = soup.find('div',{"class":"IirT IirT-mod-responsive"})
#         print(hotels)
    
#         # hotel_1 = requests.get("https://www.kayak.co.in/hotels/The-Central-Park-Hotel,Pune-c16803-h202358-details/2024-01-19/2024-01-20/2adults?psid=WAFkAFVD2a&pm=daytaxes#overview").text
#         # soup = BeautifulSoup(hotel_1,"lxml")
#         # hotel_name_1 = soup.find("h1").text
#         # hotel_rate_1 = soup.find("div",{"class":"l3xK-reviews-summary-score"}).text
#         # hotel_2 = requests.get("https://www.kayak.co.in/hotels/Hyatt-Place-Pune-Hinjawadi,Pune-c16803-h561842-details/2024-01-19/2024-01-20/2adults?psid=WAFkAFVD2a&pm=daytaxes#overview").text
#         # soup1 = BeautifulSoup(hotel_2,"lxml")
#         # hotel_name_2 = soup1.find("h1").text
#         # hotel_rate_2 = soup1.find("div",{"class":"Ius0"})
#         # hotel_overview_2 = soup1.find("span",{"class":"b40a-description-simple"}).text
       
#         # with open(f'posts',"w") as f:
#         #     f.write(f"Hotel Name: {hotel_name_1}\n")
#         #     f.write(f"rating: {hotel_rate_1}.\n")
#         #     f.write(f"Hotel Name: {hotel_name_2}\n")
#         #     f.write(f"rating:  8.1 {hotel_rate_2}.\n")
#         #     f.write(f"Hotel overview: {hotel_overview_2}\n")
#         #     f.write(f"Hotel check-in: From 14:00.\n")
#         #     f.write(f"Hotel check-out: Prior to 12:00.\n")
#         #     f.write(f"weather information.\n")
            
#         # print(f"file saved")
#     except Exception as e:
#         print("Something wrong", e)

# @bot_routes.post("/bot-response")
# async def response_question(q:Question):
#     response1 = mainresponse(q.question) 
#     return {'response':response1}






















# # import nltk,re
# # nltk.download('punkt')
# # from nltk.tokenize import sent_tokenize, word_tokenize

# # text = "Natural language processing is an exciting area. Huge budget have been allocated for this."

# # print(sent_tokenize(text))
# # print(word_tokenize(text))

# # # Lower case conversion
# # text = re.sub(r"[^a-zA-Z0-9]", " ", text.lower())
# # words = text.split()
# # print(words)

# # # Stop Words removal
# # nltk.download('stopwords')
# # from nltk.corpus import stopwords
# # print(stopwords.words("english"))

# # # Remove stop words
# # words = [w for w in words if w not in stopwords.words("english")]
# # print(words)

# # from nltk.stem.porter import PorterStemmer
# # # Reduce words to their stems
# # stemmed = [PorterStemmer().stem(w) for w in words]
# # print(stemmed)

# # nltk.download('wordnet')
# # from nltk.stem.wordnet import WordNetLemmatizer
# # # Reduce words to their root form
# # lemmed = [WordNetLemmatizer().lemmatize(w) for w in words]
# # print(lemmed)