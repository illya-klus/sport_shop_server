import { prisma } from "../../lib/prisma.js"



export const getCartByUserId = async (id : number) => {
    return await prisma.cart.findUnique({where:{userId : id}})
} 

export const createCartForUser = async (id : number) => {
    return await prisma.cart.create({data:{userId : id}});
}

export const deleteCartByUserId = async (id : number) => {
    await prisma.cart.deleteMany({
        where: { userId: id }
    });
}