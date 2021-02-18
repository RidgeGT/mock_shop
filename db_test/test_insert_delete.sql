USE user_info;

-- =============== INSERTS ===============
INSERT INTO users(first_name,last_name,email)
VALUES("Eli","Short","myemail@host.com"),
    ("John","Compton","another_one@host.com");

INSERT INTO shop_table(item_name,item_price,item_stock)
VALUES
("Pine cones","0.50","32"),
("apples","0.92","20"),
("tree branch","1.30","105"),
("gameboy","100.50","5"),
("GPU","9000.50","1");

INSERT INTO shopping_cart(item_id,email)
SELECT item_id,"myemail@host.com" FROM shop_table 
WHERE item_name LIKE "Pine cones"
OR item_name LIKE "apples";


-- =============== DISPLAY THE INSERT ===============
SELECT * FROM users 
WHERE email LIKE "myemail@host.com" 
OR email LIKE "another_one@host.com";

SELECT * FROM shop_table
WHERE item_name LIKE "Pine cones"
OR item_name LIKE "apples"
OR item_name LIKE "tree branch"
OR item_name LIKE "gameboy"
OR item_name LIKE "GPU";

SELECT * FROM shopping_cart 
WHERE email LIKE "myemail@host.com" 
OR email LIKE "another_one@host.com";
-- =============== At least one complex query ===============
SELECT cart_item_id,shop_table.item_id,
shop_table.item_name,order_date,shopping_cart.email
FROM shopping_cart INNER JOIN users INNER JOIN shop_table
ON shopping_cart.email = users.email
WHERE shopping_cart.item_id = shop_table.item_id;
-- =============== BEGIN DELETE ===============

DELETE FROM USERS 
WHERE email LIKE "myemail@host.com" 
OR email LIKE "another_one@host.com";

DELETE FROM shop_table
WHERE item_name LIKE "Pine cones"
OR item_name LIKE "apples"
OR item_name LIKE "tree branch"
OR item_name LIKE "gameboy"
OR item_name LIKE "GPU";

SELECT "DELETED ALL TEST DATA";

SELECT * FROM users;
SELECT * FROM shop_table;
SELECT * FROM shopping_cart;