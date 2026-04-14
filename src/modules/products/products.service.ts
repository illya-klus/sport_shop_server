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

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: { id },
  });
};

export const findProduct = async (id : number) => {
    return await prisma.product.findUnique({where:{id}})
}