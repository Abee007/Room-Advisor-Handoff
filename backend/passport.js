const CasStrategy = require("passport-cas2").Strategy;
const passport = require("passport");

const cas = new CasStrategy(
  {
    version: "CAS2.0",
    casURL: "https://secure.its.yale.edu/cas",
  },
  // This is the `verify` callback
  function (req, profile, done) {
    // profile get returned to the '/auth/login/success' route as req.user

    // therefore syntax = done(null, {data returned to the route})
    done(null, profile);
  }
);

passport.use(cas);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
