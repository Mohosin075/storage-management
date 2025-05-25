import express, { RequestHandler } from "express";
import { folderController } from "./folder.controller";
import { auth } from "../../../middleware/auth.middleware";

const folderRouter = express.Router();

folderRouter.use(auth);

folderRouter.post("/", folderController.createFolder as RequestHandler);
folderRouter.get("/", folderController.getFolders as RequestHandler);
folderRouter.patch("/:id", folderController.updateFolder as RequestHandler);
folderRouter.delete("/:id", folderController.deleteFolder as RequestHandler);

export default folderRouter;
