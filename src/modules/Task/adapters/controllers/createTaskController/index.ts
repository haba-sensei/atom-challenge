import { Request, Response } from 'express';
import { createUseCase } from '../../../application/usecases/createUseCase';
import {
    success_201,
    server_error_500,
    errorServer,
    taskCreated,
} from '../../../../../constants/messages';


export const createTaskController = async (req: Request, res: Response) => {
    try {
        const task = req.body;
        await createUseCase(task);
        res.status(success_201).json({ message: taskCreated });
    } catch (error) {
        res.status(server_error_500).json({ message: errorServer });
    }
};