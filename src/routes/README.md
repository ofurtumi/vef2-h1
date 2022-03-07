# skipulag á mögulegum aðgerðum

## /menu

### /
* **GET** - list of menuitems, newest first
* **POST** - creates a new menuitem if user is admin
*usage*
~~~ 
/menu?method=post&title=demo&price=420&description=demo%20item&image="public/demo.jpg"&category=1 
~~~

### ?category
* **GET** - list of menuitems that belong to this category, newest first
*usage*
~~~
/menu?category={2}
~~~

### ?search
* **GET** - list of menuitems where title or description contains search parameter
*usage*
~~~
/menu?search={demo}
~~~

### /:id
* **GET** - shows menuitem with corresponding id
* **DELETE** - deletes item if user is admin
* **PATCH** - updates item if user is admin
*usage*
~~~
/menu/1?method=delete

/menu/1?method=patch&title=patchdemo&description=patched%20demo%20item
~~~

## /categories

### /
* **GET** - list of categories
* **POST** - creates a category if valid and user is admin
*usage*
~~~
/categories?method=post&title=categorydemo
~~~

### /:id
* **DELETE** - deletes category if user is admin
* **PATCH** - updates category if user is admin
*usage*
~~~
/categories/1?method=delete

/categories/1?method=patch&title=patchedcategory
~~~

## /cart

### /:cartid
* **GET** - shows cart with the corresponding id and calculated sum price
* **DELETE** - deletes cart with the corresponding id, happens automatically when order is created
* **POST** - adds a cartline to cart with the corresponding id 
*usage*
~~~
/cart/th1si54d3m0c4rt?method=delete

/cart/th1si54d3m0c4rt?method=post&item=1&cart=th1si54d3m0c4rt&num=3
~~~

### /:cartid/line/:id
* **GET** - shows cartline where menuitem has :id and how many of the item there are
* **DELETE** - deletes cartline where menuitem has :id
* **PATCH** - updates number of items in cartline where menuitem has :id
*usage*
~~~
/cart/th1si54d3m0c4rt/line/1?method=delete

/cart/th1si54d3m0c4rt/line/1?method=patch&num=10
~~~

## /orders

### /
* **GET** - lists all orders if user is admin
* **POST** - creates a new order, returns orderstatus and id of order
*usage*
~~~
/orders?method=post&id=th1si54d3m0c4rt&name=demoUser
~~~

### /:id
* **GET** - lists all orderlines of order with the corresponding

### /:id/status
* **GET** - shows order same as /:id with the addition of showing the orders status
* **PATCH** - updates order status if user is admin, can only go forward
*usage*
~~~
/orders/1/status?method=patch
~~~

## /users

### /
* **GET** - shows a list of all users, only if user is admin

### /:id
* **GET** - returns user with the corresponding id, only if user is admin
* **PATCH** - updates the admin status of a user with corresponding id, can only be user if user is admin
*usage*
~~~
/users/1?method=patch&admin=true
~~~

### /register
* **POST** - creates a new user, new user is never admin
*usage*
~~~
/users/register?method=post&email=test@test.com&name=Testman&password=hashedpass
~~~

### /login
* **POST** - signs user in if everything fits
*usage*
~~~
/users/login?method=post&email=test@test.com&password=hashedpass
~~~
