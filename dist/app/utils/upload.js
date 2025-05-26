"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
// src/middleware/upload.ts
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Set destination folder
const notesUploadPath = path_1.default.join(__dirname, "../../uploads/notes");
// Ensure the folder exists
const ensureUploadFolderExists = () => {
    if (!fs_1.default.existsSync(notesUploadPath)) {
        fs_1.default.mkdirSync(notesUploadPath, { recursive: true });
    }
};
// Configure storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        ensureUploadFolderExists(); // Ensure folder exists before uploading
        cb(null, notesUploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
// File filter: allow only .txt and .doc/.docx
const fileFilter = (req, file, cb) => {
    const allowedTypes = [".txt", ".doc", ".docx"];
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only .txt and .doc/.docx files are allowed"));
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});
