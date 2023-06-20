import { Task } from '../../domain/models/task';

export interface taskRepository {
    create(task: Task): Promise<void>;
    update(taskId: string, task: Task): Promise<void>;
    getAll(): Promise<Task[]>;
    delete(taskId: string): Promise<void>;
}
