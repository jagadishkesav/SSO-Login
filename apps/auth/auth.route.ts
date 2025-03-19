import express from 'express';
const router = express.Router();
import {
    signIn,
    authGoogle,
    googleCallback,
    signOut,
    getAuth
} from './auth.controller';
import { configurePassport } from '../../config/passport';

configurePassport();

router.get('/sign-in', signIn);
router.get('/google', authGoogle);
router.get('/callback', googleCallback);
router.get('/sign-out', signOut);
router.get('/', getAuth);

export = router;
