import fs from 'fs';
import path from 'path';
import { Order, Customer, Product, Supplier } from '../models';

export class OrderRepository {
    private orders: Order[] = [];
    private customers: Customer[] = [];
    private products: Product[] = [];
    private suppliers: Supplier[] = [];
    private filePath = path.join(__dirname, '../../Orders.json');

    constructor() {
        this.loadData();
    }

    private loadData() {
        try {
            const rawData = fs.readFileSync(this.filePath, 'utf-8');
            this.orders = JSON.parse(rawData);
            this.normalizeData();
            console.log('Data loaded successfully from Orders.json');
        } catch (error) {
            console.error('Error loading Orders.json:', error);
            this.orders = [];
        }
    }

    private normalizeData() {
        // Extraer clientes únicos
        const customerMap = new Map<number, Customer>();
        const productMap = new Map<number, Product>();
        const supplierMap = new Map<number, Supplier>();

        this.orders.forEach(order => {
            // Guardar cliente
            if (order.customer) {
                customerMap.set(order.customer.id, order.customer);
            }

            // Guardar productos y proveedores de los items
            order.items.forEach(item => {
                if (item.product) {
                    productMap.set(item.product.id, item.product);
                    if (item.product.supplier) {
                        supplierMap.set(item.product.supplier.id, item.product.supplier);
                    }
                }
            });
        });

        this.customers = Array.from(customerMap.values());
        this.products = Array.from(productMap.values());
        this.suppliers = Array.from(supplierMap.values());
    }

    // Métodos para Orders
    async findAllOrders(): Promise<Order[]> {
        return this.orders;
    }

    async findOrderById(id: number): Promise<Order | undefined> {
        return this.orders.find(o => o.id === id);
    }

    async saveOrder(order: Order): Promise<Order> {
        this.orders.push(order);
        return order;
    }

    async updateOrder(id: number, orderData: Partial<Order>): Promise<Order | undefined> {
        const index = this.orders.findIndex(o => o.id === id);
        if (index !== -1) {
            this.orders[index] = { ...this.orders[index], ...orderData };
            return this.orders[index];
        }
        return undefined;
    }

    async deleteOrder(id: number): Promise<boolean> {
        const index = this.orders.findIndex(o => o.id === id);
        if (index !== -1) {
            this.orders.splice(index, 1);
            return true;
        }
        return false;
    }

    // Métodos para Customers y Products (Complementarios)
    async findAllCustomers(): Promise<Customer[]> {
        return this.customers;
    }

    async findAllProducts(): Promise<Product[]> {
        return this.products;
    }

    async findProductById(id: number): Promise<Product | undefined> {
        return this.products.find(p => p.id === id);
    }
}
