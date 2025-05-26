"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    fileType: {
        type: String,
        enum: ["image", "pdf", "doc"],
        required: true,
    },
    fileUrl: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    folderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Folder", default: null },
}, { timestamps: true });
const File = (0, mongoose_1.model)("File", fileSchema);
exports.default = File;
