import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { AuthRouter } from "./modules/auth/auth.router.js";
import { AuthMiddleware } from "./middlewares/auth/auth.middleware.js";
dotenv.config();
import cookieParser from "cookie-parser";
import { ProductsRouter } from "./modules/products/products.router.js";
import { CartRouter } from "./modules/cart/cart.router.js";
import { CartItemRouter } from "./modules/cartItem/cartItem.router.js";
import { OrderRouter } from "./modules/order/order.router.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocument = YAML.load("./swagger.yaml");


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  "https://sport-shop-client-neon.vercel.app/"
]


const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    } ,
    credentials: true, 
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", AuthRouter);
app.use("/products", ProductsRouter);
app.use("/cart", AuthMiddleware, CartRouter);
app.use("/cart/items", AuthMiddleware, CartItemRouter);
app.use("/order", AuthMiddleware, OrderRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server started at port " + PORT);
});


