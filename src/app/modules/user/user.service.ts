import { User } from './user.model';

export const getAllUsers = async () => {
  return await User.find();
};
