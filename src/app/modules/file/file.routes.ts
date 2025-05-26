import express from "express";
import { upload } from "./upload.middleware";
import { auth } from "../../../middleware/auth.middleware";
import { fileController } from "./file.controller";
import { asyncHandler } from "../../asyncHandler";

const fileRouter = express.Router();
export const recentRouter = express.Router();

fileRouter.use(auth);
recentRouter.use(auth)

fileRouter.post(
  "/upload",
  upload.single("file"),
  asyncHandler(fileController.createFile)
);

fileRouter.get("/", asyncHandler(fileController.getFiles));

fileRouter.delete("/:id", asyncHandler(fileController.deleteFile));

// for recent items
recentRouter.get("/", asyncHandler(fileController.getRecentItems));

export default fileRouter;
