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
    if (!req.user) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    const { name, parentFolder } = req.body;
    const folder = await createFolderService(name, req.user._id, parentFolder);

    res.status(201).json({
      status: true,
      message: "Folder created successfully",
      data: folder,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: "Failed to create folder",
      error: error.message,
    });
  }
};

// Get folders
const getFolders = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    const parentFolder = req.query.parentId as string | undefined;
    const folders = await getFoldersService(req.user._id, parentFolder || null);

    res.status(200).json({
      status: true,
      message: "Folders fetched successfully",
      data: folders,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: "Failed to get folders",
      error: error.message,
    });
  }
};

// Update folder
const updateFolder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    const folderId = req.params.id;
    const { name } = req.body;

    if (!name) {
      res.status(400).json({
        status: false,
        message: "Folder name is required",
      });
      return;
    }

    const updated = await updateFolderService(folderId, req.user._id, name);

    if (!updated) {
      res.status(404).json({
        status: false,
        message: "Folder not found",
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: "Folder updated successfully",
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: "Failed to update folder",
      error: error.message,
    });
  }
};

// Delete folder
const deleteFolder = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    const folderId = req.params.id;
    const deleted = await deleteFolderService(folderId, req.user._id);

    if (!deleted) {
      res.status(404).json({
        status: false,
        message: "Folder not found",
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: "Folder deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: "Failed to delete folder",
      error: error.message,
    });
  }
};

export const folderController = {
  createFolder,
  getFolders,
  updateFolder,
  deleteFolder,
};
