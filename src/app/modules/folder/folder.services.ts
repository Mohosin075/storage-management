// folder.service.ts
import { Types } from "mongoose";
import Folder from "./folder.model";

export const createFolderService = async (
  name: string,
  userId: Types.ObjectId,
  parentFolder?: string | null
) => {

    console.log(userId);

  const folder = new Folder({
    name,
    userId,
    parentFolder: parentFolder || null,
  });

  return await folder.save();
};

export const getFoldersService = async (
  userId: Types.ObjectId,
  parentFolder?: string | null
) => {
  const parent = parentFolder ? new Types.ObjectId(parentFolder) : null;

  return await Folder.find({
    userId,
    parentFolder: parent,
  });
};

export const updateFolderService = async (
  folderId: string,
  userId: Types.ObjectId,
  name: string
) => {
  return await Folder.findOneAndUpdate(
    { _id: folderId, userId: userId },
    { name },
    { new: true }
  );
};

export const deleteFolderService = async (
  folderId: string,
  userId: Types.ObjectId
) => {
  return await Folder.findOneAndDelete({
    _id: folderId,
    userId: userId,
  });
};
