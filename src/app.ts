import express from 'express';
import cors from 'cors';
import router from './app/modules/user/user.route';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', router);

export default app;
