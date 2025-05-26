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
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderController = void 0;
const folder_services_1 = require("./folder.services");
// Create folder
const createFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ status: false, message: "Unauthorized" });
            return;
        }
        const { name, parentFolder } = req.body;
        const folder = yield (0, folder_services_1.createFolderService)(name, req.user._id, parentFolder);
        res.status(201).json({
            status: true,
            message: "Folder created successfully",
            data: folder,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to create folder",
            error: error.message,
        });
    }
});
// Get folders
const getFolders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ status: false, message: "Unauthorized" });
            return;
        }
        const parentFolder = req.query.parentId;
        const folders = yield (0, folder_services_1.getFoldersService)(req.user._id, parentFolder || null);
        res.status(200).json({
            status: true,
            message: "Folders fetched successfully",
            data: folders,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to get folders",
            error: error.message,
        });
    }
});
// Update folder
const updateFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ status: false, message: "Unauthorized" });
            return;
        }
        const folderId = req.params.id;
        const { name } = req.body;
        if (!name) {
            res.status(400).json({
                status: false,
                message: "Folder name is required",
            });
            return;
        }
        const updated = yield (0, folder_services_1.updateFolderService)(folderId, req.user._id, name);
        if (!updated) {
            res.status(404).json({
                status: false,
                message: "Folder not found",
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Folder updated successfully",
            data: updated,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to update folder",
            error: error.message,
        });
    }
});
// Delete folder
const deleteFolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ status: false, message: "Unauthorized" });
            return;
        }
        const folderId = req.params.id;
        const deleted = yield (0, folder_services_1.deleteFolderService)(folderId, req.user._id);
        if (!deleted) {
            res.status(404).json({
                status: false,
                message: "Folder not found",
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Folder deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to delete folder",
            error: error.message,
        });
    }
});
exports.folderController = {
    createFolder,
    getFolders,
    updateFolder,
    deleteFolder,
};
