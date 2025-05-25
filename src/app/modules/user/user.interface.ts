export interface IUser {
    name: string;
    email: string;
    password?: string;
    isPasswordMatched(password: string): Promise<boolean>;
    provider : 'local' | 'google'
  }
  