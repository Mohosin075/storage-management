"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recentRouter = void 0;
const express_1 = __importDefault(require("express"));
const upload_middleware_1 = require("./upload.middleware");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const file_controller_1 = require("./file.controller");
const asyncHandler_1 = require("../../asyncHandler");
const fileRouter = express_1.default.Router();
exports.recentRouter = express_1.default.Router();
fileRouter.use(auth_middleware_1.auth);
exports.recentRouter.use(auth_middleware_1.auth);
fileRouter.post("/upload", upload_middleware_1.upload.single("file"), (0, asyncHandler_1.asyncHandler)(file_controller_1.fileController.createFile));
fileRouter.get("/", (0, asyncHandler_1.asyncHandler)(file_controller_1.fileController.getFiles));
fileRouter.delete("/:id", (0, asyncHandler_1.asyncHandler)(file_controller_1.fileController.deleteFile));
// for recent items
exports.recentRouter.get("/", (0, asyncHandler_1.asyncHandler)(file_controller_1.fileController.getRecentItems));
exports.default = fileRouter;
