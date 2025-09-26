import requests
def get_weather(city,apikey):
    url=f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={apikey}&units=metric"
    response=requests.get(url)
    if response.status_code==200:
        data=response.json()
        weather=data['weather'][0]['description']
        temp=data['main']['temp']
        print(f"Weather in {city}: {weather}, Temperature: {temp}°C")
    else:
        print("Error fetching weather data")
if __name__=="__main__":
    city=input("Enter city name: ")
    apikey="ce2978bc1475b67ec882750540c9bac7"
    get_weather(city,apikey)

