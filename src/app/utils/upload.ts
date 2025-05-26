// src/middleware/upload.ts
import multer from "multer";
import path from "path";
import fs from "fs";

// Set destination folder
const notesUploadPath = path.join(__dirname, "../../uploads/notes");

// Ensure the folder exists
const ensureUploadFolderExists = () => {
  if (!fs.existsSync(notesUploadPath)) {
    fs.mkdirSync(notesUploadPath, { recursive: true });
  }
};

// Configure storage
const storage = multer.diskStorage({
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
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = [".txt", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .txt and .doc/.docx files are allowed"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});
