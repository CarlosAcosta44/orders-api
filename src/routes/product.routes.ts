import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { ProductService } from '../services/product.service.js';
import { OrderRepository } from '../repositories/order.repository.js';

const router = Router();

const orderRepository = new OrderRepository();
const productService = new ProductService(orderRepository);
const productController = new ProductController(productService);

/**
 * @route   GET /api/v1/products
 * @desc    Listar productos
 */
router.get('/products', productController.getAllProducts);

/**
 * @route   GET /api/v1/products/:productId
 * @desc    Detalle de un producto
 */
router.get('/products/:productId', productController.getProductById);

/**
 * @route   POST /api/v1/products
 * @desc    Crear producto
 */
router.post('/products', productController.createProduct);

/**
 * @route   PUT /api/v1/products/:productId
 * @desc    Reemplazar completamente el producto
 */
router.put('/products/:productId', productController.replaceProduct);

/**
 * @route   PATCH /api/v1/products/:productId
 * @desc    Actualizar parcialmente el producto
 */
router.patch('/products/:productId', productController.patchProduct);

/**
 * @route   DELETE /api/v1/products/:productId
 * @desc    Eliminar producto (o marcar discontinuado)
 */
router.delete('/products/:productId', productController.deleteProduct);

export default router;
