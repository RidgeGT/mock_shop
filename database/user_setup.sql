CREATE DATABASE user_info;
USE user_info;
CREATE TABLE users
(
    first_name VARCHAR(100) DEFAULT "Jesse",
    last_name VARCHAR(100) DEFAULT "James",
    email VARCHAR(255) NOT NULL PRIMARY KEY,
    userid INT NOT NULL UNIQUE AUTO_INCREMENT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE shop_table
(
    item_name VARCHAR(20) NOT NULL DEFAULT "unknown",
    item_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    item_stock INT NOT NULL DEFAULT 0,
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE shopping_cart
(
    cart_item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    order_date TIMESTAMP DEFAULT NOW() NOT NULL,
    FOREIGN KEY(item_id)
        REFERENCES shop_table(item_id)
        ON DELETE CASCADE,
    FOREIGN KEY(email) 
        REFERENCES users(email)
        ON DELETE CASCADE
);