export type OrderItem = {
  orderId: number;

  productId: number;

  productTitle: string;
  productBrand: string;

  priceAtPurchase: number;
  count: number;
};

export type CreateOrderItem = {
  productId: number;

  productTitle: string;
  productBrand: string;

  priceAtPurchase: number;
  count: number;
}
