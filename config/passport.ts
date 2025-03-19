import passport, { Profile } from 'passport';
import { Request } from 'express';
import config from '.';
import {
    Strategy as GoogleStrategy,
    VerifyCallback
} from 'passport-google-oauth2';

export const configurePassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: config.google.clientID,
                clientSecret: config.google.clientSecret,
                callbackURL: config.google.callbackURL,
                passReqToCallback: true
            },
            (
                _request: Request,
                _accessToken: string,
                _refreshToken: string,
                profile: Profile,
                done: VerifyCallback
            ) => {
                done(null, {
                    name: profile.displayName,
                    email: profile.emails ? profile.emails[0].value : ''
                });
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user: Profile, done) => {
        done(null, user);
    });
};
