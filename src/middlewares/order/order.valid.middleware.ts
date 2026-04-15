import { Request, Response, NextFunction } from "express";
import { createOrderSchema } from "../../shema/order.shema.js";


export const validateCreateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = createOrderSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid order data",
      errors: result.error.flatten(),
    });
  }

  req.body = result.data;
  next();
};