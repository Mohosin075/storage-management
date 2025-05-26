import express from 'express';
import userRouter from './modules/user/user.route';
import authRouter from './modules/auth/auth.route';
import folderRouter from './modules/folder/folder.routes';
import fileRouter, { recentRouter } from './modules/file/file.routes';

const router = express.Router();

router.use('/users', userRouter);

router.use('/auth', authRouter);

router.use('/folder', folderRouter);

router.use('/file', fileRouter);

router.use('/recent', recentRouter);


export default router;
