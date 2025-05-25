import { Response } from "express";
import { AuthRequest } from "../../../../express";
import {
  createFolderService,
  deleteFolderService,
  getFoldersService,
  updateFolderService,
} from "./folder.services";

// Create folder
const createFolder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const { name, parentFolder } = req.body;

    const folder = await createFolderService(name, req.user._id, parentFolder);

    res.status(201).json(folder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get folders
const getFolders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const parentFolder = req.query.parentId as string | undefined;

    const folders = await getFoldersService(req.user._id, parentFolder || null);

    res.status(200).json(folders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update folder
const updateFolder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const folderId = req.params.id;
    if (!req.body)
      return res.status(404).json({ error: "Folder name Required!" });
    const { name } = req.body;

    const updated = await updateFolderService(folderId, req.user._id, name);

    if (!updated) return res.status(404).json({ error: "Folder not found" });

    res.status(200).json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete folder
const deleteFolder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const folderId = req.params.id;
    const deleted = await deleteFolderService(folderId, req.user._id);

    if (!deleted) return res.status(404).json({ error: "Folder not found" });

    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const folderController = {
  createFolder,
  getFolders,
  updateFolder,
  deleteFolder,
};
