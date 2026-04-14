import { Router } from "express";

import { createOne, deleteOne, getAll, updateOne } from "./products.controller.js";
import { AuthMiddleware } from "../../middlewares/auth/auth.middleware.js";
import { ValidateProductRequest } from "../../middlewares/products/products.valid.js";
import { AdminMiddleware } from "../../middlewares/auth/auth.admin.middleware.js";


export const ProductsRouter = Router();

ProductsRouter.get("/", AuthMiddleware, getAll);
// ProductsRouter.get("/:id", getOne);

ProductsRouter.post("/", AuthMiddleware, AdminMiddleware, ValidateProductRequest, createOne);
ProductsRouter.put("/:id", AuthMiddleware, AdminMiddleware, updateOne);
ProductsRouter.delete("/:id", AuthMiddleware, AdminMiddleware, deleteOne);

