const mysql = require('mysql2');

// Create a new connection to the database
const connection = mysql.createConnection({

    //localhost:

    host: 'localhost',
    user: 'root', 
    password: '123',
    database: 'serve-the-truth' 

});

module.exports = connection;