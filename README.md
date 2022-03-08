# vef2-h1

## curl
**til að posta json header**
~~~
curl -X POST https://demo.com/demo \
-H "Content-Type: application/json" \
-d '{"paramID1": "paramVal1", "paramID2": "paramVal2"}'
~~~

**til að setja querystrings**
~~~
curl -G -d 'category=pizzas' localhost:6969/menu
~~~

**til að bæta við menuitem**
~~~
curl -X POST localhost:6969/menu \
-H "Content-Type: application/json" \
-d '{"title":"demoburger","price":200, "description":"demo", "image":"linkToImg","categoryid":1}' 
~~~

**til að ná í sérstakt menuitem útfrá id**
~~~
curl localhost:6969/menu/2
~~~

**til að eyða menuitem af id 1**
~~~
curl -X DELETE localhost:6969/menu/1
~~~

**til að uppfæra menuitem af id 8**
*ath hægt að nota alla parametra sem eru notaðir við að gera nýtt item*
~~~
curl -X PATCH localhost:6969/menu/8 -H "Content-Type: application/json" -d '{"title":"meat hell pizza", "description": "for people who hate meat, and themselves","price":9999}'
~~~