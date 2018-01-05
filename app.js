const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJwt = require('passport-jwt');
const models = require('./models')
const sequelize = require('sequelize');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./configs/config.json');

const index = require('./routes/index');
const login = require('./routes/login');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(morgan('dev'));

console.log(config);
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.secret;

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    console.log("PAYLOAD: ", jwt_payload);
    models.Users.findOne({where: {id: jwt_payload.id}}).then(response => {
        return done(null,response);
    });
}));
app.use(passport.initialize());

app.use('/', index);
app.use('/login', login);

//console.log(models);
//use force: true inside sync to recreate dbs -- {force: true}
models.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("Listening on 3001");
    });
});

