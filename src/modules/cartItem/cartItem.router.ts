import { Router } from "express";
import { addItemToCart, deleteItemFromCart } from "./cartItem.controller.js";
import { cartItemCreateRequestMiddleware } from "../../middlewares/cartItem/cartItem.valid.middleware.js";



export const CartItemRouter = Router();

CartItemRouter.post("/", cartItemCreateRequestMiddleware, addItemToCart);

CartItemRouter.delete("/:id", deleteItemFromCart);







