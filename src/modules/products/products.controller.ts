import { Response } from "express"
import { AuthRequest } from "../../middlewares/auth/auth.middleware.js"
import { createNewProduct, selectAllProducts } from "./products.service.js";
import { Product } from "../../models/product.model.js";



export const getAll = async (req: AuthRequest, res: Response) => {
    let products : Product[];
    try{
        products = await selectAllProducts();
    } catch (e) {
        return res.status(500).send("Caanot load products.")
    }
    
    res.status(200).json(
        {   
            count : products.length,
            products,
        });
}

// export const getOne = async (req: Request, res: Response) => {

// }

export const createOne = async (req: AuthRequest, res: Response) => {
    const product = req.body;
    try{
        await createNewProduct(product);
        return res.status(203).send("Created");
    } catch(e){
        return res.status(500).send("Cannot create user.");
    }
    

}

export const updateOne = async (req: AuthRequest, res: Response) => {

}

export const deleteOne = async (req: AuthRequest, res: Response) => {

}