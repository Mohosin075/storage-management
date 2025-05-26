import { Schema, model, Types } from "mongoose";
import { IFile } from "./file.interface";

const fileSchema = new Schema<IFile>(
  {
    title: { type: String, required: true },
    fileType: {
      type: String,
      enum: ["image", "pdf", "doc"],
      required: true,
    },
    fileUrl: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    folderId: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
  },
  { timestamps: true }
);

const File = model<IFile>("File", fileSchema);

export default File;
