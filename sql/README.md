# gagnagrunns uppsetning

## menu

### category
* id, unique
* title, varchar, unique, not null

### menuitem 
* id, unique
* title, varchar, unique, not null
* price, integer, required
* description, text, required
* image, text, required
* category, foreignkey *category*
* created, date
* updated, date

## cart

### cart
* id, string, uuid
* created, date

### cartline
* item, foreignkey, *menuitem*
* cart, foreignkey, *cart*
* num, int > 0

## order

### order
* id, string, uuid
* created, date
* name, string, required

### orderline
* item, foreignkey, *menuitem*
* order, foreignkey, *order*
* num, int > 0

### orderstatus
* id, foreignkey *order*
* status, {0:NEW,1:PREPARE,2:COOKING,3:READY,4:FINISHED}
* updated, date