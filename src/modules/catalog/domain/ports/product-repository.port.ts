import { Page } from 'src/modules/shared/pagination/page.model';
import { Product } from '../entities/product.entity';

export abstract class ProductRepositoryPort {

    abstract save(product: Product): Promise<Product>;
    
    abstract findAll(page: number, limit: number): Promise<Page<Product>>;
    
    abstract findById(id: string): Promise<Product | null>;
    
    abstract findBySku(sku: string): Promise<Product | null>;
    
    abstract updateStock(id: string, quantity: number): Promise<Product>;
    
    abstract delete(id: string): Promise<void>;
}