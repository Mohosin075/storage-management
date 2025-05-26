import { Request, Response } from "express";
import {
  createFileService,
  deleteFileService,
  getFilesService,
  getRecentItemsService,
} from "./file.service";
import { AuthRequest } from "../../../../express";
import mongoose from "mongoose";

const getAuthReq = (req: Request): AuthRequest => req as AuthRequest;

const createFile = async (req: Request, res: Response): Promise<void> => {
  const authReq = getAuthReq(req);

  if (!authReq.user) {
    res.status(401).json({ status: false, message: "Unauthorized" });
    return;
  }

  if (!req.file) {
    res.status(400).json({ status: false, message: "File is required" });
    return;
  }

  const ext = req.file.originalname.split(".").pop()?.toLowerCase();
  let fileType: "image" | "pdf" | "doc" = "doc";

  if (ext) {
    if (["jpg", "jpeg", "png", "gif"].includes(ext)) fileType = "image";
    else if (ext === "pdf") fileType = "pdf";
    else if (["txt", "doc", "docx"].includes(ext)) fileType = "doc";
  }

  const title = req.body.title || req.file.originalname;

  try {
    const fileUrl = `https://storage-management.onrender.com/${req.file.path.replace(
      /\\/g,
      "/"
    )}`;

    const file = await createFileService({
      title,
      fileType,
      fileUrl: fileUrl,
      userId: authReq.user._id,
      folderId: req.body.folderId || null,
    });

    res.status(201).json({
      status: true,
      message: "File uploaded successfully",
      data: file,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: "Failed to upload file",
      error: error.message,
    });
  }
};

const getFiles = async (req: Request, res: Response): Promise<void> => {
  const authReq = getAuthReq(req);

  if (!authReq.user) {
    res.status(401).json({ status: false, message: "Unauthorized" });
    return;
  }

  try {
    const { type, folderId } = req.query;

    let fileType: "image" | "pdf" | "doc" | undefined = undefined;
    if (type === "image" || type === "pdf" || type === "doc") {
      fileType = type;
    }

    let folderObjectId: mongoose.Types.ObjectId | undefined | null = undefined;

    if (folderId) {
      // Validate folderId string before creating ObjectId
      if (mongoose.Types.ObjectId.isValid(String(folderId))) {
        folderObjectId = new mongoose.Types.ObjectId(String(folderId));
      } else {
        // invalid folderId passed, send error or set null
        folderObjectId = null; // or handle differently
      }
    }

    const files = await getFilesService(
      authReq.user._id,
      fileType,
      folderObjectId
    );

    res.status(200).json({
      status: true,
      message: "Files fetched successfully",
      data: files,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch files",
      error: error.message,
    });
  }
};

const deleteFile = async (req: Request, res: Response): Promise<void> => {
  const authReq = getAuthReq(req);

  if (!authReq.user) {
    res.status(401).json({ status: false, message: "Unauthorized" });
    return;
  }

  const fileId = req.params.id;

  try {
    const deleted = await deleteFileService(fileId, authReq.user._id);

    if (!deleted) {
      res.status(404).json({ status: false, message: "File not found" });
      return;
    }

    res.status(200).json({
      status: true,
      message: "File deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: "Failed to delete file",
      error: error.message,
    });
  }
};

// for recent items

const getRecentItems = async (req: Request, res: Response): Promise<void> => {
  const authReq = getAuthReq(req);

  if (!authReq.user) {
    res.status(401).json({ status: false, message: "Unauthorized" });
    return;
  }

  try {
    const recentItems = await getRecentItemsService(
      authReq.user._id.toString()
    );

    res.status(200).json({
      status: true,
      message: "Recent files and folders fetched successfully",
      data: recentItems,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch recent items",
      error: error.message,
    });
  }
};

export const fileController = {
  createFile,
  getFiles,
  deleteFile,
  getRecentItems,
};
