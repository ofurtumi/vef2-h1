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
('meat paradise soup', 750, 'meat and water', 'linkToImage', 4);
