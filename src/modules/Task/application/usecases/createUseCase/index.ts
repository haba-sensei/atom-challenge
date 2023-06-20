import { Task } from '../../../domain/models/task';
import { taskRepositoryAdapter } from '../../adapters';

export const createUseCase = async (task: Task) => {
    await taskRepositoryAdapter.create(task);
};