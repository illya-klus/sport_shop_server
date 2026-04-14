import { NextFunction, Response } from "express";
import { AuthRequest } from "../auth/auth.middleware.js";

export const ValidateProductRequest = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { brand, title, description, price, stock, discount, currency } =
    req.body;

  if (!brand || !title || !description || price == null || !currency)
    return res.status(400).send("Invalid data sent.");

  if (typeof price !== "number" || price <= 0) 
    return res.status(400).send("Invalid price");
  
  if (stock != null && (typeof stock !== "number" || stock < 0))
    return res.status(400).send("Invalid stock");

  if (
    discount != null &&
    (typeof discount !== "number" || discount < 0 || discount > 100)
  ) return res.status(400).send("Invalid discount");
  
  next();
};
