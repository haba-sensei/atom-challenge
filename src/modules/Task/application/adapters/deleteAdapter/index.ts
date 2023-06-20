import { CollectionReference, DocumentData, deleteDoc, doc } from "firebase/firestore";
import { deletingInfraLayer } from '../../../../../constants/messages';


export const deleteAdapter = async (taskId: string, colRef: CollectionReference<DocumentData>) => {
    try {
        const taskRef = doc(colRef, taskId);
        await deleteDoc(taskRef);
    } catch (error) {
        throw new Error(deletingInfraLayer);
    }
};

export default deleteAdapter;
