import { Task } from '../../../domain/models/task';
import { CollectionReference, DocumentData, doc, updateDoc } from "firebase/firestore";
import { updatingInfraLayer } from '../../../../../constants/messages';


export const createTask = async (task: Task, taskId: string, colRef: CollectionReference<DocumentData>) => {
    try {
        const taskRef = doc(colRef, taskId);
        await updateDoc(taskRef, task as DocumentData);
    } catch (error) {
        throw new Error(updatingInfraLayer);
    }
};

export default createTask;