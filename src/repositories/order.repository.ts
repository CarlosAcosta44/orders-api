import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Order, Customer, Product, Supplier, OrderItem } from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        const customerMap = new Map<number, Customer>();
        const productMap = new Map<number, Product>();
        const supplierMap = new Map<number, Supplier>();

        this.orders.forEach((order: Order) => {
            if (order.customer) {
                customerMap.set(order.customer.id, order.customer);
            }

            order.items.forEach((item: OrderItem) => {
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

    // ─── Orders ───────────────────────────────────────────────────────────────

    async findAllOrders(): Promise<Order[]> {
        return this.orders;
    }

    async findOrderById(id: number): Promise<Order | undefined> {
        return this.orders.find((o: Order) => o.id === id);
    }

    async findOrdersByCustomerId(customerId: number): Promise<Order[]> {
        return this.orders.filter((o: Order) => o.customer?.id === customerId);
    }

    async saveOrder(order: Order): Promise<Order> {
        this.orders.push(order);
        return order;
    }

    async updateOrder(id: number, orderData: Partial<Order>): Promise<Order | undefined> {
        const index = this.orders.findIndex((o: Order) => o.id === id);
        if (index !== -1) {
            this.orders[index] = { ...this.orders[index], ...orderData };
            return this.orders[index];
        }
        return undefined;
    }

    async deleteOrder(id: number): Promise<boolean> {
        const index = this.orders.findIndex((o: Order) => o.id === id);
        if (index !== -1) {
            this.orders.splice(index, 1);
            return true;
        }
        return false;
    }

    // ─── Customers ────────────────────────────────────────────────────────────

    async findAllCustomers(): Promise<Customer[]> {
        return this.customers;
    }

    async findCustomerById(id: number): Promise<Customer | undefined> {
        return this.customers.find((c: Customer) => c.id === id);
    }

    async saveCustomer(customer: Customer): Promise<Customer> {
        this.customers.push(customer);
        return customer;
    }

    async updateCustomer(id: number, data: Partial<Customer>): Promise<Customer | undefined> {
        const index = this.customers.findIndex((c: Customer) => c.id === id);
        if (index !== -1) {
            this.customers[index] = { ...this.customers[index], ...data };
            return this.customers[index];
        }
        return undefined;
    }

    // ─── Products ─────────────────────────────────────────────────────────────

    async findAllProducts(): Promise<Product[]> {
        return this.products;
    }

    async findProductById(id: number): Promise<Product | undefined> {
        return this.products.find((p: Product) => p.id === id);
    }

    async findProductsBySupplier(supplierId: number): Promise<Product[]> {
        return this.products.filter((p: Product) => p.supplier?.id === supplierId);
    }

    async saveProduct(product: Product): Promise<Product> {
        this.products.push(product);
        return product;
    }

    async updateProduct(id: number, data: Partial<Product>): Promise<Product | undefined> {
        const index = this.products.findIndex((p: Product) => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...data };
            return this.products[index];
        }
        return undefined;
    }

    async deleteProduct(id: number): Promise<boolean> {
        const index = this.products.findIndex((p: Product) => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }

    async isProductUsedInOrders(productId: number): Promise<boolean> {
        return this.orders.some((o: Order) =>
            o.items.some((i: OrderItem) => i.product?.id === productId)
        );
    }

    // ─── Suppliers ────────────────────────────────────────────────────────────

    async findAllSuppliers(): Promise<Supplier[]> {
        return this.suppliers;
    }

    async findSupplierById(id: number): Promise<Supplier | undefined> {
        return this.suppliers.find((s: Supplier) => s.id === id);
    }

    async saveSupplier(supplier: Supplier): Promise<Supplier> {
        this.suppliers.push(supplier);
        return supplier;
    }

    async updateSupplier(id: number, data: Partial<Supplier>): Promise<Supplier | undefined> {
        const index = this.suppliers.findIndex((s: Supplier) => s.id === id);
        if (index !== -1) {
            this.suppliers[index] = { ...this.suppliers[index], ...data };
            return this.suppliers[index];
        }
        return undefined;
    }
}
