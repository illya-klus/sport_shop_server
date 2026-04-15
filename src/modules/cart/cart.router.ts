import { Router } from "express";
import { clearCart, getCart } from "./cart.controller.js";


export const CartRouter = Router();


CartRouter.get("/", getCart);
CartRouter.delete("/clear", clearCart);





