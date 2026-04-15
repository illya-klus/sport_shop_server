import { NextFunction, Request, Response } from "express";


export const cartItemCreateRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { count, productId } = req.body ?? {};

  // 1. check existence
  if (count == null || productId == null) {
    return res.status(400).json({
      message: "count and productId are required",
    });
  }

  // 2. check types
  if (typeof count !== "number" || typeof productId !== "number") {
    return res.status(400).json({
      message: "count and productId must be numbers",
    });
  }

  // 3. business rules validation
  if (count <= 0) {
    return res.status(400).json({
      message: "count must be greater than 0",
    });
  }

  if (productId <= 0) {
    return res.status(400).json({
      message: "invalid productId",
    });
  }

  next();
};