from fastapi import FastAPI
import re
app=FastAPI()
def extract_amount(text):
    nums=re.findall("/d+",text)
    return int(nums[0]) if nums else 0
def extract_category(text:str):
    det=text.split(" ")
    for i in det:
        if(i=="pizza" or i=="burger"):
            return "food"
        elif(i.isdigit()):
            return "amount"
@app.post("/analyze")
def analyze(text:str):
    return {"food":text,
            "amount":extract_amount(text),
            "category":extract_category(text)}

        
