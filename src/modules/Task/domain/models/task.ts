export interface Task {
    title: string;
    description: string;
    completed: boolean;
}

export interface TaskWithId extends Task {
    id: string;
}