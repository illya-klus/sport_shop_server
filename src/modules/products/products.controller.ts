import { Response } from "express"
import { AuthRequest } from "../../middlewares/auth/auth.middleware.js"
import { createNewProduct, deleteProduct, findProduct, selectAllProducts, updateProduct } from "./products.service.js";
import { Product } from "../../types/product.model.js";



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
    try{
        const id = Number(req.params.id);
        if (!id) return res.status(400).json({ message: "Invalid ID" });

        const product = await findProduct(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const newProduct = {
            ...req.body
        }

        await updateProduct(id, newProduct);

        return res.status(201).json({
            message: "Product updated successfully",
        });

    } catch (error){
        console.error("UPDATE PRODUCT ERROR:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteOne = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const product = await findProduct(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    
    await deleteProduct(id);

    return res.status(200).json({
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};