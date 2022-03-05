# skipulag á mögulegum aðgerðum

## /menu
---

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
---

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

