import mongoose from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', userSchema);
