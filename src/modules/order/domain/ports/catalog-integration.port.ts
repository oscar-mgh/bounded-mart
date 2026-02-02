export interface ProductStockInfo {
  productId: string;
  name: string;
  price: number;
  availableStock: number;
}

export abstract class CatalogIntegrationPort {
  
  abstract getProductsInfo(productIds: string[], storeId: string): Promise<ProductStockInfo[]>;

  abstract updateStock(productId: string, quantity: number, storeId: string): Promise<void>;
}
