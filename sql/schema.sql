CREATE TABLE categories (
    id SERIAL UNIQUE,
    title VARCHAR NOT NULL UNIQUE
);

CREATE TABLE menuitems (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL UNIQUE,
    price INT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    categoryid SERIAL NOT NULL,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    CONSTRAINT categoryid FOREIGN KEY (categoryid) REFERENCES categories (id)
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