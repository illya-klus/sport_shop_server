import { NextFunction, Request, Response } from "express";



export const registerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body || {};

  if (!email || !password || !name) {
    return res.status(400).send("Email, name and password are required");
  }

  next();
};