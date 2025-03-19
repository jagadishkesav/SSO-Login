import passport from 'passport';
import { NextFunction, RequestHandler, Response } from 'express';
import { RequestWithQueryParams } from '../../types/types';
import { logger } from '../../lib/logger';

export const signIn = (req: RequestWithQueryParams, res: Response) => {
    const { redirectURL } = req.query;
    if (req.isAuthenticated()) {
        res.redirect(redirectURL);
    } else {
        res.render('login', { redirectURL });
    }
};

export const authGoogle = (
    req: RequestWithQueryParams,
    res: Response,
    next: NextFunction
) => {
    passport.authenticate('google', {
        scope: ['email', 'profile'],
        state: req.query.redirectURL // Pass redirectURL as state parameter
    })(req, res, next);
};

export const googleCallback = (
    req: RequestWithQueryParams,
    res: Response,
    next: NextFunction
) => {
    passport.authenticate('google', {
        failureRedirect: '/auth/sign-in',
        successRedirect: req.query.state
    })(req, res, (err: Error) => {
        if (err) {
            logger.error('Error in passport.authenticate:', err);
        } else {
            logger.info('Authentication completed');
        }
        next();
    });
};

export const signOut = (
    req: RequestWithQueryParams,
    res: Response,
    next: NextFunction
) => {
    if (req.isAuthenticated()) {
        req.logout((err: Error) => {
            if (err) {
                return next(err);
            }
            req.session.destroy(() => {}); // Pass an empty callback function
        });
    }
    res.status(200).send({ isAuthenticated: false });
};

export const getAuth: RequestHandler = (req, res) =>
    res.status(200).send({ isAuthenticated: req.isAuthenticated() });
