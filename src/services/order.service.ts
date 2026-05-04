import { OrderRepository } from '../repositories/order.repository.js';
import { Order, OrderItem, Product, Customer } from '../models/index.js';

export class OrderService {
    constructor(private orderRepository: OrderRepository) {}

    private calculateTotal(items: OrderItem[]): number {
        return items.reduce((total: number, item: OrderItem) => {
            return total + (item.unitPrice * item.quantity);
        }, 0);
    }

    async getAllOrders(): Promise<Order[]> {
        return this.orderRepository.findAllOrders();
    }

    async getOrderById(id: number): Promise<Order | undefined> {
        return this.orderRepository.findOrderById(id);
    }

    async createOrder(customerId: number, itemsData: { productId: number, quantity: number }[]): Promise<Order> {
        const customers = await this.orderRepository.findAllCustomers();
        const customer = customers.find((c: Customer) => c.id === customerId);
        
        if (!customer) {
            throw new Error(`Customer with ID ${customerId} not found`);
        }

        const items: OrderItem[] = [];
        
        for (const item of itemsData) {
            const product = await this.orderRepository.findProductById(item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }
            
            items.push({
                id: Math.floor(Math.random() * 10000),
                product,
                unitPrice: product.unitPrice,
                quantity: item.quantity
            });
        }

        const newOrder: Order = {
            id: Math.floor(Math.random() * 10000),
            orderNumber: `ORD-${Date.now()}`,
            orderDate: new Date().toISOString(),
            totalAmount: this.calculateTotal(items),
            customer,
            items
        };

        return this.orderRepository.saveOrder(newOrder);
    }

    async replaceOrder(orderId: number, customerId: number, itemsData: { productId: number, quantity: number }[]): Promise<Order | undefined> {
        const existingOrder = await this.orderRepository.findOrderById(orderId);
        if (!existingOrder) return undefined;

        const customers = await this.orderRepository.findAllCustomers();
        const customer = customers.find((c: Customer) => c.id === customerId);
        if (!customer) throw new Error(`Customer with ID ${customerId} not found`);

        const items: OrderItem[] = [];
        for (const item of itemsData) {
            const product = await this.orderRepository.findProductById(item.productId);
            if (!product) throw new Error(`Product with ID ${item.productId} not found`);
            
            items.push({
                id: Math.floor(Math.random() * 10000),
                product,
                unitPrice: product.unitPrice,
                quantity: item.quantity
            });
        }

        existingOrder.customer = customer;
        existingOrder.items = items;
        existingOrder.totalAmount = this.calculateTotal(items);

        return this.orderRepository.updateOrder(orderId, existingOrder);
    }

    async patchOrder(orderId: number, updateData: Partial<Order>): Promise<Order | undefined> {
        const existingOrder = await this.orderRepository.findOrderById(orderId);
        if (!existingOrder) return undefined;

        // Si envían un nuevo customerId (aunque deberíamos cambiar el modelo, usaremos customer directamente)
        if (updateData.customer) {
             const customers = await this.orderRepository.findAllCustomers();
             const newCustomer = customers.find((c: Customer) => c.id === updateData.customer?.id);
             if (newCustomer) {
                 existingOrder.customer = newCustomer;
             }
        }

        if (updateData.orderDate) {
            existingOrder.orderDate = updateData.orderDate;
        }

        return this.orderRepository.updateOrder(orderId, existingOrder);
    }

    async addProductToOrder(orderId: number, productId: number, quantity: number): Promise<Order | undefined> {
        const order = await this.orderRepository.findOrderById(orderId);
        if (!order) return undefined;

        const product = await this.orderRepository.findProductById(productId);
        if (!product) throw new Error(`Product with ID ${productId} not found`);

        const newItem: OrderItem = {
            id: Math.floor(Math.random() * 10000),
            product,
            unitPrice: product.unitPrice,
            quantity
        };

        order.items.push(newItem);
        order.totalAmount = this.calculateTotal(order.items);

        return this.orderRepository.updateOrder(orderId, order);
    }

    async updateOrderItem(orderId: number, itemId: number, data: { quantity?: number, unitPrice?: number }): Promise<Order | undefined> {
        const order = await this.orderRepository.findOrderById(orderId);
        if (!order) return undefined;

        const item = order.items.find((i: OrderItem) => i.id === itemId);
        if (!item) throw new Error(`Item with ID ${itemId} not found in order ${orderId}`);

        if (data.quantity !== undefined) item.quantity = data.quantity;
        if (data.unitPrice !== undefined) item.unitPrice = data.unitPrice;
        
        order.totalAmount = this.calculateTotal(order.items);

        return this.orderRepository.updateOrder(orderId, order);
    }

    async removeItemFromOrder(orderId: number, itemId: number): Promise<Order | undefined> {
        const order = await this.orderRepository.findOrderById(orderId);
        if (!order) return undefined;

        order.items = order.items.filter((i: OrderItem) => i.id !== itemId);
        order.totalAmount = this.calculateTotal(order.items);

        return this.orderRepository.updateOrder(orderId, order);
    }

    async deleteOrder(id: number): Promise<boolean> {
        return this.orderRepository.deleteOrder(id);
    }

    async getAllProducts(): Promise<Product[]> {
        return this.orderRepository.findAllProducts();
    }

    async getProductById(id: number): Promise<Product | undefined> {
        return this.orderRepository.findProductById(id);
    }
}
