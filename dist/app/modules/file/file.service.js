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
exports.getRecentItemsService = exports.deleteFileService = exports.getFilesService = exports.createFileService = void 0;
const file_model_1 = __importDefault(require("./file.model"));
const folder_model_1 = __importDefault(require("../folder/folder.model"));
const createFileService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const file = new file_model_1.default(data);
    return yield file.save();
});
exports.createFileService = createFileService;
const getFilesService = (userId, fileType, folderId) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { userId };
    if (fileType)
        filter.fileType = fileType;
    if (folderId)
        filter.folderId = folderId;
    return yield file_model_1.default.find(filter);
});
exports.getFilesService = getFilesService;
const deleteFileService = (fileId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield file_model_1.default.findOneAndDelete({ _id: fileId, userId });
});
exports.deleteFileService = deleteFileService;
// for resent
const getRecentItemsService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield file_model_1.default.find({ userId })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();
    const folders = yield folder_model_1.default
        .find({ userId })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();
    const combined = [...files, ...folders];
    combined.sort((a, b) => {
        var _a, _b;
        const aTime = new Date((_a = a.createdAt) !== null && _a !== void 0 ? _a : 0).getTime();
        const bTime = new Date((_b = b.createdAt) !== null && _b !== void 0 ? _b : 0).getTime();
        return bTime - aTime;
    });
    return combined.slice(0, 10);
});
exports.getRecentItemsService = getRecentItemsService;
