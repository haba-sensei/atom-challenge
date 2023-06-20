import { Request, Response } from 'express';
import { deleteUseCase } from '../../../application/usecases/deleteUseCase';
import {
    server_error_500,
    errorServer,
    taskDeleted
} from '../../../../../constants/messages';


export const deleteTaskController = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.taskId;
        await deleteUseCase(taskId);
        res.json({ message: taskDeleted });
    } catch (error) {
        res.status(server_error_500).json({ message: errorServer });
    }
};