# vef2-h1

## database
makedb <nafn á db>

þarf líka að setja þetta dót í .env skrá
~~~
DATABASE_URL=postgres://<user>:<password>@localhost/<nafn á db>
SESSION_SECRET=ASDF
BASE_URL=http://localhost:6969
CLOUDINARY_API_KEY= 721412912684114
CLOUDINARY_API_SECRET= GD3ScD7po88P6u55tAb13X2Yqxs
CLOUDINARY_NAME= storimike
~~~

## curl

**til að posta json header**
~~~
curl -X POST https://demo.com/demo \
-H "Content-Type: application/json" \
-d '{"paramID1": "paramVal1", "paramID2": "paramVal2"}'
~~~

### matseðill

**til að setja querystrings**
~~~
curl -G -d 'category=pizzas' localhost:6969/menu
~~~

**til að bæta við menuitem**
~~~
curl -X POST localhost:6969/menu -H "Content-Type: application/json" -d '{"title":"demoburger","price":200, "description":"demo", "image":"linkToImg","categoryid":"27dc4dc7-7a06-4306-9923-f124066747fa"}' 
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

### flokkar

**til að sækja lista af flokkum**
~~~
curl localhost:6969/categories
~~~

**til að bæta við flokk**
~~~
curl -X POST localhost:6969/categories -H "Content-Type: application/json" -d '{"title":"demo category"}'
~~~

**til að eyða flokk**
~~~
curl -X DELETE localhost:6969/categories/1
~~~

**til að uppfæra flokk**
~~~
curl -X PATCH localhost:6969/categories/2 -H "Content-Type: application/json" -d '{"title":"paninis"}'
~~~

### karfa

**til að sækja lista af öllum körfum**
~~~
curl localhost:6969/cart
~~~

**til að búa til nýja körfu**
~~~
curl -X POST localhost:6969/cart
~~~

**til að sækja innihald körfu**
~~~
curl localhost:6969/cart/ae66c235-6b24-47fc-8bc8-c4b8aa838f74
~~~

**til að bæta við í körfu**
~~~
curl -X POST localhost:6969/cart/ae66c235-6b24-47fc-8bc8-c4b8aa838f74 -H "Content-Type:application/json" -d '{"itemid":10,"num":10}'
~~~

**til að eyða körfu**
~~~
curl -X DELETE localhost:6969/cart/ae66c235-6b24-47fc-8bc8-c4b8aa838f74
~~~

**til að sækja línu í körfu þar sem item er með id 1**
~~~ 
curl localhost:6969/cart/ae66c235-6b24-47fc-8bc8-c4b8aa838f74/line/1
~~~

**til að eyða línu í körfu þar sem item er með id 1**
~~~
curl -X DELETE localhost:6969/cart/ae66c235-6b24-47fc-8bc8-c4b8aa838f74/line/1
~~~

**til að breyta magni af vöru í körfulínu**
~~~
curl -X PATCH localhost:6969/cart/ae66c235-6b24-47fc-8bc8-c4b8aa838f74/line/7 -H "Content-Type:application/json" -d '{"num":10}'
~~~

## pöntun

**til að bæta við pöntun**
*ath til að geta bætt við pöntun þarf að vera til valid karfa*
~~~
curl -X POST localhost:6969/orders -H "Content-Type:application/json" -d '{"cartid":"ae66c235-6b24-47fc-8bc8-c4b8aa838f74"}'
~~~

**til að ná í ákveðna pöntun**
~~~
curl localhost:6969/orders/4448c1d5-8d2e-4413-9be7-e026b9c976b9
~~~

**til að ná í status ákveðnar pöntunar**
~~~
curl localhost:6969/orders/4448c1d5-8d2e-4413-9be7-e026b9c976b9/status
~~~

**til að uppfæra status pöntunar**
~~~
curl -X PATCH localhost:6969/orders/4448c1d5-8d2e-4413-9be7-e026b9c976b9/status
~~~