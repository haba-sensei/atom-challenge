import { Router } from 'express';
import taskRouter from './modules/Task/adapters/routes/taskRouter';

const routes = Router();

routes.use('/api/v1/tasks', taskRouter);

export default routes;