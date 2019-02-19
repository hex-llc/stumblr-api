#!/bin/sh

API="http://localhost:4741"
URL_PATH="/blogs"

curl "${API}${URL_PATH}/${ID}" \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
