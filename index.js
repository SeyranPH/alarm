const express = require('express');
const bodyParser = require('body-parser');
const router = require('express').Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const User = require('./models/user.js');

let app = express();





app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/signup', async function(req, res, next){
    const { username, email, password } = req.body;
    try {
        const user = await User.create({username: username, email: email, password: password});
        res.send(user);
    }
    catch (error) {
        res.sendStatus(403);
    }
});

router.post('/login', async function(req, res, next){
    const { email, password } = req.query;
    try {
        const user = await User.findOne({email: email, password: password});
        if (user) {
            const uuid = uuidv4();
            await User.updateOne({email}, {accessToken: uuid});
            return res.send({accessToken: uuid});
        }
        return res.sendStatus(401);
    }
    catch (error) {
        return res.sendStatus(500);
    }
});

app.use(router);


mongoose.connect("mongodb://localhost:27017/alarm");

app.listen( 3456, function(){
    console.log('Listening on port 3456');
});