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
exports.deleteFolderService = exports.updateFolderService = exports.getFoldersService = exports.createFolderService = void 0;
// folder.service.ts
const mongoose_1 = require("mongoose");
const folder_model_1 = __importDefault(require("./folder.model"));
const createFolderService = (name, userId, parentFolder) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId);
    const folder = new folder_model_1.default({
        name,
        userId,
        parentFolder: parentFolder || null,
    });
    return yield folder.save();
});
exports.createFolderService = createFolderService;
const getFoldersService = (userId, parentFolder) => __awaiter(void 0, void 0, void 0, function* () {
    const parent = parentFolder ? new mongoose_1.Types.ObjectId(parentFolder) : null;
    return yield folder_model_1.default.find({
        userId,
        parentFolder: parent,
    });
});
exports.getFoldersService = getFoldersService;
const updateFolderService = (folderId, userId, name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield folder_model_1.default.findOneAndUpdate({ _id: folderId, userId: userId }, { name }, { new: true });
});
exports.updateFolderService = updateFolderService;
const deleteFolderService = (folderId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield folder_model_1.default.findOneAndDelete({
        _id: folderId,
        userId: userId,
    });
});
exports.deleteFolderService = deleteFolderService;
