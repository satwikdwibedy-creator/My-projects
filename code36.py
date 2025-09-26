import requests

def get_crypto_price(crypto="bitcoin", currency="usd"):
    url = f"https://api.coingecko.com/api/v3/simple/price"
    params = {
        "ids": crypto,
        "vs_currencies": currency
    }
    
    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()  # check for errors
        data = response.json()
        return data[crypto][currency]
    except requests.exceptions.RequestException as e:
        print("Error fetching data:", e)
        return None

def crypto_chatbot():
    print("💰 CryptoBot: Check real-time crypto prices! (Type 'quit' to exit)\n")
    
    while True:
        crypto = input("Enter cryptocurrency (e.g., bitcoin, ethereum, dogecoin): ").lower()
        if crypto == "quit":
            print("💰 CryptoBot: Goodbye! 🚀")
            break

        currency = input("Enter currency (e.g., usd, inr, eur): ").lower()
        
        price = get_crypto_price(crypto, currency)
        if price:
            print(f"💰 1 {crypto.capitalize()} = {price} {currency.upper()}\n")
        else:
            print("⚠️ Could not fetch price. Try again.\n")

# Run the chatbot
crypto_chatbot()
