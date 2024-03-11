import googlemaps

api = open('google_map_api.txt','r')
apikey = api.read()

maps = googlemaps.Client(key=apikey)

startdestination = input("where will you begin your drive?\n")
enddestination = input("where will you end your drive?\n")

distance = maps.directions(startdestination,enddestination)

kmdistance = (distance[0]['legs'][0]["distance"]['text'])
hrsminsduration = (distance[0]['legs'][0]["duration"]['text'])

print("your drive will cover total distance of"+kmdistance+", taking total time "+hrsminsduration+".")