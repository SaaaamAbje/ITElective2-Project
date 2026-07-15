import { formatDate, validateTask, mergeTaskUpdate } from './utils.js';

let tasks = [];

export const createTask = (taskObj) => {
    if (!validateTask(taskObj)) {
        console.log("Error. Invalid task.");
        return;
    }
    const { title, dueDate } = taskObj;
    
    const formattedDate = formatDate(new Date(dueDate));

    tasks.push({ title, dueDate: formattedDate });
};

export const updateTaskTitle = (index, newTitle) => {
    if (index >= 0 && index < tasks.length) {
        tasks[index] = mergeTaskUpdate(tasks[index], { title: newTitle });
    }
};

export const getTasks = () => {
    return [...tasks];
};


createTask({ title: "Submit Assignment", dueDate: "2026-07-22" });
createTask({ title: "Study ES6", dueDate: "2026-07-25" });
createTask({ title: "Invalid Task" }); // Logs: "Error. Invalid task."

console.log("\nInitial Tasks:", getTasks());

updateTaskTitle(0, "Submit GT3 Project");

console.log("\nUpdated Tasks:", getTasks());