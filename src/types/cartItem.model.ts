export type CartItem = {
    id: number;
    productId: number;
    cartId: number;
    count: number;
}

export type CreateCartItemReqBody = {
    count: number;
    productId: number;
}
