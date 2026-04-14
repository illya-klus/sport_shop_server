import { prisma } from "../../lib/prisma.js"
import { ProductInfoParams } from "../../models/product.model.js";


export const selectAllProducts = async () => {
    return await prisma.product.findMany();
}

export const createNewProduct = async (product : ProductInfoParams) => {
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

export const updateProduct = async (id : number, newProduct : ProductInfoParams) => {
    await prisma.product.update({
        where: {
            id,
        },
        data: {
            ...newProduct,
        },
    });
}