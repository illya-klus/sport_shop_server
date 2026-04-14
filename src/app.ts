import express, { Response } from "express";
import dotenv from "dotenv";
import { AuthRouter } from "./modules/auth/auth.router.js";
import { AuthMiddleware, AuthRequest } from "./middlewares/auth/auth.middleware.js";
dotenv.config();
import cookieParser from "cookie-parser";



const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/auth", AuthRouter);
app.get("/testauth", AuthMiddleware, (req: AuthRequest, res: Response) => {
    return res.status(200).json(req.user);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server started at port " + PORT);
});


