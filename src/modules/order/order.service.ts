import { prisma } from "../../lib/prisma.js";
import { CreateOrderObj, OrderStatuses } from "../../types/order.model.js";



export const createOrderInDB = async (userId:number, orderData: CreateOrderObj) => {
    const {fullName, town, viddilennya, number, currency, deliveryType} = orderData;
        
    const order = await prisma.$transaction(async (tx) => {
        const cartItems = await tx.cartItem.findMany({
          where: { cart: { userId } },
          include: { product: true }
        });
      
        if (cartItems.length === 0) {
          return null;
        }
      
        let totalPrice = 0;
      
       const orderItemsData = cartItems.map((item) => {
          const itemPrice = item.count * item.product.price;

          const finalPrice = item.product.discount
            ? itemPrice - (itemPrice * item.product.discount) / 100
            : itemPrice;
          
          totalPrice += finalPrice;
        
         return {
            productId: item.productId,
            productTitle: item.product.title,
            productBrand: item.product.brand,
            priceAtPurchase: item.product.price,
            count: item.count,
          };
        });
      
       const order = await tx.order.create({
            data: {
                userId,
            
                fullName,
                town,
                viddilennya,
                number,
            
                totalPrice,
                currency,
            
                status: "PENDING",
                deliveryType: orderData.deliveryType,
            
                orderItems: {
                    create: orderItemsData,
                },
          },
        });

        await tx.cartItem.deleteMany({
            where: { cart: { userId } }
        });

        return order;
    });

    return order;
}
