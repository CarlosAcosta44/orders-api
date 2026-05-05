import { Request, Response } from 'express';
import { ProductService } from '../services/product.service.js';

interface ProductParams {
    productId?: string;
}

export class ProductController {
    constructor(private productService: ProductService) {}

    getAllProducts = async (req: Request, res: Response) => {
        try {
            const { page, limit, supplierId, search, discontinued } = req.query as Record<string, string>;
            const result = await this.productService.getAllProducts({
                page: page ? parseInt(page) : undefined,
                limit: limit ? parseInt(limit) : undefined,
                supplierId: supplierId ? parseInt(supplierId) : undefined,
                search,
                discontinued: discontinued !== undefined ? discontinued === 'true' : undefined,
            });
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getProductById = async (req: Request<ProductParams>, res: Response) => {
        try {
            const product = await this.productService.getProductById(
                parseInt(req.params.productId!)
            );
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json(product);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    createProduct = async (req: Request, res: Response) => {
        try {
            const { productName, supplierId, unitPrice, package: pkg, isDiscontinued } = req.body;
            if (!productName || supplierId === undefined || unitPrice === undefined || !pkg) {
                return res.status(400).json({
                    message: 'productName, supplierId, unitPrice and package are required',
                });
            }
            const newProduct = await this.productService.createProduct({
                productName,
                supplierId,
                unitPrice,
                package: pkg,
                isDiscontinued: isDiscontinued ?? false,
            });
            res.status(201).json(newProduct);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    replaceProduct = async (req: Request<ProductParams>, res: Response) => {
        try {
            const { productName, supplierId, unitPrice, package: pkg, isDiscontinued } = req.body;
            if (!productName || supplierId === undefined || unitPrice === undefined || !pkg) {
                return res.status(400).json({
                    message: 'productName, supplierId, unitPrice and package are required',
                });
            }
            const updated = await this.productService.replaceProduct(
                parseInt(req.params.productId!),
                { productName, supplierId, unitPrice, package: pkg, isDiscontinued: isDiscontinued ?? false }
            );
            if (!updated) return res.status(404).json({ message: 'Product not found' });
            res.json(updated);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    patchProduct = async (req: Request<ProductParams>, res: Response) => {
        try {
            const updated = await this.productService.patchProduct(
                parseInt(req.params.productId!),
                req.body
            );
            if (!updated) return res.status(404).json({ message: 'Product not found' });
            res.json(updated);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    deleteProduct = async (req: Request<ProductParams>, res: Response) => {
        try {
            const result = await this.productService.deleteProduct(
                parseInt(req.params.productId!)
            );
            if (result === 'not_found') return res.status(404).json({ message: 'Product not found' });
            if (result === 'conflict') {
                return res.status(409).json({
                    message: 'Product is used in orders. It has been marked as discontinued instead.',
                });
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}
