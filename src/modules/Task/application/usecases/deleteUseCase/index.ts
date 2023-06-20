import { taskRepositoryAdapter } from '../../adapters';

export const deleteUseCase = async (taskId: string) => {
    await taskRepositoryAdapter.delete(taskId);
};