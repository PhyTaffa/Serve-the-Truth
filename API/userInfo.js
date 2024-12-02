const express = require('express');
const router = express.Router();
const connection = require('../database');


router.get('/all', (request, response) => {

    //gives back all the users
    connection.execute('SELECT * FROM userinfo;',
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

router.get('/GetById/:userId', (request, response) => {

    const userId = request.params.userId;

    //gives back all the users
    connection.execute('SELECT * FROM userinfo WHERE ui_id = ?',
        [userId],
        function (err, results, fields) {
            if (err){
                response.send("err");
            }else{
                if(results.length == 0){
                    response.send("no users exists with that id");
                }else{
                    console.log("user found");
                    //console.log(matchId);
                    response.send(results[0]);
                }
            }
        });
});

module.exports = router;