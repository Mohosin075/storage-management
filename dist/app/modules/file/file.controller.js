"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileController = void 0;
const file_service_1 = require("./file.service");
const mongoose_1 = __importDefault(require("mongoose"));
const getAuthReq = (req) => req;
const createFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authReq = getAuthReq(req);
    if (!authReq.user) {
        res.status(401).json({ status: false, message: "Unauthorized" });
        return;
    }
    if (!req.file) {
        res.status(400).json({ status: false, message: "File is required" });
        return;
    }
    const ext = (_a = req.file.originalname.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    let fileType = "doc";
    if (ext) {
        if (["jpg", "jpeg", "png", "gif"].includes(ext))
            fileType = "image";
        else if (ext === "pdf")
            fileType = "pdf";
        else if (["txt", "doc", "docx"].includes(ext))
            fileType = "doc";
    }
    const title = req.body.title || req.file.originalname;
    try {
        const fileUrl = `https://storage-management.onrender.com/${req.file.path.replace(/\\/g, "/")}`;
        const file = yield (0, file_service_1.createFileService)({
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
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to upload file",
            error: error.message,
        });
    }
});
const getFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authReq = getAuthReq(req);
    if (!authReq.user) {
        res.status(401).json({ status: false, message: "Unauthorized" });
        return;
    }
    try {
        const { type, folderId } = req.query;
        let fileType = undefined;
        if (type === "image" || type === "pdf" || type === "doc") {
            fileType = type;
        }
        let folderObjectId = undefined;
        if (folderId) {
            // Validate folderId string before creating ObjectId
            if (mongoose_1.default.Types.ObjectId.isValid(String(folderId))) {
                folderObjectId = new mongoose_1.default.Types.ObjectId(String(folderId));
            }
            else {
                // invalid folderId passed, send error or set null
                folderObjectId = null; // or handle differently
            }
        }
        const files = yield (0, file_service_1.getFilesService)(authReq.user._id, fileType, folderObjectId);
        res.status(200).json({
            status: true,
            message: "Files fetched successfully",
            data: files,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to fetch files",
            error: error.message,
        });
    }
});
const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authReq = getAuthReq(req);
    if (!authReq.user) {
        res.status(401).json({ status: false, message: "Unauthorized" });
        return;
    }
    const fileId = req.params.id;
    try {
        const deleted = yield (0, file_service_1.deleteFileService)(fileId, authReq.user._id);
        if (!deleted) {
            res.status(404).json({ status: false, message: "File not found" });
            return;
        }
        res.status(200).json({
            status: true,
            message: "File deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to delete file",
            error: error.message,
        });
    }
});
// for recent items
const getRecentItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authReq = getAuthReq(req);
    if (!authReq.user) {
        res.status(401).json({ status: false, message: "Unauthorized" });
        return;
    }
    try {
        const recentItems = yield (0, file_service_1.getRecentItemsService)(authReq.user._id.toString());
        res.status(200).json({
            status: true,
            message: "Recent files and folders fetched successfully",
            data: recentItems,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to fetch recent items",
            error: error.message,
        });
    }
});
exports.fileController = {
    createFile,
    getFiles,
    deleteFile,
    getRecentItems,
};
