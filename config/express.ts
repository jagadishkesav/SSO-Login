import express from 'express';
import passport from 'passport';
import cors from './cors';
import session from './session';
import path from 'path';
import routes from '../route';
import { successHandler, errorHandler } from '../lib/morgan';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(routes);
app.use(successHandler);
app.use(errorHandler);

export = app;
