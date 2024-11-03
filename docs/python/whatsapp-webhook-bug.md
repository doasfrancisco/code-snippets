---
sidebar_position: 2
---

# Whatsapp Webhook Bug

```py
import requests

WHATSAPP_VERSION="v20.0"


# PRODUCTION
WHATSAPP_ACCESS_TOKEN=""
WHATSAPP_BUSINESS_ID="" # Production

url = f"https://graph.facebook.com/{WHATSAPP_VERSION}/{WHATSAPP_BUSINESS_ID}/subscribed_apps"
headers = {
    "Authorization": f"Bearer {WHATSAPP_ACCESS_TOKEN}"
}

response = requests.get(url, headers=headers)
print("Subscribed PRODUCTION apps response:", response.json())



# TEST BUSINESS ACCOUNT
WHATSAPP_ACCESS_TOKEN_TEST="" # Dentist test
WHATSAPP_BUSINESS_ID_TEST="" # Test


url = f"https://graph.facebook.com/{WHATSAPP_VERSION}/{WHATSAPP_BUSINESS_ID_TEST}/subscribed_apps"
headers = {
    "Authorization": f"Bearer {WHATSAPP_ACCESS_TOKEN_TEST}"
}

response = requests.get(url, headers=headers)
print("Subscribed TEST apps response:", response.json())


# # Re-add subscription for "Dentists" app
# add_url = f"https://graph.facebook.com/{WHATSAPP_VERSION}/{WHATSAPP_BUSINESS_ID_TEST}/subscribed_apps"

# add_headers = {
#     "Authorization": f"Bearer {WHATSAPP_BUSINESS_ID_TEST}",
#     "Content-Type": "application/json"
# }
# add_data = {
#     "access_token": WHATSAPP_BUSINESS_ID_TEST
# }
# add_response = requests.post(add_url, headers=add_headers, json=add_data)
# print("Re-add subscription response:", add_response.json())

# TEST
# Subscribed apps response: {
#     'data': [
#         {
#             'whatsapp_business_api_data': {
#                 'link': 'https://www.facebook.com/games/?app_id=',
#                 'name': 'Dentists test', 
#                 'id': ''
#             }
#         },
#         {
#             'whatsapp_business_api_data': {
#                 'link': 'https://www.facebook.com/games/?app_id=',
#                 'name': 'Dentists',
#                 'id': ''
#             }
#         }
#     ]
# }


# # Delete subscription for "Dentists" app
# delete_url = f"https://graph.facebook.com/{WHATSAPP_VERSION}/{WHATSAPP_BUSINESS_ID}/subscribed_apps"
# delete_headers = {
#     "Authorization": f"Bearer {WHATSAPP_ACCESS_TOKEN}"
# }
# delete_data = {
#     "app_id": ""  # ID for "Dentists" app
# }

# delete_response = requests.delete(delete_url, headers=delete_headers, json=delete_data)
# print("Delete PRODUCTION subscription response:", delete_response.json())


# Delete subscription for "Dentists" app
# delete_url = f"https://graph.facebook.com/{WHATSAPP_VERSION}/{WHATSAPP_BUSINESS_ID_TEST}/subscribed_apps"
# delete_headers = {
#     "Authorization": f"Bearer {WHATSAPP_ACCESS_TOKEN}"
# }
# delete_data = {
#     "app_id": ""  # ID for "Dentists" app
# }

# delete_response = requests.delete(delete_url, headers=delete_headers, json=delete_data)
# print("Delete TEST subscription response:", delete_response.json())

```


