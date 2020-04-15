import { Router } from 'express';
import wlcmRouter from './api/WelcomeApi';

const apiRouter = Router();

apiRouter.use('/', wlcmRouter);

export default apiRouter;
