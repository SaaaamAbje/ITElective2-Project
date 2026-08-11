import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Register Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Mount API Router
app.use('/api', router);

// Global Error Handling Middleware (MUST be the last app.use)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});