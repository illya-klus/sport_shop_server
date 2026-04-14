export type Product = {
    id: number;
    brand: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    discount: number | null;
    currency: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export type ProductInfoParams = {
    brand: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    discount: number | null;
    currency: string;
    image: string | null;
}