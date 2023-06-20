import { Request, Response } from 'express';
import {
    createTaskController,
    updateTaskController,
    getTasksController,
    deleteTaskController,
} from '../../src/modules/Task/adapters/controllers';
import { createUseCase } from '../../src/modules/Task/application/usecases/createUseCase';
import { updateUseCase } from '../../src/modules/Task/application/usecases/updateUseCase';
import { getAllUseCase } from '../../src/modules/Task/application/usecases/getAllUseCase';
import { deleteUseCase } from '../../src/modules/Task/application/usecases/deleteUseCase';
import {
    server_error_500,
    errorServer,
    taskUpdated,
    taskCreated,
    taskDeleted,
} from '../../src/constants/messages';

jest.mock('../../src/modules/Task/application/usecases/createUseCase');
jest.mock('../../src/modules/Task/application/usecases/updateUseCase');
jest.mock('../../src/modules/Task/application/usecases/getAllUseCase');
jest.mock('../../src/modules/Task/application/usecases/deleteUseCase');

describe('Task Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTaskController', () => {
        it('should create a task successfully', async () => {
            const req = { body: { title: 'Test task', description: 'Test description', completed: true } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await createTaskController(req as Request, res as unknown as Response);

            expect(createUseCase).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: taskCreated });
        });

        it('should handle errors during task creation', async () => {
            const req = { body: { title: 'Test task', description: 'Test description', completed: true } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const error = new Error('Task creation error');

            const createTaskMock = jest.fn();
            createTaskMock.mockRejectedValueOnce(error);
            (createUseCase as jest.Mock).mockImplementation(createTaskMock);

            await createTaskController(req as Request, res as unknown as Response);

            expect(createTaskMock).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
        });
    });

    describe('updateTaskController', () => {
        it('should update a task successfully', async () => {
            const req = { params: { taskId: '123' }, body: { title: 'Updated task', description: 'Updated description', completed: false } };
            const res = { json: jest.fn() };

            await updateTaskController(req as unknown as Request, res as unknown as Response);

            expect(updateUseCase).toHaveBeenCalledWith('123', req.body);
            expect(res.json).toHaveBeenCalledWith({ message: taskUpdated });
        });

        it('should handle errors during task update', async () => {
            const req = { params: { taskId: '123' }, body: { title: 'Updated task', description: 'Updated description', completed: false } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const error = new Error(errorServer);

            const updateTaskMock = jest.fn();
            updateTaskMock.mockRejectedValueOnce(error);
            (updateUseCase as jest.Mock).mockImplementation(updateTaskMock);

            await updateTaskController(req as unknown as Request, res as unknown as Response);

            expect(updateTaskMock).toHaveBeenCalledWith('123', req.body);
            expect(res.status).toHaveBeenCalledWith(server_error_500);
            expect(res.json).toHaveBeenCalledWith({ message: errorServer });
        });
    });

    describe('getTasksController', () => {
        it('should get tasks successfully', async () => {
            const tasks = [
                { title: 'Task 1', description: 'Description 1', completed: false },
                { title: 'Task 2', description: 'Description 2', completed: true }
            ];
            const req = {};
            const res = { json: jest.fn() } as unknown as Response;

            (getAllUseCase as jest.Mock).mockResolvedValueOnce(tasks);

            await getTasksController(req as Request, res);

            expect(getAllUseCase).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(tasks);
        });

        it('should handle errors during task retrieval', async () => {
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
            const error = new Error(errorServer);

            (getAllUseCase as jest.Mock).mockRejectedValueOnce(error);

            await getTasksController(req as Request, res);

            expect(getAllUseCase).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(server_error_500);
            expect(res.json).toHaveBeenCalledWith({ message: errorServer });
        });
    });

    describe('deleteTaskController', () => {
        it('should delete a task successfully', async () => {
            const req = { params: { taskId: '123' } };
            const res = { json: jest.fn() };

            await deleteTaskController(req as unknown as Request, res as unknown as Response);

            expect(deleteUseCase).toHaveBeenCalledWith('123');
            expect(res.json).toHaveBeenCalledWith({ message: taskDeleted });
        });

        it('should handle errors during task deletion', async () => {
            const req = { params: { taskId: '123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const error = new Error('Task deletion error');

            const deleteTaskMock = jest.fn();
            deleteTaskMock.mockRejectedValueOnce(error);
            (deleteUseCase as jest.Mock).mockImplementation(deleteTaskMock);

            await deleteTaskController(req as unknown as Request, res as unknown as Response);

            expect(deleteTaskMock).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
        });
    });
});
