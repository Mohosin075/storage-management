import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { login, signup } from "./auth.controller";

const authRouter = express.Router();

// 🔐 Local Auth
authRouter.post("/signup", signup);
authRouter.post("/login", login);

// 🔑 Google OAuth
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user as any;

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "15d" }
    );

    res.json({
      message: "Google sign-in successful",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  }
);

export default authRouter;
