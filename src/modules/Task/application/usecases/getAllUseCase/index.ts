import { Task } from '../../../domain/models/task';
import { taskRepositoryAdapter } from '../../adapters';

export const getAllUseCase = async (): Promise<Task[]> => {
    return taskRepositoryAdapter.getAll();
};