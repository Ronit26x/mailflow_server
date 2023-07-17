const userProfiles = require('../model/userProfiles')
const passport = require('passport');
const { response } = require('express');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;


passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    userProfiles.findOne({id: jwt_payload.sub}).then(function(user,err) {
        if (err) {
            console.log(err);
            return done(err, false);
        }
        if (user) {
            return done(null, user);
            
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));