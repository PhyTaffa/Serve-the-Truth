const mysql = require('mysql2');

// Create a new connection to the database
const connection = mysql.createConnection({

    //localHost:
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'serve-the-truth' 


    //Filess.io:

    // host: '9nrms.h.filess.io',
    // user: 'ServeTheTruth_individual', 
    // port: "3307",
    // password: 'b30aa021bd77a83b6cb81330dc52e0719f677bce',
    // database: 'ServeTheTruth_individual' 

});

module.exports = connection;