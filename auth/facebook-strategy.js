const { FB_APP_ID, FB_APP_SECRET, FB_CALLBACK_URL } = require("../configs");

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

// const UserModel = require("../models/User");

module.exports = (app) => {
  app.use(passport.initialize(undefined));
  app.use(passport.session(undefined));

  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((user, cb) => cb(null, user));

  const FB_STRATEGY_CONFIG = {
    clientID: FB_APP_ID,
    clientSecret: FB_APP_SECRET,
    callbackURL: FB_CALLBACK_URL,
    profileFields: ["id", "emails", "name"],
  };

  const verificationCallback = (accessToken, refreshToken, profile, done) =>
    done(null, profile);

  passport.use(new FacebookStrategy(FB_STRATEGY_CONFIG, verificationCallback));
};
