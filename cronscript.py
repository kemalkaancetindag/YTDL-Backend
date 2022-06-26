import requests

API_URL = 'http://localhost:8080'

response = requests.get(f'{API_URL}/delete')

print(response.json())