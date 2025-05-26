"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_controller_1 = require("./auth.controller");
const authRouter = express_1.default.Router();
// 🔐 Local Auth
authRouter.post("/signup", auth_controller_1.signup);
authRouter.post("/login", auth_controller_1.login);
// 🔑 Google OAuth
authRouter.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", passport_1.default.authenticate("google", { session: false }), (req, res) => {
    const user = req.user;
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "15d" });
    res.json({
        message: "Google sign-in successful",
        token,
        user: {
            name: user.name,
            email: user.email,
        },
    });
});
exports.default = authRouter;
