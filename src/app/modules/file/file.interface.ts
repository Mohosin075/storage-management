import { Document, Types } from "mongoose";

export interface IFile extends Document {
  title: string;
  fileType: "image" | "pdf" | "doc";
  fileUrl: string;
  userId: Types.ObjectId;
  folderId?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}