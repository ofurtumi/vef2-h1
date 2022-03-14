CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE categories (
    cat_id uuid DEFAULT uuid_generate_v4 (),
    title VARCHAR NOT NULL UNIQUE,
    PRIMARY KEY (cat_id)
);

CREATE TABLE menuitems (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL UNIQUE,
    price INT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    categoryid uuid,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    CONSTRAINT categoryid FOREIGN KEY (categoryid) REFERENCES categories (cat_id)
);

CREATE TABLE cart (
    cart_id uuid DEFAULT uuid_generate_v4 (),
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (cart_id)
);

CREATE TABLE cartline (
    itemid INT,
    cartid uuid,
    num INT,
    CONSTRAINT itemid FOREIGN KEY (itemid) REFERENCES menuitems (id),
    CONSTRAINT cartid FOREIGN KEY (cartid) REFERENCES cart (cart_id) ON DELETE CASCADE
);

CREATE TABLE orders (
    order_id uuid DEFAULT uuid_generate_v4 (),
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (order_id)
);

CREATE TABLE orderline (
    itemid INT,
    orderid uuid,
    num INT,
    CONSTRAINT itemid FOREIGN KEY (itemid) REFERENCES menuitems (id),
    CONSTRAINT orderid FOREIGN KEY (orderid) REFERENCES orders (order_id) ON DELETE CASCADE
);

CREATE TABLE orderstatus (
    orderid uuid,
    status INT,
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    CONSTRAINT orderid FOREIGN KEY (orderid) REFERENCES orders (order_id)
)