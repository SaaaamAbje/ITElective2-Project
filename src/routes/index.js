import express from 'express';
import { initialTasks } from '../utils.js';
import { fetchSampleUsers } from '../api.js';

const router = express.Router();

// Variable to cache users in memory
let cachedUsers = [];

// Fetch and cache users once when the server starts
(async () => {
  try {
    cachedUsers = await fetchSampleUsers();
    console.log('Sample users cached successfully.');
  } catch (error) {
    console.error('Failed to cache sample users:', error.message);
  }
})();

// GET /api/tasks -- returns all tasks as JSON
router.get('/tasks', (req, res) => {
  res.json(initialTasks);
});

// GET /api/tasks/:id -- returns single matching task or 404
router.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = initialTasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

// GET /api/users -- returns cached transformed user list
router.get('/users', (req, res) => {
  res.json(cachedUsers);
});

export default router;