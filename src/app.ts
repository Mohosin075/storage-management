import express from 'express';
import cors from 'cors';
import router from './app/routes';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

export default app;
