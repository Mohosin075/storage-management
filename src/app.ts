import express from "express";
import cors from "cors";
import router from "./app/routes";
import "./app/utils/passport";
import passport from "passport";
import session from "express-session";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", router);

export default app;
