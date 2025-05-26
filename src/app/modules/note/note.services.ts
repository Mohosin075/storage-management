// src/modules/notes/note.service.ts

import { Types } from "mongoose";
import Note from "./note.model";
import { INote } from "./note.interface";

// src/modules/notes/note.service.ts
export const createNoteService = async (
  data: Omit<INote, "_id">
): Promise<INote> => {
  const note = new Note({
    ...data,
    folderId: data.folderId ? new Types.ObjectId(data.folderId) : null,
  });
  return await note.save();
};

export const getNotesService = async (
  userId: Types.ObjectId,
  folderId?: string | null
): Promise<INote[]> => {
  const folder = folderId ? new Types.ObjectId(folderId) : null;

  return await Note.find({
    userId,
    folderId: folder,
  });
};


export const deleteNoteService = async (
  noteId: string,
  userId: Types.ObjectId
): Promise<INote | null> => {
  return await Note.findOneAndDelete({ _id: noteId, userId });
};
