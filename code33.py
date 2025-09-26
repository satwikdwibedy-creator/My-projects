import requests
cities=['Mumbai','Delhi','Bangalore','Hyderabad','Ahmedabad']
aqitoken='85883fdc005b7ace234b3b6b38984fc42e64d049'
def getaqi(city):
    url=f"https://api.waqi.info/feed/{city}/?token={aqitoken}"
    response=requests.get(url)
    data=response.json()
    if(data['status']=='ok'):
        return data['data']['aqi']
    else:
        return None
for city in cities:
    aqi=getaqi(city)
    if(aqi is not None):
        print(f"The AQI of {city} is {aqi}")
    else:
        print(f"Could not retrieve AQI for {city}")
