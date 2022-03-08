# vef2-h1

## curl
**til að posta json header**
~~~
curl -X POST -H "Content-Type: application/json" \
-d '{"paramID1": "paramVal1", "paramID2": "paramVal2"}' \
https://demo.com/demo
~~~

**til að setja querystrings**
~~~
curl -G -d 'category=pizzas' localhost:6969/menu
~~~

**til að bæta við menuitem**
~~~
curl -X POST localhost:6969/menu \
 -H "Content-Type: application/json" \
-d '{"title":"titill","price":200, "description":"demo", "image":"linkToImg","categoryid":1}' 
~~~