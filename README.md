# mock_shop
Mock web application for a online market with integration with a MySQL Server
## Install
### Dependencies
  * `npm install bcrypt`
  * `npm install body-parser`
  * `npm install express`
  * `npm install mysql`
  * `npm install nodemon`
### MySQL Setup
This mock app requires MySQL, download a version suitable for your system, and start the server.
In order to integrate MySQL with node, we need to do the following.
1. Insert MySQL password for your server
2. Build the database schema using CLI

   `source "database/user_setup.sql"`

   `source "database/password_setup.sql"`
## Example
### Running the server
To run the server simply, locate the repository in a command line, then run
`npm run dev`
### Sign up through browser
To test the server, enter the following into your browser

`localhost:3000/signup`

Run some test data
Confirmation of the user being created can be seen in the following.
Look through the database tables for the user and password.
The following is what should be seen.

### deleting users
Currently there are no ways to delete the users through the app, 
therefore SQL commands must be run if you want to delete some users.
Locate the users email, and run the following commands in the MySQL CLI.

`USE user_info;`

`DELETE FROM users WHERE email = "this_email@host.com";`

## Features
### current build
* MySQL schema and integration
* user sign up
* password and email validation
* password hashing and salt
### future changes
* password update
* admin capabilities: delete account
* refactoring of callback nesting
