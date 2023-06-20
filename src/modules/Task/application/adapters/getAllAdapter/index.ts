import { Task, TaskWithId } from '../../../domain/models/task';
import { CollectionReference, DocumentData, getDocs } from "firebase/firestore";
import { gettingInfraLayer } from '../../../../../constants/messages';


export const getAllAdapter = async (colRef: CollectionReference<DocumentData>) => {
    try {
        const querySnapshot = await getDocs(colRef);
        const tasks: Task[] = [];
        querySnapshot.forEach((doc) => {
            const task = doc.data() as Task;
            const taskId = doc.id;
            const taskWithId: TaskWithId = { ...task, id: taskId };
            tasks.push(taskWithId);
        });
        return tasks;
    } catch (error) {
        throw new Error(gettingInfraLayer);
    }
};

export default getAllAdapter;
