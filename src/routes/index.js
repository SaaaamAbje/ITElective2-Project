import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { requireRole } from '../middleware/requireRole.js';
import db from '../../models/index.cjs';

const { Task } = db;
const router = express.Router();


router.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});


router.post('/tasks', verifyToken, async (req, res, next) => {
  try {
    const { title, dueDate, completed } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = await Task.create({
      title,
      dueDate,
      completed,
      userId: req.user.id
    });

    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});


router.put('/tasks/:id', verifyToken, async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await task.update(req.body);
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
});


router.delete('/tasks/:id', verifyToken, requireRole('admin'), async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;