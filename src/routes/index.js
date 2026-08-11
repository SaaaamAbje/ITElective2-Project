import express from 'express';
const router = express.Router();

// In-memory data store
let tasks = [
  { id: 1, title: 'Learn Express', completed: false, dueDate: '2026-08-01' }
];

// GET /api/tasks - Get all tasks
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET /api/tasks/:id - Get single task
router.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

// POST /api/tasks - Create a new task
router.post('/tasks', (req, res) => {
  const { title, dueDate } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Invalid task data. Title and dueDate are required.' });
  }

  const newTask = {
    id: Date.now(),
    title,
    completed: false,
    dueDate: dueDate || new Date().toISOString().split('T')[0]
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - Update task by ID
router.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, completed, dueDate } = req.body;

  if (title !== undefined) tasks[taskIndex].title = title;
  if (completed !== undefined) tasks[taskIndex].completed = completed;
  if (dueDate !== undefined) tasks[taskIndex].dueDate = dueDate;

  res.status(200).json(tasks[taskIndex]);
});

// DELETE /api/tasks/:id - Delete task by ID
router.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted successfully' });
});

export default router;