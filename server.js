require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("passport");
var util = require("util");
var passportSetup = require("./config/passport-setup");
var keys = require("./config/keys");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var BnetStrategy = require("passport-bnet").Strategy;
var GitHubStrategy = require("passport-github").Strategy;
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use("/auth", authRoutes);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});


var GITHUB_ID = process.env.GITHUB_ID;
var GITHUB_SECRET = process.env.GITHUB_SECRET;
var BNET_ID = process.env.BNET_ID;
var BNET_SECRET = process.env.BNET_SECRET;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the GitHubStrategy within Passport.
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
      callbackURL: "https://localhost/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        return done(null, profile);
      });
    }
  )
);

// Use the BnetStrategy within Passport.
passport.use(
  new BnetStrategy(
    {
      clientID: BNET_ID,
      clientSecret: BNET_SECRET,
      scope: "wow.profile sc2.profile",
      callbackURL: "https://localhost/auth/bnet/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        return done(null, profile);
      });
    }
  )
);

var app = express();

// configure Express
app.use(cookieParser());
app.use(
  session({
    secret: "blizzard",
    saveUninitialized: true,
    resave: true
  })
);

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/"
  }),
  function(req, res) {
    res.redirect("/");
  }
);

app.get("/auth/bnet", passport.authenticate("bnet"));

app.get(
  "/auth/bnet/callback",
  passport.authenticate("bnet", {
    failureRedirect: "/"
  }),
  function(req, res) {
    res.redirect("/");
  }
);

app.get("/", function(req, res) {
  if (req.isAuthenticated()) {
    var output = "<h1>Express OAuth Test</h1>" + req.user.id + "<br>";
    if (req.user.battletag) {
      output += req.user.battletag + "<br>";
    }
    output += "<a href=\"/logout\">Logout</a>";
    res.send(output);
  } else {
    res.send(
      "<h1>Express OAuth Test</h1>" +
        "<a href=\"/auth/github\">Login with Github</a><br>" +
        "<a href=\"/auth/bnet\">Login with Bnet</a>"
    );
  }
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

var server = app.listen(3000, function() {
  console.log("Listening on port %d", server.address().port);
});

module.exports = app;
