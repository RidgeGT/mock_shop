const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signin_page = 
`
    <div>
        <form method = "POST">
            <input name = "email" placeholder = "email"/>
            <input name = "password" placeholder = "password"/>
            <button>Sign in</button>
        </form>
    </div>
`;

app.use(
    bodyParser.urlencoded({extended:true}),
    express.static(__dirname + "/public")
);

app.get('/signup',(req,res)=>{ 
    res.sendFile(__dirname + "/public/signup.html");
});

app.get('/signin',(req,res)=>{
    res.send(signin_page);
});

app.post('/signin', (req,res) => {
    console.log(req.body);
    res.send("Logged in succesfully. Returning to the main page...");
});


//TODO: Refactor POST to reduce amount of callbacks and use AWAIT/ASYNC keywords
app.post('/signup', (req,res) => {
    //create connection to db
    const connection = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password: '',
        database: 'user_info'
    });
    // QUERY EMAIL
    connection.query("SELECT email from users WHERE email = ?",req.body.email,function(err0,email_result)
    {
    // ================================== First callback ==================================
        console.log("Got email query.");
        if(err0) throw err0;
        if(email_result[0] === undefined)
        {
            console.log("Email does not exists. Continuing...");
            if(isValidPassword(req.body.password))
            {
                console.log("Password is Valid. Continuing...");
                const person = 
                {
                    first_name: req.body.firstname,
                    last_name: req.body.lastname, 
                    email: req.body.email
                };
                // INSERT USER
                connection.query('INSERT INTO users SET ?;',person,
                function(err1,insert_results){
                // ================================== Second Callback ==================================
                    if(err1) throw err1;
                    console.log(`Added New User into database: ${person.first_name} ${person.last_name}`);
                    //INSERT (HASH) Password
                    // GET USER ID FROM DB to store hash
                    let this_user_id = 0;
                    connection.query('SELECT userid FROM users WHERE email = ?',req.body.email,
                    function(err2,id_results)
                    {
                    // ================================== Third callback ==================================
                        if(err2) throw err2;
                        this_user_id = id_results[0].userid;
                        // store userid and hash together in other db
                        // change database
                        connection.changeUser({database: 'user_enc_db'},
                        function(err3)
                        {
                            if(err3) throw err3;
                        });
                        // GENERATE HASH FROM PASSWORD
                        bcrypt.hash(req.body.password,saltRounds,
                        function(err3,hash){
                        // ================================== Fourth callback ==================================
                            if(err3) throw err3;
                            const user_hash = {
                                userid: this_user_id,
                                enc_hash: hash
                            };
                            // INSERT HASH
                            connection.query('INSERT INTO enc_hash_table SET ?',user_hash,
                            function(err4,hash_insert_results)
                            {
                            // ================================== Fifth callback ==================================
                                if(err4) throw err4;
                                console.log("Added newest user hash to database.");
                                // CLOSE CONNECTION
                                console.log("Now closing query connection.");
                                connection.end();
                            });
                        });
                        // Send account confirmation
                        res.send("Account Created. Please validate your email. Redirecting to login page...");
                    });
                });
            }
            else
            {
                console.log("Password check failed. Javascript was probably disabled.")
                res.sendFile(__dirname + "/public/signup.html");
                connection.end();
            }
        }
        else
        {
            console.log("Email exists. Closing connection.")
            connection.end();
            res.sendFile(__dirname + "/public/email_exists.html");
        }
    });
});


//=================================================== LISTENER ===================================================
const portNUM = 3000;
app.listen(portNUM,()=>{
    console.log('Listening on ' + portNUM);
});


//=================================================== Restart timestamp ===================================================
let time_data = new Date();
let now = time_data.getHours() + ":" 
    + time_data.getMinutes() + ":" 
    + time_data.getSeconds();
console.log("Restarted at " + now);

function isValidPassword(password)
{
    console.log("Checking if password is valid.");
    if(password.length < 8)
    {
      	console.log('Password too short');
        return false;	
    }
    if(password.indexOf(' ') !== -1)
    {
      	console.log('Password contains spaces');
        return false;
    }
    var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/;
    if(!regex.test(password))
    {
        console.log("Password must contain at least one number, lowercase, one uppercase"
        + " and one special character.");
        return false;
    }
    return true;
}