import multer from "multer";
import path from "path";
import fs from "fs";

// Create folders if not exist
const baseFolder = "uploads/files";
const folders = ["images", "pdfs", "docs"];
folders.forEach((folder) => {
  const dir = path.join(baseFolder, folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if ([".jpg", ".jpeg", ".png", ".gif"].includes(ext)) {
      cb(null, path.join(baseFolder, "images"));
    } else if (ext === ".pdf") {
      cb(null, path.join(baseFolder, "pdfs"));
    } else if ([".txt", ".doc", ".docx"].includes(ext)) {
      cb(null, path.join(baseFolder, "docs"));
    } else {
      cb(new Error("Unsupported file type"), "");
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
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
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
});
