import { Task } from '../../src/modules/Task/domain/models/task';
import { createUseCase } from '../../src/modules/Task/application/usecases/createUseCase';
import { updateUseCase } from '../../src/modules/Task/application/usecases/updateUseCase';
import { getAllUseCase } from '../../src/modules/Task/application/usecases/getAllUseCase';
import { deleteUseCase } from '../../src/modules/Task/application/usecases/deleteUseCase';
import { taskRepositoryAdapter } from '../../src/modules/Task/application/adapters';
import {
    creatingInfraLayer,
    updatingInfraLayer,
    gettingInfraLayer,
    deletingInfraLayer
} from '../../src/constants/messages';

jest.mock('../../src/modules/Task/application/adapters');

describe('Task UseCase', () => {
    describe('createUseCase', () => {
        it('should create a task successfully', async () => {
            const task: Task = { title: 'Test task', description: 'Test description', completed: true };
            const createMock = jest.fn();

            (taskRepositoryAdapter.create as jest.Mock).mockImplementation(createMock);

            await createUseCase(task);

            expect(taskRepositoryAdapter.create).toHaveBeenCalledWith(task);
            expect(createMock).toHaveBeenCalledTimes(1);
        });

        it('should handle errors during task creation', async () => {
            const task: Task = { title: 'Test task', description: 'Test description', completed: true };
            const error = new Error(creatingInfraLayer);

            (taskRepositoryAdapter.create as jest.Mock).mockRejectedValueOnce(error);

            try {
                await createUseCase(task);
                fail('Expected createTask to throw an error');
            } catch (error) {
                expect(error.message).toEqual(creatingInfraLayer);
            }
        });
    });

    describe('updateUseCase', () => {
        it('should update a task successfully', async () => {
            const taskId = 'task-123';
            const task: Task = { title: 'Updated task', description: 'Updated description', completed: false };
            const updateMock = jest.fn();

            (taskRepositoryAdapter.update as jest.Mock).mockImplementation(updateMock);

            await updateUseCase(taskId, task);

            expect(taskRepositoryAdapter.update).toHaveBeenCalledWith(taskId, task);
            expect(updateMock).toHaveBeenCalledTimes(1);
        });

        it('should handle errors during task update', async () => {
            const taskId = 'task-123';
            const task: Task = { title: 'Updated task', description: 'Updated description', completed: false };
            const error = new Error(updatingInfraLayer);

            (taskRepositoryAdapter.update as jest.Mock).mockRejectedValueOnce(error);

            await expect(updateUseCase(taskId, task)).rejects.toThrowError(updatingInfraLayer);
        });
    });

    describe('getAllUseCase', () => {
        it('should get all tasks successfully', async () => {
            const tasks: Task[] = [
                { title: 'Task 1', description: 'Description 1', completed: false },
                { title: 'Task 2', description: 'Description 2', completed: true }
            ];
            const getAllMock = jest.fn().mockResolvedValueOnce(tasks);

            (taskRepositoryAdapter.getAll as jest.Mock).mockImplementation(getAllMock);

            const result = await getAllUseCase();

            expect(taskRepositoryAdapter.getAll).toHaveBeenCalledTimes(1);
            expect(result).toEqual(tasks);
        });

        it('should handle errors during task retrieval', async () => {
            const error = new Error(gettingInfraLayer);

            (taskRepositoryAdapter.getAll as jest.Mock).mockRejectedValueOnce(error);

            await expect(getAllUseCase()).rejects.toThrowError(gettingInfraLayer);
        });
    });

    describe('deleteUseCase', () => {
        it('should delete a task successfully', async () => {
            const taskId = 'task-123';
            const deleteMock = jest.fn();

            (taskRepositoryAdapter.delete as jest.Mock).mockImplementation(deleteMock);

            await deleteUseCase(taskId);

            expect(taskRepositoryAdapter.delete).toHaveBeenCalledWith(taskId);
            expect(deleteMock).toHaveBeenCalledTimes(1);
        });

        it('should handle errors during task deletion', async () => {
            const taskId = 'task-123';
            const error = new Error(deletingInfraLayer);

            (taskRepositoryAdapter.delete as jest.Mock).mockRejectedValueOnce(error);

            await expect(deleteUseCase(taskId)).rejects.toThrowError(deletingInfraLayer);
        });
    });
});


