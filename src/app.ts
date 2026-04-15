import express, { Response } from "express";
import dotenv from "dotenv";
import { AuthRouter } from "./modules/auth/auth.router.js";
import { AuthMiddleware } from "./middlewares/auth/auth.middleware.js";
dotenv.config();
import cookieParser from "cookie-parser";
import { ProductsRouter } from "./modules/products/products.router.js";
import { CartRouter } from "./modules/cart/cart.router.js";
import { CartItemRouter } from "./modules/cartItem/cartItem.router.js";



const app = express();
app.use(express.json());
app.use(cookieParser());



app.use("/auth", AuthRouter);
app.use("/products", AuthMiddleware, ProductsRouter);
app.use("/cart", AuthMiddleware, CartRouter);
app.use("/cart/items", AuthMiddleware, CartItemRouter)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server started at port " + PORT);
});


