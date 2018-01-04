const express = require('express');
const route = express.Router();
const models = require('./../models');
const passport = require('passport');
const jwt = require('jsonwebtoken');


route.get('/', passport.authenticate('jwt', {session: false}), (req,res,next) => {
    
    res.json(req.user);
})
route.get('/test', passport.authenticate('jwt', {session: false}), (req,res,next) => {
    var decoded = jwt.verify(token, 'y0y0');
    console.log(decoded.foo) // bar
    res.json(req.user);
})


module.exports = route;