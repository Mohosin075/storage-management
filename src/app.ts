import express from 'express';
import cors from 'cors';
import authRouter from './app/modules/auth/auth.rotue';
import userRouter from './app/modules/user/user.route';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

export default app;
