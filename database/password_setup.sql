CREATE DATABASE user_enc_db;
USE user_enc_db;

CREATE TABLE enc_hash_table
(
    userid INT NOT NULL UNIQUE,
    enc_hash CHAR(64) NOT NULL,
    FOREIGN KEY(userid)
        REFERENCES user_info.users(userid)
        ON DELETE CASCADE 
);