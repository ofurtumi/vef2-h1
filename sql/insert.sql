INSERT INTO categories
(title)
VALUES
('burgers'),
('pizzas'),
('salads'),
('soups');

INSERT INTO menuitems
(title, price, description, image, categoryid)
VALUES 
('cheeseburger',500,'burger with cheese on it', 'linkToImage', 1),
('hamburger',350,'burger with no cheese', 'linkToImage', 1),
('veganburger',500,'burger with no meat', 'linkToImage', 1),
('meat paradise burger',750,'burger with lots of meat', 'linkToImage', 1),
('margherita', 790, 'pizza with cheese', 'linkToImage', 2),
('pepperoni pizza', 990, 'pizza with pepperoni', 'linkToImage', 2),
('hawaiian', 990, 'pizza with pineapple and ham', 'linkToImage', 2),
('meat paradise pizza', 1290, 'pizza with lots of different meat', 'linkToImage', 2),
('ceasar salad', 500, 'classic ceasar salad', 'linkToImage', 3),
('chicken salad', 790, 'fancy chicken with salad on top', 'linkToImage', 3),
('greek salad', 790, 'salad from east? europe', 'linkToImage', 3),
('meat paradise salad', 1090, 'all of our meat in a bowl and a tomato', 'linkToImage', 3),
('good soup', 490, 'soup of the day, mmm good soup', 'linkToImage', 4),
('french onion soup', 750, 'oui oui baguette', 'linkToImage', 4),
('bean soup', 750, 'salt meat and beans, two coins', 'linkToImage', 4),
('Hamborger of the month', 950, 'Ask the waiter what the burger is this month', 'linkToImage', 1),
('Fat bastard', 1020, '150g Burger, spicy mayo, beef brisket, aged Tindur cheese, tomatoes and onion served with tomato relish, pickled jalapeno, pickles and french fries', 'linkToImage', 1),
('skinny one', 870, 'Burger with Portobello mushroom, baked garlic aioli, arugula, tomato relish and french fries','linkToImage',1),
('Parma Rucola', 790, 'Parma ham, rucola, black pepper and pesto', 'linkToImage', 2),
('Mexican', 790, 'Chicken, red onion, jalapeno, nachos and cheese blend', 'linkToImage', 2),
('Hot date', 890, 'Cheese blend, chorizon, bacon, dates and cream cheese', 'linkToImage', 2),
('Baby pizza', 370, 'small pizza with one topping', 'linkToImage', 2),
('Tex mex', 600, 'Spinach, iceberg and romain salad with chicken, corn and deepfried jalapeno', 'linkToImage', 3),
('Oriental', 500, 'Spinach, ruccola and romain salad with chicken, edamame, beans and mango', 'linkToImage', 3),
('Falafel', 460, 'Spinach, ruccola and romain salad with falafel balls', 'linkToImage', 3),
('Cobb salad', 600, 'Spinch, ruccola and romain salad with chicken thighs, eggs and avocado', 'linkToImage',3),
('Mushroom soup', 670, 'Creamy mushroom soup with wild mushrooms', 'linkToImage', 4),
('Chicken soup', 700 , 'The way mama wanted aspired to make', 'linkToImage', 4),
('Aspargus soup', 560, 'Cream of aspargus', 'linkToImage', 4),
('meat paradise soup', 750, 'meat and water', 'linkToImage', 4);
