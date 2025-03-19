import session, { SessionOptions } from 'express-session';
import config from '.';

const sessionOptions: SessionOptions = {
    secret: config.session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
};

export = session(sessionOptions);
