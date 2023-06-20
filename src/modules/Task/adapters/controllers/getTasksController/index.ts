import { Request, Response } from 'express';
import { getAllUseCase, } from '../../../application/usecases/getAllUseCase';
import {
    server_error_500,
    errorServer,
} from '../../../../../constants/messages';


export const getTasksController = async (req: Request, res: Response) => {
    try {
        const tasks = await getAllUseCase();
        res.json(tasks);
    } catch (error) {
        res.status(server_error_500).json({ message: errorServer });
    }
};