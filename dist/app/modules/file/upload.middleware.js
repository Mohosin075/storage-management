"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Create folders if not exist
const baseFolder = "uploads/files";
const folders = ["images", "pdfs", "docs"];
folders.forEach((folder) => {
    const dir = path_1.default.join(baseFolder, folder);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
});
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        if ([".jpg", ".jpeg", ".png", ".gif"].includes(ext)) {
            cb(null, path_1.default.join(baseFolder, "images"));
        }
        else if (ext === ".pdf") {
            cb(null, path_1.default.join(baseFolder, "pdfs"));
        }
        else if ([".txt", ".doc", ".docx"].includes(ext)) {
            cb(null, path_1.default.join(baseFolder, "docs"));
        }
        else {
            cb(new Error("Unsupported file type"), "");
        }
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const fileFilter = (req, file, cb) => {
    const allowedExts = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".pdf",
        ".txt",
        ".doc",
        ".docx",
    ];
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    if (allowedExts.includes(ext)) {
        cb(null, true);
    }
    else {
        cb(new Error("File type not allowed"));
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
});
