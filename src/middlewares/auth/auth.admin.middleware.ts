import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth.middleware.js";

export const AdminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if(req.user?.role === "USER")
    return res.status(403).send("Forbidden");
  next();
};