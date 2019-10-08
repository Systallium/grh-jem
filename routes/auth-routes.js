app.get("/auth/bnet", passport.authenticate("bnet"));

app.get(
  "/auth/bnet/callback",
  passport.authenticate("bnet", {
    failureRedirect: "/"
  }),
  // call back for blizzard to redirct to
  function(req, res) {
    res.redirect("/");
  }
);
