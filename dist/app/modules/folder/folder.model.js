"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const folderSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    parentFolder: { type: mongoose_1.Schema.Types.ObjectId, ref: "Folder", default: null },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Folder", folderSchema);
