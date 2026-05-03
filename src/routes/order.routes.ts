import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { OrderService } from '../services/order.service.js';
import { OrderRepository } from '../repositories/order.repository.js';

const router = Router();

// Inyectamos las dependencias
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

// Definición de rutas según la guía
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:orderId', orderController.getOrderById);
router.post('/orders', orderController.createOrder);
router.put('/orders/:orderId', orderController.replaceOrder);
router.patch('/orders/:orderId', orderController.patchOrder);
router.delete('/orders/:orderId', orderController.deleteOrder);

// Rutas para los Items de una orden
router.get('/orders/:orderId/items', orderController.getOrderItems);
router.post('/orders/:orderId/items', orderController.addProductToOrder);
router.patch('/orders/:orderId/items/:itemId', orderController.updateItemQuantity);
router.delete('/orders/:orderId/items/:itemId', orderController.removeItem);

// Rutas obligatorias para Productos
router.get('/products', orderController.getAllProducts);
router.get('/products/:productId', orderController.getProductById);

export default router;
