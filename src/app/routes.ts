import express from 'express';
import userRouter from './modules/user/user.route';
import authRouter from './modules/auth/auth.route';

const router = express.Router();

router.use('/users', userRouter);

router.use('/auth', authRouter);


export default router;
