import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bcrypt from 'bcryptjs';
import { createRequire } from 'module';
import router from './routes/index.js';
import authRouter from './routes/auth.js';

const require = createRequire(import.meta.url);
const db = require('../models/index.cjs'); 

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET environment variable is not defined.');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

db.sequelize.sync({ alter: true }).then(async () => {
  console.log('Database synced successfully');

  try {
    const existingUser = await db.User.findOne({ where: { email: 'samabjelina@gmail.com' } });
    const hashedPassword = await bcrypt.hash('samespeletadlsl', 10);

    if (!existingUser) {
      await db.User.create({
        email: 'samabjelina@gmail.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created successfully.');
    } else {
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log('Admin user updated with fresh password hash.');
    }
  } catch (seedErr) {
    console.error('Error seeding default user:', seedErr);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
});