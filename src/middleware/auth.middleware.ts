import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const auth: RequestHandler = (req, res, next) => {

  const token = req.headers.authorization
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    (req as any).user = {_id : decoded.id, ...decoded };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
    return;
  }
};
