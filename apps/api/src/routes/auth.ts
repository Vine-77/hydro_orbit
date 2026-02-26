import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../index.js';
import { AppError } from '../middleware/errorHandler.js';
import { config } from '@hydro-orbit/config';
import { loginSchema, registerSchema } from '@hydro-orbit/shared-validators';

const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    const { phone, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = jwt.sign(
      { userId: user.id, phone: user.phone, role: user.role },
      config.api.jwtSecret,
      { expiresIn: config.api.jwtExpiresIn }
    );

    res.json({
      token,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { phone, password, name } = registerSchema.parse(req.body);

    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) {
      throw new AppError('Phone number already registered', 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { phone, passwordHash, name },
    });

    const token = jwt.sign(
      { userId: user.id, phone: user.phone, role: user.role },
      config.api.jwtSecret,
      { expiresIn: config.api.jwtExpiresIn }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, config.api.jwtSecret, {
      ignoreExpiration: true,
    }) as { userId: string; phone: string; role: string };

    const newToken = jwt.sign(
      { userId: decoded.userId, phone: decoded.phone, role: decoded.role },
      config.api.jwtSecret,
      { expiresIn: config.api.jwtExpiresIn }
    );

    res.json({ token: newToken });
  } catch (error) {
    next(error);
  }
});

export default router;
