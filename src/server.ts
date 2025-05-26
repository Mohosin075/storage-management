import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 5000;
const uri = process.env.DATABASE_URL as string;

mongoose
  .connect(uri)
  .then(() => {
    app.get("/", (req, res) => {
      res.send({ message: "Welcome to the Storage Management System!" });
    });
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("DB Connection Error:", err));
