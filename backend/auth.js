const passport = require("passport");
const jwt = require("jsonwebtoken");
const { genJwtToken } = require("./utils/jw_helper");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { privateCert } = require("./config").keys;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);
passport.serializeUser(async (profile, done) => {
  const token = await genJwtToken(profile._json);

  process.nextTick(function () {
    return done(null, {
      profile,
      token,
    });
  });
});

passport.deserializeUser((user, done) => {
  // done(null, user);
  process.nextTick(function () {
    return done(null, user);
  });
});
