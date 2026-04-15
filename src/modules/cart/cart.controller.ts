import { AuthRequest } from "../../middlewares/auth/auth.middleware.js"
import { Response } from "express"
import { createCartForUser, deleteCartByUserId, getCartByUserId } from "./cart.service.js";



export const getCart = async (req: AuthRequest, res: Response) => {
    try{
        const id = req.user?.id;
        if(!id) return res.status(401).json({ message: "Unauthorized" });

        const cart = await getCartByUserId(id);
        if(!cart){
            const newCart = await createCartForUser(id);
            return res.status(200).json(newCart);
        } 
        
        return res.status(200).json(cart);
    } catch (e){
        console.error(e);
        return res.status(500).json({ message: "Cannot load cart." });
    }
}


export const clearCart = async (req: AuthRequest, res: Response) => {
    try{
        const id = req.user?.id;
        if(!id) return res.status(401).json({ message: "Unauthorized" });
        
        await deleteCartByUserId(id);
        return res.sendStatus(204);
        
    } catch (e){
        console.error(e);
        return res.status(500).json({ message: "Cannot clear cart." });
    }
}




// export const addItemToCart = async (req: AuthRequest, res: Response) => {
//     try{
//         const id = req.user?.id;
//         if(!id) return res.status(401).json({ message: "Unauthorized" });

//         const cart = await getCartByUserId(id);
//         if(!cart){
//             createCartForUser(id);

//         } return res.status(200).json(null);
        
//         return res.status(200).json(cart);
//     } catch (e){
//         console.error(e);
//         return res.status(500).json({ message: "Cannot add item to cart." });
//     }
// }


// export const updateItemInCart = async (req: AuthRequest, res: Response) => {

// }


// export const removeCartItem = async (req: AuthRequest, res: Response) => {

// }



