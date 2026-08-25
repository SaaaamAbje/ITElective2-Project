import express from 'express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const db = require('../../models/index.cjs');
const { Task, User } = db;

const router = express.Router();

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: User
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.get('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: User
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.post('/tasks', async (req, res, next) => {
  try {
    const { title, dueDate, userId } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Invalid task data. Title is required.' });
    }

    const newTask = await Task.create({
      title,
      dueDate: dueDate || new Date(),
      completed: false,
      userId: userId || null
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.put('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { title, completed, dueDate, userId } = req.body;

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (userId !== undefined) task.userId = userId;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

router.delete('/tasks/:id', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;