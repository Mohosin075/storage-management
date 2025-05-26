import { Response } from "express";
import { AuthRequest } from "../../../../express";
import {
  createNoteService,
  deleteNoteService,
  getNotesService,
} from "./note.services";

// Create note
const createNote = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.file) {
      return res
        .status(400)
        .json({ status: false, message: "Missing file or unauthorized" });
    }

    const { title, parentFolder } = req.body;

    const note = await createNoteService({
      title,
      fileUrl: `/uploads/notes/${req.file.filename}`,
      fileType: req.file.mimetype,
      originalName: req.file.originalname,
      userId: req.user._id,
      folderId: parentFolder || null,
    });

    res.status(201).json({
      status: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: "Failed to create note",
      error: error.message,
    });
  }
};

// Get notes
const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    const parentFolder = req.query.parentId as string | undefined;
    const notes = await getNotesService(req.user._id, parentFolder || null);

    res.status(200).json({
      status: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: "Failed to get notes",
      error: error.message,
    });
  }
};

// Delete note
const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ status: false, message: "Unauthorized" });
      return;
    }

    const noteId = req.params.id;
    const deleted = await deleteNoteService(noteId, req.user._id);

    if (!deleted) {
      res.status(404).json({
        status: false,
        message: "Note not found",
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: "Note deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: "Failed to delete note",
      error: error.message,
    });
  }
};

export const noteController = {
  createNote,
  getNotes,
  deleteNote,
};
