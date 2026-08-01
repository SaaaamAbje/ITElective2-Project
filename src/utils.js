
export const formatDate = (date) => `Due: ${date.toLocaleDateString('en-US')}`;

export const validateTask = ({ title, dueDate } = {}) => {
    return !!(title && dueDate);
};

export const mergeTaskUpdate = (original, ...updates) => {
    return Object.assign({}, original, ...updates);
};


export class TaskValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "TaskValidationError";
    }
}


export function createTask(taskData) {
    if (!validateTask(taskData)) {
        throw new TaskValidationError("Invalid task data");
    }
    return {
        id: Date.now(),
        completed: false,
        ...taskData
    }; 
}

export const initialTasks = [
  { id: 1, title: 'Learn Express', completed: false, dueDate: '2026-08-01' },
  { id: 2, title: 'Complete GT5', completed: false, dueDate: '2026-08-05' }
];

