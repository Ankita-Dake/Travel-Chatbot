from fastapi import FastAPI,APIRouter,HTTPException
import requests

map_router  = APIRouter()

@map_router.get("/distance")
def calculate_distance(origin: str, destination: str, api_key: str):
    url = f"https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}&key={api_key}"
    response = requests.get(url)
    data = response.json()

    # Check if the response contains any routes
    if "routes" not in data or not data["routes"]:
        raise HTTPException(status_code=404, detail="No routes found for the given origin and destination.")

    # Get the distance from the first route and leg
    route = data["routes"][0]
    if "legs" not in route or not route["legs"]:
        raise HTTPException(status_code=404, detail="No legs found for the given route.")
    
    leg = route["legs"][0]
    if "distance" not in leg:
        raise HTTPException(status_code=404, detail="No distance found for the given leg.")

    distance = leg["distance"]["text"]
    return {"distance": distance}