var Keys            = require('./keys');
var BNET_ID         = Keys.bnet.clientID;
var BNET_SECRET     = Keys.bnet.clientSecret;
var BnetStrategy    = require('passport-bnet').Strategy;
var User            = require('../models/user');
var userController  = require('../controllers/user');
var CONFIG          = require('./config');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ '_id' : id }, function(err, user) {
            done(err, user);
        });
    });

    // Use the BnetStrategy within Passport.
    passport.use(new BnetStrategy({
            clientID: BNET_ID,
            clientSecret: BNET_SECRET,
            scope: 'wow.profile',
            callbackURL: "https://localhost:3000/auth/bnet/callback",
            region: "us"
        },
        function (accessToken, refreshToken, profile, done) {

            // append auth
            profile.oauth = {
                accessToken: accessToken
            };
            return done(null, profile);
            }));
};