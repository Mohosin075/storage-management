"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
require("./app/utils/passport");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: true,
}));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Routes
app.use("/api", routes_1.default);
exports.default = app;
