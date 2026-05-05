import { OrderRepository } from '../repositories/order.repository.js';
import { Customer, Order } from '../models/index.js';

export interface CustomerFilters {
    page?: number;
    limit?: number;
    city?: string;
    country?: string;
    search?: string;
}

export class CustomerService {
    constructor(private repo: OrderRepository) {}

    async getAllCustomers(filters: CustomerFilters = {}): Promise<{ data: Customer[]; total: number; page: number; limit: number }> {
        let customers = await this.repo.findAllCustomers();

        if (filters.country) {
            customers = customers.filter((c) =>
                c.country.toLowerCase().includes(filters.country!.toLowerCase())
            );
        }
        if (filters.city) {
            customers = customers.filter((c) =>
                c.city.toLowerCase().includes(filters.city!.toLowerCase())
            );
        }
        if (filters.search) {
            const q = filters.search.toLowerCase();
            customers = customers.filter(
                (c) =>
                    c.firstName.toLowerCase().includes(q) ||
                    c.lastName.toLowerCase().includes(q) ||
                    c.phone.toLowerCase().includes(q)
            );
        }

        const total = customers.length;
        const page = filters.page ?? 1;
        const limit = filters.limit ?? 10;
        const start = (page - 1) * limit;
        const data = customers.slice(start, start + limit);

        return { data, total, page, limit };
    }

    async getCustomerById(id: number): Promise<Customer | undefined> {
        return this.repo.findCustomerById(id);
    }

    async getOrdersByCustomer(customerId: number): Promise<Order[]> {
        const customer = await this.repo.findCustomerById(customerId);
        if (!customer) throw new Error(`Customer with ID ${customerId} not found`);
        return this.repo.findOrdersByCustomerId(customerId);
    }

    async createCustomer(data: Omit<Customer, 'id'>): Promise<Customer> {
        const allCustomers = await this.repo.findAllCustomers();
        const newId = allCustomers.length > 0
            ? Math.max(...allCustomers.map((c) => c.id)) + 1
            : 1;

        const newCustomer: Customer = { id: newId, ...data };
        return this.repo.saveCustomer(newCustomer);
    }

    async patchCustomer(id: number, data: Partial<Omit<Customer, 'id'>>): Promise<Customer | undefined> {
        const existing = await this.repo.findCustomerById(id);
        if (!existing) return undefined;
        return this.repo.updateCustomer(id, data);
    }
}
