INSERT INTO categories
(cat_id,title)
VALUES
('27dc4dc7-7a06-4306-9923-f124066747fa','burgers'),
('e7cfb87e-d881-4d23-91b1-47295846ef42','pizzas'),
('02726ec2-192f-4971-a01c-60964179588f','salads'),
('1a209e14-5b00-4986-bb72-ac0390e8b176','soups');

INSERT INTO menuitems
(title, price, description, image, categoryid)
VALUES 
('cheeseburger',500,'burger with cheese on it', 'v1647262526/cheese-burger-picture-id509613854_clmeo3.jpg', '27dc4dc7-7a06-4306-9923-f124066747fa'),
('hamburger',350,'burger with no cheese', 'v1646919523/0dd96d5718f3fa2a04e853110e757817_tlqdlb.jpg', '27dc4dc7-7a06-4306-9923-f124066747fa'),
('veganburger',500,'burger with no meat', 'v1647262596/the-dirty-vegan-chili_qyhenn.jpg', '27dc4dc7-7a06-4306-9923-f124066747fa'),
('meat paradise burger',750,'burger with lots of meat', 'v1647262668/NGaa9_pr01ww.jpg', '27dc4dc7-7a06-4306-9923-f124066747fa'),
('margherita', 790, 'pizza with cheese', 'v1647262736/Wn8EaDcIsqK9Y3v_E_Zd231MRfQpbMnwdBLySfwryLc_sz0dxd.jpg', 'e7cfb87e-d881-4d23-91b1-47295846ef42'),
('pepperoni pizza', 990, 'pizza with pepperoni', 'v1647262801/very-bad_sklio8.jpg', 'e7cfb87e-d881-4d23-91b1-47295846ef42'),
('hawaiian', 990, 'pizza with pineapple and ham', 'v1647262845/sub-buzz-4967-1475705302-1_qxuczb.jpg', 'e7cfb87e-d881-4d23-91b1-47295846ef42'),
('meat paradise pizza', 1290, 'pizza with lots of different meat', 'v1647262902/359qwqg14j271_fhjq7w.jpg', 'e7cfb87e-d881-4d23-91b1-47295846ef42'),
('ceasar salad', 500, 'classic ceasar salad', 'v1647262946/awful-caesar-salad_jlgrmx.jpg', '02726ec2-192f-4971-a01c-60964179588f'),
('chicken salad', 790, 'fancy chicken with salad on top', 'v1647262946/awful-caesar-salad_jlgrmx.jpg', '02726ec2-192f-4971-a01c-60964179588f'),
('greek salad', 790, 'salad from east? europe', 'v1647263064/a-la-carte-greek-salad_rbvkfi.jpg', '02726ec2-192f-4971-a01c-60964179588f'),
('meat paradise salad', 1090, 'all of our meat in a bowl and a tomato', 'v1647263126/y68j51j2y9z21_nw5fsq.jpg', '02726ec2-192f-4971-a01c-60964179588f'),
('good soup', 490, 'soup of the day, mmm good soup', 'v1647263178/Adam-Driver-Good-Soup-_hpsfgg.jpg', '1a209e14-5b00-4986-bb72-ac0390e8b176'),
('french onion soup', 750, 'oui oui baguette', 'v1647263227/Dmojd-C3Cc4A8d7xlGIhbstEhoBKpLY5s6PdhliCWYY_ojdvyk.jpg', '1a209e14-5b00-4986-bb72-ac0390e8b176'),
('bean soup', 750, 'salt meat and beans, two coins', 'v1647263266/spicy-black-bean-soup-4_suqhqy.jpg', '1a209e14-5b00-4986-bb72-ac0390e8b176'),
('Hamborger of the month', 950, 'Ask the waiter what the burger is this month', 'v1647263355/Dirty_Burger_Vauxhall_5_dif5xi.jpg', '27dc4dc7-7a06-4306-9923-f124066747fa'),
('Fat bastard', 1020, '150g Burger, spicy mayo, beef brisket, aged Tindur cheese, tomatoes and onion served with tomato relish, pickled jalapeno, pickles and french fries', 'v1647263404/1200x0_ssq3c0.jpg', '27dc4dc7-7a06-4306-9923-f124066747fa'),
('skinny one', 870, 'Burger with Portobello mushroom, baked garlic aioli, arugula, tomato relish and french fries','v1647263511/81250807_Fe5g1F_qixCF4l9Bo2LoXj7R4jXnZoBAQY_giFplBoc_oefyg6.jpg','27dc4dc7-7a06-4306-9923-f124066747fa'),
('Parma Rucola', 790, 'Parma ham, rucola, black pepper and pesto', 'v1647263561/Mortazza-da-Susy-copy-300x300_liqqet.jpg', 'e7cfb87e-d881-4d23-91b1-47295846ef42'),
('Mexican', 790, 'Chicken, red onion, jalapeno, nachos and cheese blend', 'v1647263600/a3a356516c82ad417b2cae2b05bd0cac--pet-peeves-mexicans_is7ljj.jpg', 'e7cfb87e-d881-4d23-91b1-47295846ef42'),
('Hot date', 890, 'Cheese blend, chorizon, bacon, dates and cream cheese', 'v1647263699/348s_cbiegj.jpg', 'e7cfb87e-d881-4d23-91b1-47295846ef42'),
('Baby pizza', 370, 'small pizza with one topping', 'v1647263750/enhanced-16073-1533311998-5_rkgxhx.jpg', 'e7cfb87e-d881-4d23-91b1-47295846ef42'),
('Tex mex', 600, 'Spinach, iceberg and romain salad with chicken, corn and deepfried jalapeno', 'v1647263814/main-qimg-a054fd6189052bf0d3f80d51c99ccbde_fkz6l5.webp', '02726ec2-192f-4971-a01c-60964179588f'),
('Oriental', 500, 'Spinach, ruccola and romain salad with chicken, edamame, beans and mango', 'v1647263872/sea-cucumber-e1525607115970.jpg_fqnruq.jpg', '02726ec2-192f-4971-a01c-60964179588f'),
('Falafel', 460, 'Spinach, ruccola and romain salad with falafel balls', 'v1647263920/the-king-of-falafel-mo_cxizkr.jpg', '02726ec2-192f-4971-a01c-60964179588f'),
('Cobb salad', 600, 'Spinch, ruccola and romain salad with chicken thighs, eggs and avocado', 'v1647264001/enhanced-buzz-13864-1352404754-6_tytpf7.jpg','02726ec2-192f-4971-a01c-60964179588f'),
('Mushroom soup', 670, 'Creamy mushroom soup with wild mushrooms', 'v1647264084/k19l7koe4jx31_soqavl.jpg', '1a209e14-5b00-4986-bb72-ac0390e8b176'),
('Chicken soup', 700 , 'The way mama wanted aspired to make', 'v1647264128/photo-32_yfjcef.jpg', '1a209e14-5b00-4986-bb72-ac0390e8b176'),
('Aspargus soup', 560, 'Cream of aspargus', 'v1647264178/20110412_asparagus3-1024x683_l1szek.jpg', '1a209e14-5b00-4986-bb72-ac0390e8b176'),
('meat paradise soup', 750, 'meat and water', 'v1647264209/P9060096_u2mnzd.jpg', '1a209e14-5b00-4986-bb72-ac0390e8b176'),
('testpizza',1000,'test description','testLinkToImage','e7cfb87e-d881-4d23-91b1-47295846ef42');

INSERT INTO cart (cart_id)
VALUES ('ae66c235-6b24-47fc-8bc8-c4b8aa838f74');
INSERT INTO cartline (itemid, cartid, num)
VALUES (1, 'ae66c235-6b24-47fc-8bc8-c4b8aa838f74', 2),
    (5, 'ae66c235-6b24-47fc-8bc8-c4b8aa838f74', 1),
    (19, 'ae66c235-6b24-47fc-8bc8-c4b8aa838f74', 4),
    (7, 'ae66c235-6b24-47fc-8bc8-c4b8aa838f74', 3),
    (8, 'ae66c235-6b24-47fc-8bc8-c4b8aa838f74', 4),
    (15, 'ae66c235-6b24-47fc-8bc8-c4b8aa838f74', 2);