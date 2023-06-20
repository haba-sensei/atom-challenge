import { Request, Response } from 'express';
import { updateUseCase } from '../../../application/usecases/updateUseCase';
import {
    server_error_500,
    errorServer,
    taskUpdated
} from '../../../../../constants/messages';


export const updateTaskController = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.taskId;
        const task = req.body;
        await updateUseCase(taskId, task);
        res.json({ message: taskUpdated });
    } catch (error) {
        res.status(server_error_500).json({ message: errorServer });
    }
};