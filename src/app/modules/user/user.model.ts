import mongoose from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required : true},
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  { timestamps: true }
);

// hash before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// method to compare password
userSchema.methods.isPasswordMatched = async function (givenPass: string) {
  return await bcrypt.compare(givenPass, this.password);
};

export const User = mongoose.model<
  IUser & { isPasswordMatched(pass: string): Promise<boolean> }
>("User", userSchema);
