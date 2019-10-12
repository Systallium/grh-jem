var BnetStrategy = require("passport-bnet").Strategy;
var BNET_ID = process.env.BNET_ID;
var BNET_SECRET = process.env.BNET_SECRET;
var keys = require("./keys");
var User = require('../models/user-model')

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findByid(id).then((user) =>{
done(null, user);
    });
});
// Use the BnetStrategy within Passport.
passport.use(
  new BnetStrategy(
    {
      clientID: keys.bnet.clientID,
      clientSecret: keys.bnet.clientSecret,
      callbackURL: "https://localhost:3000/auth/bnet/callback",
      region: "us"
    },
    (accessToken, refreshToken, profile, done) => {
        if (currentUser) {
            console.log('user is: ', currentUser);
            done(null, currentUser);
        } else {
            new User({
                username: profile.displayName,
                BNET_ID: profile.id
            }).save().then((newUser) => {
                console.log('new user created:' + newUser);
                done(null, newUser);
            })
        };
      done(null, profile)
    }
  )
);

module.exports("passport-setup");
