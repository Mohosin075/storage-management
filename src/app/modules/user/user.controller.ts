import { Request, Response } from 'express';
import { getAllUsers } from './user.service';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json({ success: true, data: users });
};
