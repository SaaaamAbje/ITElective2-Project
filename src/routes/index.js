import express from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router();

router.get('/tasks', getAllTasks);
router.post('/tasks', verifyToken, createTask);
router.put('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, requireRole('admin'), deleteTask);

export default router;