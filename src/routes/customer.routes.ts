import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller.js';
import { CustomerService } from '../services/customer.service.js';
import { OrderRepository } from '../repositories/order.repository.js';

const router = Router();

const orderRepository = new OrderRepository();
const customerService = new CustomerService(orderRepository);
const customerController = new CustomerController(customerService);

/**
 * @route   GET /api/v1/customers
 * @desc    Listar clientes con paginación y filtros
 */
router.get('/customers', customerController.getAllCustomers);

/**
 * @route   GET /api/v1/customers/:customerId
 * @desc    Detalle de un cliente
 */
router.get('/customers/:customerId', customerController.getCustomerById);

/**
 * @route   GET /api/v1/customers/:customerId/orders
 * @desc    Pedidos asociados a un cliente
 */
router.get('/customers/:customerId/orders', customerController.getOrdersByCustomer);

/**
 * @route   POST /api/v1/customers
 * @desc    Crear un cliente
 */
router.post('/customers', customerController.createCustomer);

/**
 * @route   PATCH /api/v1/customers/:customerId
 * @desc    Actualizar parcialmente un cliente
 */
router.patch('/customers/:customerId', customerController.patchCustomer);

export default router;
