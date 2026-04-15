import { Router } from "express";
import { createOrder } from "./order.controller.js";
import { validateCreateOrder } from "../../middlewares/order/order.valid.middleware.js";



export const OrderRouter = Router();

OrderRouter.post("/", validateCreateOrder, createOrder);
