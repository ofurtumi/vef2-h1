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
    id VARCHAR UNIQUE,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
);

CREATE TABLE cartline (
    item INT NOT NULL,
    cartid VARCHAR NOT NULL,
    num INT,
    CONSTRAINT item FOREIGN KEY (item) REFERENCES menuitems (id),
    CONSTRAINT cartid FOREIGN KEY (cartid) REFERENCES cart (id)
);

CREATE TABLE orders (
    id VARCHAR UNIQUE,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    name VARCHAR NOT NULL
);

CREATE TABLE orderline (
    item INT,
    orderid VARCHAR,
    num INT,
    CONSTRAINT item FOREIGN KEY (item) REFERENCES menuitems (id),
    CONSTRAINT orderid FOREIGN KEY (orderid) REFERENCES orders (id)
);

CREATE TABLE orderstatus (
    orderid VARCHAR,
    status INT,
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    CONSTRAINT orderid FOREIGN KEY (orderid) REFERENCES orders (id)
)