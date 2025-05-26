"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const folder_controller_1 = require("./folder.controller");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const folderRouter = express_1.default.Router();
folderRouter.use(auth_middleware_1.auth);
folderRouter.post("/", folder_controller_1.folderController.createFolder);
folderRouter.get("/", folder_controller_1.folderController.getFolders);
folderRouter.patch("/:id", folder_controller_1.folderController.updateFolder);
folderRouter.delete("/:id", folder_controller_1.folderController.deleteFolder);
exports.default = folderRouter;
