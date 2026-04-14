import express from "express";
import dotenv from "dotenv";
import { AuthRouter } from "./modules/auth/auth.router.js";
dotenv.config();




const app = express();
app.use(express.json());


app.use("/auth", AuthRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server started at port " + PORT);
});


