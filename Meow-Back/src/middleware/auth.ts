// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/database';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        next();
      } else {
        req.user = payload;
        next();
      }
    });
  } else {
    next();
    // res.status(401).json({
    //   isSuccess: false,
    //   message: 'Token is not provided',
    // });
  }
};