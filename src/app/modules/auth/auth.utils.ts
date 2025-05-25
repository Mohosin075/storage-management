import jwt, { SignOptions } from 'jsonwebtoken';

export const generateToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }

  const options: SignOptions = {
    expiresIn: '15d',
  };

  return jwt.sign(payload, secret, options);
};
