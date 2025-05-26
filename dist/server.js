"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const uri = process.env.DATABASE_URL;
mongoose_1.default.connect(uri)
    .then(() => {
    console.log('MongoDB connected');
    app_1.default.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch(err => console.error('DB Connection Error:', err));
