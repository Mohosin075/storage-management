import express from 'express';
import userRouter from './modules/user/user.route';
import authRouter from './modules/auth/auth.route';
import folderRouter from './modules/folder/folder.routes';

const router = express.Router();

router.use('/users', userRouter);

router.use('/auth', authRouter);

router.use('/folders', folderRouter);


export default router;
