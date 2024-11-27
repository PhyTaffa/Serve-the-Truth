const express = require('express');
const router = express.Router();
const connection = require('../database');

router.get('/all', (request, response) => {

    //gives back all the users
    connection.execute('SELECT * FROM step_challenge WHERE ;',
        function (err, results, fields) {
            if (err){
                response.send(err);
            }else{
                if(results.length == 0){
                    console.log("no users exists in the db");
                    response.send("no users exists in the db");
                }else{
                    console.log("all users found");
                    //console.log(matchId);
                    response.send(results);
                }
            }
        });
});

module.exports = router;