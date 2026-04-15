import { OrderItem } from "./orderItem.model.js";

export type OrderStatuses = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELED";
export type DeliveryType = "NovaPoshta" | "Courier" | "Pickup";

export type OrderData = {
    userId: number;

    fullName: string;
    town: string;
    viddilennya: number | null;
    number: string;

    totalPrice: number;
    currency: string;

    status: OrderStatuses;
    deliveryType: DeliveryType;

    orderItems?: OrderItem[];
}

export type CreateOrderObj = {
    fullName: string;
    town: string;
    viddilennya: number | null;
    number: string;
    currency: string;
    deliveryType: DeliveryType;
}

export type OrderDataRequest = {

}
