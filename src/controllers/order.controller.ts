import { Request, Response } from 'express';
import { OrderService } from '../services/order.service.js';

export class OrderController {
    constructor(private orderService: OrderService) {}

    getAllOrders = async (req: Request, res: Response) => {
        try {
            const orders = await this.orderService.getAllOrders();
            // Implementación básica de filtros (opcional por ahora)
            res.json(orders);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    getOrderById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.orderId);
            const order = await this.orderService.getOrderById(id);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.json(order);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    createOrder = async (req: Request, res: Response) => {
        try {
            const { customerId, items } = req.body;
            const newOrder = await this.orderService.createOrder(customerId, items);
            res.status(201).json(newOrder);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    deleteOrder = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.orderId);
            const deleted = await this.orderService.deleteOrder(id);
            if (!deleted) return res.status(404).json({ message: 'Order not found' });
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Métodos para Items
    getOrderItems = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.orderId);
            const order = await this.orderService.getOrderById(id);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.json(order.items);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    addProductToOrder = async (req: Request, res: Response) => {
        try {
            const orderId = parseInt(req.params.orderId);
            const { productId, quantity } = req.body;
            const updatedOrder = await this.orderService.addProductToOrder(orderId, productId, quantity);
            if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
            res.status(201).json(updatedOrder);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    updateItemQuantity = async (req: Request, res: Response) => {
        try {
            const orderId = parseInt(req.params.orderId);
            const itemId = parseInt(req.params.itemId);
            const { quantity } = req.body;
            const updatedOrder = await this.orderService.updateItemQuantity(orderId, itemId, quantity);
            if (!updatedOrder) return res.status(404).json({ message: 'Order or item not found' });
            res.json(updatedOrder);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    removeItem = async (req: Request, res: Response) => {
        try {
            const orderId = parseInt(req.params.orderId);
            const itemId = parseInt(req.params.itemId);
            const updatedOrder = await this.orderService.removeItemFromOrder(orderId, itemId);
            if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Productos (Obligatorio listar y detalle)
    getAllProducts = async (req: Request, res: Response) => {
        try {
            const products = await this.orderService.getAllProducts();
            res.json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    getProductById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.productId);
            const product = await this.orderService.getProductById(id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json(product);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
