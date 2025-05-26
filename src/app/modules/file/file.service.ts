import { Types } from "mongoose";
import File from "./file.model";
import { IFile } from "./file.interface";

interface CreateFileDTO {
  title: string;
  fileType: "image" | "pdf" | "doc";
  fileUrl: string;
  userId: Types.ObjectId;
  folderId?: Types.ObjectId | null;
}

export const createFileService = async (
  data: CreateFileDTO
): Promise<IFile> => {
  const file = new File(data);
  return await file.save();
};

export const getFilesService = async (
  userId: Types.ObjectId,
  fileType?: "image" | "pdf" | "doc",
  folderId?: Types.ObjectId | null
): Promise<IFile[]> => {
  const filter: any = { userId };
  if (fileType) filter.fileType = fileType;
  if (folderId) filter.folderId = folderId;

  return await File.find(filter);
};

export const deleteFileService = async (
  fileId: string,
  userId: Types.ObjectId
): Promise<IFile | null> => {
  return await File.findOneAndDelete({ _id: fileId, userId });
};

export const updateFileService = async (
  fileId: string,
  userId: Types.ObjectId,
  data: Partial<{ title: string }>
): Promise<IFile | null> => {
  return await File.findOneAndUpdate({ _id: fileId, userId }, data, {
    new: true,
  });
};
