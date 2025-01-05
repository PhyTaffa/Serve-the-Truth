const express = require('express');
const router = express.Router();
const connection = require('../database');

router.get('/all', (request, response) => {

    //gives back all the users
    connection.execute('SELECT * FROM Step_Challenge;',
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


router.get('/ById/:userId', (request, response) => {

    const userId = request.params.userId;

    if(!userId){
        response.send("user id is missing");
    }



    //gives back all the users
    connection.execute('SELECT uc_id, ui_id, sc_id, sc_title, sc_description, sc_assets, sc_skin, sc_difficulty, sc_stepsToReach, sc_timeLimit, uc_currSteps, uc_startTime, uc_isStarted FROM UserInfo_Challenge INNER JOIN UserInfo ON ui_id = uc_ui_id INNER JOIN Step_Challenge ON uc_sc_id = sc_id WHERE uc_ui_id = ?;',
        [userId],
        function (err, results, fields) {
            if (err){
                response.send(err);
            }else{
                if(results.length == 0){
                    console.log("no steps challenges exists with said user");
                    response.send("no steps challenges exists with said user");
                }else{
                    console.log("steps challenges of said user found");
                    //console.log(matchId);
                    response.send(results);
                }
            }
        });
});




module.exports = router;