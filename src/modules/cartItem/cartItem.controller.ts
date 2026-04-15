import { AuthRequest } from "../../middlewares/auth/auth.middleware.js"
import { Response } from "express"
import { createNewCartItem, deleteCartItem } from "./cartItem.service.js";



export const addItemToCart = async (req: AuthRequest, res: Response) => {
    try{
        const id = req.user?.id;
        if(!id) return res.status(401).json({ message: "Unauthorized" });

        const {count, productId} = req.body;
        const item = await createNewCartItem(id, {count, productId});

        return res.status(201).json(item);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Fail to add item to cart" });
    }

}

export const deleteItemFromCart = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.user?.id;
        if(!id) return res.status(401).json({ message: "Unauthorized" });

        const cartItemId = Number(req.params.id);
        if (isNaN(cartItemId) || cartItemId <= 0)
            return res.status(400).json({ message: "Invalid cart item id" });
        

        await deleteCartItem(id, cartItemId);

        return res.status(200).json({ message: "Item deleted" });
    } catch(e) {
        console.log(e);
        return res.status(500).json({ message: "Fail to delete item to cart" });
    }
}



