import { Task } from '../../../domain/models/task';
import { taskRepositoryAdapter } from '../../adapters';

export const updateUseCase = async (taskId: string, task: Task) => {
    await taskRepositoryAdapter.update(taskId, task);
};