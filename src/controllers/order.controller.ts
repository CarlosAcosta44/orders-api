import { Request, Response } from 'express';
import { OrderService } from '../services/order.service.js';

// Definimos los tipos de los parámetros de la URL
interface RouteParams {
    orderId?: string;
    itemId?: string;
    productId?: string;
}

export class OrderController {
    constructor(private orderService: OrderService) {}

    getAllOrders = async (req: Request, res: Response) => {
        try {
            const orders = await this.orderService.getAllOrders();
            res.json(orders);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    getOrderById = async (req: Request<RouteParams>, res: Response) => {
        try {
            const { orderId } = req.params;
            const order = await this.orderService.getOrderById(parseInt(orderId!));
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

    replaceOrder = async (req: Request<RouteParams>, res: Response) => {
        try {
            const { orderId } = req.params;
            const { customerId, items } = req.body;
            const updatedOrder = await this.orderService.replaceOrder(parseInt(orderId!), customerId, items);
            if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
            res.json(updatedOrder);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    patchOrder = async (req: Request<RouteParams>, res: Response) => {
        try {
            const { orderId } = req.params;
            // Permitimos actualizar orderDate o customerId
            const updateData: any = {};
            if (req.body.orderDate) updateData.orderDate = req.body.orderDate;
            if (req.body.customerId) updateData.customer = { id: req.body.customerId };

            const updatedOrder = await this.orderService.patchOrder(parseInt(orderId!), updateData);
            if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
            res.json(updatedOrder);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    deleteOrder = async (req: Request<RouteParams>, res: Response) => {
        try {
            const { orderId } = req.params;
            const deleted = await this.orderService.deleteOrder(parseInt(orderId!));
            if (!deleted) return res.status(404).json({ message: 'Order not found' });
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    getOrderItems = async (req: Request<RouteParams>, res: Response) => {
        try {
            const { orderId } = req.params;
            const order = await this.orderService.getOrderById(parseInt(orderId!));
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.json(order.items);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    addProductToOrder = async (req: Request<RouteParams>, res: Response) => {
        try {
            const { orderId } = req.params;
            const { productId, quantity } = req.body;
            const updatedOrder = await this.orderService.addProductToOrder(parseInt(orderId!), productId, quantity);
            if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
            res.status(201).json(updatedOrder);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    updateOrderItem = async (req: Request<RouteParams>, res: Response) => {
        try {
            const { orderId, itemId } = req.params;
            const { quantity, unitPrice } = req.body;
            const updatedOrder = await this.orderService.updateOrderItem(parseInt(orderId!), parseInt(itemId!), { quantity, unitPrice });
            if (!updatedOrder) return res.status(404).json({ message: 'Order or item not found' });
            res.json(updatedOrder);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    removeItem = async (req: Request<RouteParams>, res: Response) => {
        try {
            const { orderId, itemId } = req.params;
            const updatedOrder = await this.orderService.removeItemFromOrder(parseInt(orderId!), parseInt(itemId!));
            if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }


}
