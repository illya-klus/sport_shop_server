import { prisma } from "../../lib/prisma.js"
import { CreateNewProduct } from "../../models/product.model.js";


export const selectAllProducts = async () => {
    return await prisma.product.findMany();
}

export const createNewProduct = async (product : CreateNewProduct) => {
    const newProduct = await prisma.product.create(
        {
            data: {...product}
        }
    );
    return newProduct;
}