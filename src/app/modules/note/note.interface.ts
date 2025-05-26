// src/modules/notes/note.interface.ts
import { Types } from "mongoose";

export interface INote {
  _id?: Types.ObjectId;
  title: string;
  fileUrl: string;
  fileType: string;
  originalName: string;
  userId: Types.ObjectId;
  folderId?: Types.ObjectId | null;
}
