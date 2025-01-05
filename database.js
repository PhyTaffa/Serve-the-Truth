require('dotenv').config(); // Load environment variables

const mysql = require('mysql2');

// Create a new connection pool
const pool = mysql.createPool({

    //localHost:
    // host: 'localhost',
    // user: 'root',
    // password: '123',
    // database: 'serve-the-truth' 

    //Filess.io:
    // host: '9nrms.h.filess.io',
    // user: 'ServeTheTruth_individual', 
    // port: "3307",
    // password: 'b30aa021bd77a83b6cb81330dc52e0719f677bce',
    // database: 'ServeTheTruth_individual',

    
    //better practise, but i will leave the rest just to be sure
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 2,    // Match the connection limit of your online DB
    queueLimit: 0          // No limit on queue size (can be adjusted)
});

// Use promise-based API for convenience
const connection = pool.promise();

module.exports = connection;
