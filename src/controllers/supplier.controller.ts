import { Request, Response } from 'express';
import { SupplierService } from '../services/supplier.service.js';

interface SupplierParams {
    supplierId?: string;
}

export class SupplierController {
    constructor(private supplierService: SupplierService) {}

    getAllSuppliers = async (req: Request, res: Response) => {
        try {
            const { page, limit, country, search } = req.query as Record<string, string>;
            const result = await this.supplierService.getAllSuppliers({
                page: page ? parseInt(page) : undefined,
                limit: limit ? parseInt(limit) : undefined,
                country,
                search,
            });
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getSupplierById = async (req: Request<SupplierParams>, res: Response) => {
        try {
            const supplier = await this.supplierService.getSupplierById(
                parseInt(req.params.supplierId!)
            );
            if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
            res.json(supplier);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getProductsBySupplier = async (req: Request<SupplierParams>, res: Response) => {
        try {
            const products = await this.supplierService.getProductsBySupplier(
                parseInt(req.params.supplierId!)
            );
            res.json(products);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    createSupplier = async (req: Request, res: Response) => {
        try {
            const { companyName, contactName, contactTitle, city, country, phone, fax } = req.body;
            if (!companyName || !contactName || !city || !country || !phone) {
                return res.status(400).json({
                    message: 'companyName, contactName, city, country and phone are required',
                });
            }
            const newSupplier = await this.supplierService.createSupplier({
                companyName,
                contactName,
                contactTitle: contactTitle ?? '',
                city,
                country,
                phone,
                fax: fax ?? null,
            });
            res.status(201).json(newSupplier);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    patchSupplier = async (req: Request<SupplierParams>, res: Response) => {
        try {
            const updated = await this.supplierService.patchSupplier(
                parseInt(req.params.supplierId!),
                req.body
            );
            if (!updated) return res.status(404).json({ message: 'Supplier not found' });
            res.json(updated);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}
