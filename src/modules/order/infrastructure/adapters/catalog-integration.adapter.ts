import { Injectable } from '@nestjs/common';
import { CatalogIntegrationPort, ProductStockInfo } from '../../domain/ports/catalog-integration.port';
import { ProductRepositoryPort } from 'src/modules/catalog/domain/ports/product-repository.port';

@Injectable()
export class CatalogIntegrationAdapter implements CatalogIntegrationPort {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async getProductsInfo(productIds: string[], storeId: string): Promise<ProductStockInfo[]> {
    const products = await Promise.all(productIds.map((id) => this.productRepository.findById(id, storeId)));

    return products
      .filter((p) => p !== null)
      .map((p) => ({
        productId: p.id.toString(),
        name: p.getName(),
        price: p.getPrice(),
        availableStock: p.getStock(),
      }));
  }

  async updateStock(productId: string, quantity: number, storeId: string): Promise<void> {
    const product = await this.productRepository.findById(productId, storeId);
    if (!product) return;

    const newStock = product.getStock() - quantity;
    product.updateStock(newStock);

    await this.productRepository.save(product);
  }
}
