import { Types } from "mongoose";

export interface IFolder extends Document {
  name: string;
  userId: Types.ObjectId;
  parentFolder?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}
