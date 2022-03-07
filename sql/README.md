# gagnagrunns uppsetning

## menu

### categories
* id, unique
* title, varchar, unique, not null

### menuitems
* id, unique
* title, varchar, unique, not null
* price, integer, required
* description, text, required
* image, text, required
* category, foreignkey *categories*
* created, date
* updated, date

## cart

### cart
* id, string, uuid
* created, date

### cartline
* item, foreignkey, *menuitem*
* cartid, foreignkey, *cart*
* num, int > 0

## order

### orders
* id, string, uuid
* created, date
* name, string, required

### orderline
* item, foreignkey, *menuitem*
* orderid, foreignkey, *order*
* num, int > 0

### orderstatus
* id, foreignkey *order*
* status, {0:NEW,1:PREPARE,2:COOKING,3:READY,4:FINISHED}
* updated, date