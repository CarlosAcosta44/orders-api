import { Router } from 'express';
import { SupplierController } from '../controllers/supplier.controller.js';
import { SupplierService } from '../services/supplier.service.js';
import { OrderRepository } from '../repositories/order.repository.js';

const router = Router();

const orderRepository = new OrderRepository();
const supplierService = new SupplierService(orderRepository);
const supplierController = new SupplierController(supplierService);

/**
 * @route   GET /api/v1/suppliers
 * @desc    Listar proveedores con filtros y paginación
 */
router.get('/suppliers', supplierController.getAllSuppliers);

/**
 * @route   GET /api/v1/suppliers/:supplierId
 * @desc    Detalle de un proveedor
 */
router.get('/suppliers/:supplierId', supplierController.getSupplierById);

/**
 * @route   GET /api/v1/suppliers/:supplierId/products
 * @desc    Listar productos de un proveedor
 */
router.get('/suppliers/:supplierId/products', supplierController.getProductsBySupplier);

/**
 * @route   POST /api/v1/suppliers
 * @desc    Crear un proveedor
 */
router.post('/suppliers', supplierController.createSupplier);

/**
 * @route   PATCH /api/v1/suppliers/:supplierId
 * @desc    Actualizar parcialmente un proveedor
 */
router.patch('/suppliers/:supplierId', supplierController.patchSupplier);

export default router;
