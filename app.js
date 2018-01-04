const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJwt = require('passport-jwt');
const  models = require('./models')
const sequelize = require('sequelize');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
//const ExtractJwt = passportJwt.ExtractJwt;
//const JwtStrategy = passportJwt.Strategy;

const index = require('./routes/index');
const login = require('./routes/login');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'y0y0';

/* let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    console.log('Payload recieved', jwt_payload);
    models.Users.findOne({where: {username: username}}).then((user) => {
        console.log(jwt_payload);
        next();
    })
})
passport.use(strategy); */
passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    console.log("PAYLOAD: ", jwt_payload);
    models.Users.findOne({where: {id: jwt_payload.id}}).then(response => {
        return done(null,response);
    });
}));
app.use(passport.initialize());
/*passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("username: "+username);
      models.Users.findOne({ where: { username: username }}).then((user) =>{
        console.log(user);
        done(null,user);
      }) /* function (err, user) {
          console.log(user);
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      }); */
   // }
  //)); */

app.use('/', index);
app.use('/login', login);

//console.log(models);
//use force: true inside sync to recreate dbs -- {force: true}
models.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("Listening on 3001");
    });
});

