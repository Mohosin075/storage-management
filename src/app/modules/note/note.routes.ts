// src/modules/notes/note.route.ts

import express, { RequestHandler } from "express";
import { noteController } from "./note.controller";
import { auth } from "../../../middleware/auth.middleware";
import { upload } from "../../utils/upload";

const noteRouter = express.Router();

noteRouter.use(auth);

noteRouter.post(
  "/",
  upload.single("noteFile"),
  noteController.createNote as RequestHandler
);
noteRouter.get("/", noteController.getNotes as RequestHandler);
// noteRouter.patch("/:id", noteController.updateNote as RequestHandler);
noteRouter.delete("/:id", noteController.deleteNote as RequestHandler);

export default noteRouter;
