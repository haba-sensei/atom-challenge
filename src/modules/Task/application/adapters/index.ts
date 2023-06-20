import { Task } from '../../domain/models/task';
import { taskRepository } from '../../domain/repositories/taskRepository';
import db from '../../infrastructure/data/firebase';
import { collection } from "firebase/firestore";
const collectionRef = collection(db, 'Tasks');
import createAdapter from './createAdapter';
import updateAdapter from './updateAdapter';
import getAllAdapter from './getAllAdapter';
import deleteAdapter from './deleteAdapter';



export const taskRepositoryAdapter: taskRepository = {
    create: async (task: Task) => createAdapter(task, collectionRef),
    update: async (taskId: string, task: Task) => updateAdapter(task, taskId, collectionRef),
    getAll: async (): Promise<Task[]> => getAllAdapter(collectionRef),
    delete: async (taskId: string) => deleteAdapter(taskId, collectionRef),
};
