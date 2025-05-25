import { User } from "../user/user.model";
import { generateToken } from "./auth.utils";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const userInfo = { name, email, password };

  const user = new User(userInfo);
  await user.save();
  return { message: "User created successfully" };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.isPasswordMatched(password))) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({ id: user._id, email: user.email });
  return { token };
};
