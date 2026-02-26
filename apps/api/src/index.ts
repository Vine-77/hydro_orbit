import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import dotenv from 'dotenv';
import { logger } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import farmRoutes from './routes/farms.js';
import sensorRoutes from './routes/sensors.js';
import irrigationRoutes from './routes/irrigation.js';
import alertRoutes from './routes/alerts.js';
import historyRoutes from './routes/history.js';

dotenv.config();

export const DEFAULT_TIMEZONE = process.env.DEFAULT_TIMEZONE || 'Africa/Kigali';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

export const prisma = new PrismaClient();
export const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redis.connect().catch(console.error);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.timezone = req.headers['x-timezone'] as string || DEFAULT_TIMEZONE;
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/irrigation', irrigationRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/history', historyRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('join-farm', (farmId: string) => {
    socket.join(`farm-${farmId}`);
    logger.info(`Client ${socket.id} joined farm ${farmId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

export { io };

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  await redis.quit();
  process.exit(0);
});
