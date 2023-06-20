import express from 'express';
import { validateTask } from '../../adapters/validations/taskValidation';
import {
    createTaskController,
    updateTaskController,
    getTasksController,
    deleteTaskController,
} from '../controllers';

const taskRouter = express.Router();

taskRouter.get('/', getTasksController);
taskRouter.post('/', validateTask, createTaskController);
taskRouter.put('/:taskId', validateTask, updateTaskController);
taskRouter.delete('/:taskId', deleteTaskController);

export default taskRouter;