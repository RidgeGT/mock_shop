-- =============== Insert test password ===============
USE user_info;
INSERT INTO users(first_name,last_name,email)
VALUES("Eli","Short","myemail@host.com"),
    ("John","Compton","another_one@host.com");

SELECT * FROM users;

USE user_enc_db;
INSERT INTO user_enc_db.enc_hash_table(userid,enc_hash)
SELECT user_info.users.userid,"insert password here" 
FROM user_info.users
WHERE user_info.users.email = "myemail@host.com";

SELECT * FROM user_enc_db.enc_hash_table;
-- =============== Complex query for password given email ===============
SELECT enc_hash_table.enc_hash 
FROM user_enc_db.enc_hash_table JOIN user_info.users
ON user_enc_db.enc_hash_table.userid = user_info.users.userid
WHERE user_info.users.email = "myemail@host.com";
-- =============== BEGIN DELETE ===============

DELETE FROM user_enc_db.enc_hash_table
WHERE enc_hash_table.userid IN 
(SELECT * FROM 
    (SELECT enc_hash_table.userid 
    FROM user_enc_db.enc_hash_table JOIN user_info.users
    ON user_enc_db.enc_hash_table.userid = user_info.users.userid
    WHERE user_info.users.email = "myemail@host.com") AS TEMP
);

USE user_info;
DELETE FROM USERS 
WHERE email LIKE "myemail@host.com" 
OR email LIKE "another_one@host.com";

SELECT * FROM user_info.users;
SELECT * FROM user_enc_db.enc_hash_table;
