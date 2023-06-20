import { Task } from '../../../domain/models/task';
import { CollectionReference, DocumentData, doc, setDoc } from "firebase/firestore";
import { creatingInfraLayer } from '../../../../../constants/messages';


export const createAdapter = async (task: Task, colRef: CollectionReference<DocumentData>) => {
    try {
        const document = doc(colRef);
        await setDoc(document, task);
    } catch (error) {
        throw new Error(creatingInfraLayer);
    }
};

export default createAdapter;
