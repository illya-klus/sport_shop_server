import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { TokenPayload } from "../../modules/auth/auth.service.js";

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const AuthMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("No token provided");
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).send("Auth server error.");
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = verifyToken(token, secret);

    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};

const verifyToken = (token: string, secret: string): TokenPayload => {
  const decoded = jwt.verify(token, secret);

  if (typeof decoded === "string") {
    throw new Error("Invalid token");
  }

  return decoded as TokenPayload;
};