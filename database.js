//require('dotenv').config(); // Load environment variables

const mysql = require('mysql2');

// Create a new connection pool
const pool = mysql.createPool({

    //localHost:
    // host: 'localhost',
    // user: 'root',
    // password: '123',
    // database: 'serve-the-truth' 

    
    //Filess.io:
    host: '9nrms.h.filess.io',
    user: 'ServeTheTruth_individual', 
    port: "3307",
    password: 'b30aa021bd77a83b6cb81330dc52e0719f677bce',
    database: 'ServeTheTruth_individual',


    //aiven:
    // host: 'trutthing-filippotaffarello-0cd8.d.aivencloud.com',
    // user: 'avnadmin', 
    // port: "18923",
    // password: '',
    // database: 'defaultdb',


    //who tf know at this point

    // host: 'sql7.freesqldatabase.com',
    // user: 'sql7755810', 
    // port: "3306",
    // database: "sql7755810",
    // password: '',
    
    //better practise, but i will leave the rest just to be sure
    // host: process.env.DB_HOST ,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // port: process.env.DB_PORT,
    // database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 2,    // Match the connection limit of your online DB
    queueLimit: 0          // No limit on queue size (can be adjusted)
});

// Use promise-based API for convenience
const connection = pool;

module.exports = connection;
