const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/User");
const config = require("../config");
console.log(config.google.callbackURL);
const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {

        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create({
              googleId: profile.id,
              displayName: profile.displayName,
              // Add any other fields you want to store
            });

            done(null, user);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

module.exports = configurePassport;
