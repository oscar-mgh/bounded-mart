export interface CreateProductCommand {
    sku: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    discount?: {
        code: string;
        percentage: number;
        expirationDate: Date;
    };
}