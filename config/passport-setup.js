var BnetStrategy = require('passport-bnet').Strategy;
var BNET_ID = process.env.BNET_ID
var BNET_SECRET = process.env.BNET_SECRET;
const keys = require('./keys')

// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
clientID: "keys.bnet.clientID",
clientSecret: "keys.bnet.clientSecret",
    callbackURL: "https://localhost:3000/auth/bnet/callback",
    region: "us"
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));