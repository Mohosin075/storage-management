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
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const registerUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield user_model_1.User.findOne({ email });
    if (exists)
        throw new Error("User already exists");
    const userInfo = { name, email, password, provider: 'local' };
    const user = new user_model_1.User(userInfo);
    yield user.save();
    return { message: "User created successfully" };
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    if (!user || !((yield user.isPasswordMatched(password)) || user.provider !== 'local')) {
        throw new Error("Invalid credentials");
    }
    if (user.provider === 'google') {
        throw new Error('This account is registered with Google. Please log in using Google Sign-In.');
    }
    const token = (0, auth_utils_1.generateToken)({ id: user._id, email: user.email });
    return { token };
});
exports.loginUser = loginUser;
