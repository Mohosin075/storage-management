// src/modules/notes/note.model.ts
import { Schema, model, Types } from "mongoose";
import { INote } from "./note.interface";

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
    originalName: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    folderId: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
  },
  {
    timestamps: true,
  }
);

const Note = model<INote>("Note", noteSchema);
export default Note;
