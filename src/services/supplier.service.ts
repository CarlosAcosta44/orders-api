import { OrderRepository } from '../repositories/order.repository.js';
import { Supplier, Product } from '../models/index.js';

export interface SupplierFilters {
    page?: number;
    limit?: number;
    country?: string;
    search?: string;
}

export class SupplierService {
    constructor(private repo: OrderRepository) {}

    async getAllSuppliers(filters: SupplierFilters = {}): Promise<{ data: Supplier[]; total: number; page: number; limit: number }> {
        let suppliers = await this.repo.findAllSuppliers();

        if (filters.country) {
            suppliers = suppliers.filter((s) =>
                s.country.toLowerCase().includes(filters.country!.toLowerCase())
            );
        }
        if (filters.search) {
            const q = filters.search.toLowerCase();
            suppliers = suppliers.filter(
                (s) =>
                    s.companyName.toLowerCase().includes(q) ||
                    s.contactName.toLowerCase().includes(q)
            );
        }

        const total = suppliers.length;
        const page = filters.page ?? 1;
        const limit = filters.limit ?? 10;
        const start = (page - 1) * limit;
        const data = suppliers.slice(start, start + limit);

        return { data, total, page, limit };
    }

    async getSupplierById(id: number): Promise<Supplier | undefined> {
        return this.repo.findSupplierById(id);
    }

    async getProductsBySupplier(supplierId: number): Promise<Product[]> {
        const supplier = await this.repo.findSupplierById(supplierId);
        if (!supplier) throw new Error(`Supplier with ID ${supplierId} not found`);
        return this.repo.findProductsBySupplier(supplierId);
    }

    async createSupplier(data: Omit<Supplier, 'id'>): Promise<Supplier> {
        const allSuppliers = await this.repo.findAllSuppliers();
        const newId = allSuppliers.length > 0
            ? Math.max(...allSuppliers.map((s) => s.id)) + 1
            : 1;

        const newSupplier: Supplier = { id: newId, ...data };
        return this.repo.saveSupplier(newSupplier);
    }

    async patchSupplier(id: number, data: Partial<Omit<Supplier, 'id'>>): Promise<Supplier | undefined> {
        const existing = await this.repo.findSupplierById(id);
        if (!existing) return undefined;
        return this.repo.updateSupplier(id, data);
    }
}
