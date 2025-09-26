import requests
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

city=input("Enter the name of the city:")
apikey="ce2978bc1475b67ec882750540c9bac7"
url=f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={apikey}&units=metric"

response=requests.get(url)
data=response.json()
forecast=data["list"]
info=pd.DataFrame([{"Datatime":item["dt_txt"],"temp":item["main"]["temp"],"Humidity":item["main"]["humidity"],"Windspeed":item["wind"]["speed"],"Condition":item["weather"][0]["description"]}for item in forecast])
avgtemp=np.mean(info["temp"])
plt.figure(figsize=(10,5))
plt.plot(info["Datatime"],info["temp"],label="Weather data",marker="o")
plt.xticks(rotation=45)
plt.xlabel("Date and time")
plt.ylabel("Temperature")
plt.title(f"Weather forecast for {city}")
plt.legend()
plt.show()

