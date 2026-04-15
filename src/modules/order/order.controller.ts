import { AuthRequest } from "../../middlewares/auth/auth.middleware.js"
import { Response } from "express"
import { createOrderInDB } from "./order.service.js";
import { clearCartItemsByUserId } from "../cart/cart.service.js";



export const createOrder = async (req: AuthRequest, res: Response) => {
    try{
        const orderData = req.body;
        const userId = Number(req.user?.id);
        if(!userId) return res.status(401).json({ message: "Unauthorized" });

        const order = await createOrderInDB(userId, orderData);
        if(order === null) return res.status(400).json({message: "Cart is empty"});

        return res.status(200).json(order);
    } catch (e) {
        console.log(e);
        return res.status(500).json({message:"Server error: Cannot form order"});
    }
}