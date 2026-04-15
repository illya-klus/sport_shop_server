import { prisma } from "../../lib/prisma.js"
import { CreateCartItemReqBody } from "../../types/cartItem.model.js"
import { createCartForUser } from "../cart/cart.service.js";




export const createNewCartItem = async (
    userId : number, 
    {productId, count} : CreateCartItemReqBody
) => {
    let cart = await prisma.cart.findUnique({where:{userId}});
    if( !cart ) cart = await createCartForUser(userId);

    const existingItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
        },
    });

    if(existingItem) {
        return await prisma.cartItem.update({
            where: {
                id : existingItem.id,
            },
            data: {
                count : existingItem.count + count,
            }
        })
    }

    return await prisma.cartItem.create({
        data:{
            productId,
            count,
            cartId : cart.id,
        }
    });
}

export const deleteCartItem = async (userId : number, itemId : number) => {
    const item = await prisma.cartItem.findFirst(
        {where: {id: itemId, cart: {userId}}}
    );

    if (!item) return null;

    if(item.count > 1){
        return await prisma.cartItem.update(
            {
                where:{id : item.id},
                data : {
                    count: {
                        decrement: 1,
                    },
                }
            }
        );
    }  
    
    return await prisma.cartItem.delete({ where: { id : item.id } });
}