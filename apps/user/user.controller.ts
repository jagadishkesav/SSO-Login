import { RequestHandler } from 'express';

export const getUser: RequestHandler = async (req, res) => {
    if (req.isAuthenticated()) {
        res.send({ user: req.user });
    } else {
        res.redirect('/auth/sign-in');
    }
};
