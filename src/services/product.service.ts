import { OrderRepository } from '../repositories/order.repository.js';
import { Product, Supplier } from '../models/index.js';

export interface ProductFilters {
    page?: number;
    limit?: number;
    supplierId?: number;
    search?: string;
    discontinued?: boolean;
}

export class ProductService {
    constructor(private repo: OrderRepository) {}

    async getAllProducts(filters: ProductFilters = {}): Promise<{ data: Product[]; total: number; page: number; limit: number }> {
        let products = await this.repo.findAllProducts();

        if (filters.supplierId !== undefined) {
            products = products.filter((p) => p.supplier?.id === filters.supplierId);
        }
        if (filters.search) {
            const q = filters.search.toLowerCase();
            products = products.filter((p) => p.productName.toLowerCase().includes(q));
        }
        if (filters.discontinued !== undefined) {
            products = products.filter((p) => p.isDiscontinued === filters.discontinued);
        }

        const total = products.length;
        const page = filters.page ?? 1;
        const limit = filters.limit ?? 10;
        const start = (page - 1) * limit;
        const data = products.slice(start, start + limit);

        return { data, total, page, limit };
    }

    async getProductById(id: number): Promise<Product | undefined> {
        return this.repo.findProductById(id);
    }

    async createProduct(data: {
        productName: string;
        supplierId: number;
        unitPrice: number;
        package: string;
        isDiscontinued: boolean;
    }): Promise<Product> {
        const supplier = await this.repo.findSupplierById(data.supplierId);
        if (!supplier) throw new Error(`Supplier with ID ${data.supplierId} not found`);

        const allProducts = await this.repo.findAllProducts();
        const newId = allProducts.length > 0
            ? Math.max(...allProducts.map((p) => p.id)) + 1
            : 1;

        const newProduct: Product = {
            id: newId,
            productName: data.productName,
            unitPrice: data.unitPrice,
            package: data.package,
            isDiscontinued: data.isDiscontinued,
            supplier,
        };

        return this.repo.saveProduct(newProduct);
    }

    async replaceProduct(id: number, data: {
        productName: string;
        supplierId: number;
        unitPrice: number;
        package: string;
        isDiscontinued: boolean;
    }): Promise<Product | undefined> {
        const existing = await this.repo.findProductById(id);
        if (!existing) return undefined;

        const supplier = await this.repo.findSupplierById(data.supplierId);
        if (!supplier) throw new Error(`Supplier with ID ${data.supplierId} not found`);

        const replaced: Product = {
            id,
            productName: data.productName,
            unitPrice: data.unitPrice,
            package: data.package,
            isDiscontinued: data.isDiscontinued,
            supplier,
        };

        return this.repo.updateProduct(id, replaced);
    }

    async patchProduct(id: number, data: Partial<{
        productName: string;
        supplierId: number;
        unitPrice: number;
        package: string;
        isDiscontinued: boolean;
    }>): Promise<Product | undefined> {
        const existing = await this.repo.findProductById(id);
        if (!existing) return undefined;

        const updateData: Partial<Product> = {};
        if (data.productName !== undefined) updateData.productName = data.productName;
        if (data.unitPrice !== undefined) updateData.unitPrice = data.unitPrice;
        if (data.package !== undefined) updateData.package = data.package;
        if (data.isDiscontinued !== undefined) updateData.isDiscontinued = data.isDiscontinued;

        if (data.supplierId !== undefined) {
            const supplier = await this.repo.findSupplierById(data.supplierId);
            if (!supplier) throw new Error(`Supplier with ID ${data.supplierId} not found`);
            updateData.supplier = supplier;
        }

        return this.repo.updateProduct(id, updateData);
    }

    async deleteProduct(id: number): Promise<'deleted' | 'not_found' | 'conflict'> {
        const existing = await this.repo.findProductById(id);
        if (!existing) return 'not_found';

        const isUsed = await this.repo.isProductUsedInOrders(id);
        if (isUsed) {
            // Marcar como discontinuado en lugar de eliminar
            await this.repo.updateProduct(id, { isDiscontinued: true });
            return 'conflict';
        }

        await this.repo.deleteProduct(id);
        return 'deleted';
    }
}
