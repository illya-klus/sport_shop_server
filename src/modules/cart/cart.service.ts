import { prisma } from "../../lib/prisma.js"



export const getCartByUserId = async (id : number) => {
    const cart = await prisma.cart.findUnique({where:{userId : id}});
    if (!cart) return null;

    const cartItems = await prisma.cartItem.findMany({where:{cartId : cart.id}});

    return {...cart, cartItems};
} 

export const createCartForUser = async (id : number) => {
    return await prisma.cart.create({data:{userId : id}});
}

export const deleteCartByUserId = async (id : number) => {
    await prisma.cart.deleteMany({
        where: { userId: id }
    });
}