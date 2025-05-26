import express from "express";
import { upload } from "./upload.middleware";
import { auth } from "../../../middleware/auth.middleware";
import { fileController } from "./file.controller";
import { asyncHandler } from "../../asyncHandler";

const fileRouter = express.Router();

fileRouter.use(auth);

fileRouter.post(
  "/upload",
  upload.single("file"),
  asyncHandler(fileController.createFile)
);

fileRouter.get("/", asyncHandler(fileController.getFiles));

fileRouter.patch("/:id", asyncHandler(fileController.updateFile));

fileRouter.delete("/:id", asyncHandler(fileController.deleteFile));

export default fileRouter;
