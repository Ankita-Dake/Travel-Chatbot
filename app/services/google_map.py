# import googlemaps
# from fastapi import FastAPI,APIRouter,HTTPException
# import requests

# map_routes  = APIRouter()


# api = open('google_map_api.txt','r')
# apikey = api.read()

# maps = googlemaps.Client(key=apikey)
# @map_routes.get("/distance")
# def distance():
#     startdestination = input("where will you begin your drive?\n")
#     enddestination = input("where will you end your drive?\n")

#     distance = maps.directions(startdestination,enddestination)

#     kmdistance = (distance[0]['legs'][0]["distance"]['text'])
#     hrsminsduration = (distance[0]['legs'][0]["duration"]['text'])

#     print("your drive will cover total distance of"+kmdistance+", taking total time "+hrsminsduration+".")