import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { loginMiddleware } from "../../middlewares/auth/login.valid.middleware.js";
import { registerMiddleware } from "../../middlewares/auth/register.valid.middleware.js";

export const AuthRouter = Router();

AuthRouter.post("/login", loginMiddleware, login);

AuthRouter.post("/register",registerMiddleware, register);

// AuthRouter.post("/refresh", refresh);

















