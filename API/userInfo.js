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

    if(!userId)
    {
        response.send("User id is missing")
    }

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

router.put('/PutPreviouslyActiveChallengeSteps/:userId/:challengeId/:numbOfSteps', (request, response) => {

    const userId = request.params.userId;
    const challengeId = request.params.challengeId;
    const stepsNum = request.params.numbOfSteps;

    if(!userId)
    {
        response.send("User id is missing")
    }

    if(!challengeId)
    {
        response.send("challenge id is missing");
        //hsould add check to see if challenge id cause an overflow
    }

    if(!stepsNum)
    {
        response.send("steps number is missing")
    }

    //gives back all the users
    connection.execute('UPDATE userinfo_challenge SET uc_currSteps = ? WHERE uc_ui_id = ? AND uc_sc_id = ?;',
        [stepsNum, userId, challengeId],
        function (err, results, fields) {
            if (err){
                response.send("err");
            }else{
                if(results.length == 0){
                    response.send("no challenge exists with that id OR user OR Steps.");
                }else{
                    console.log("update of active challenge STEPS succesful");
                    //console.log(matchId);
                    response.status(200).send({
                        "message" : "update of active challenge " + challengeId + " steps suscesfull " + stepsNum
                    });
                }
            }
        });
});

router.put('/PutActiveChallenge/:userId/:challengeId', (request, response) => {

    const userId = request.params.userId;
    const challengeId = request.params.challengeId;

    if(!userId)
    {
        response.send("User id is missing")
    }

    if(!challengeId)
    {
            response.send("challenge id is missing");
            //hsould add check to see if challenge id cause an overflow
    }

    //gives back all the users
    connection.execute('UPDATE userinfo SET ui_activeChallRef = ? WHERE ui_id = ?;',
        [challengeId, userId],
        function (err, results, fields) {
            if (err){
                response.send("err");
            }else{
                if(results.length == 0){
                    response.send("no challenge exists with that id OR user.");
                }else{
                    console.log("update of active challenge succesful");
                    //console.log(matchId);
                    response.status(200).send({
                        "message" : "update of active challenge " + challengeId + " succesfull"
                    });
                }
            }
        });
});

module.exports = router;