import express from 'express';
import userRoutes from './apps/user/user.route';
import authRoutes from './apps/auth/auth.route';
import domainRoutes from './apps/domain/domain.route';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/domain', domainRoutes);

export = router;
