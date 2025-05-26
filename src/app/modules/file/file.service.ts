import { ObjectId, Types } from "mongoose";
import File from "./file.model";
import { IFile } from "./file.interface";
import folderModel from "../folder/folder.model";

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

// for resent
export const getRecentItemsService = async (userId: string) => {
  const files = await File.find({ userId })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();
  const folders = await folderModel
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  const combined = [...files, ...folders];

  combined.sort((a, b) => {
    const aTime = new Date(a.createdAt ?? 0).getTime();
    const bTime = new Date(b.createdAt ?? 0).getTime();
    return bTime - aTime;
  });
  return combined.slice(0, 10);
};
