import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service.js';

interface CustomerParams {
    customerId?: string;
}

export class CustomerController {
    constructor(private customerService: CustomerService) {}

    getAllCustomers = async (req: Request, res: Response) => {
        try {
            const { page, limit, city, country, search } = req.query as Record<string, string>;
            const result = await this.customerService.getAllCustomers({
                page: page ? parseInt(page) : undefined,
                limit: limit ? parseInt(limit) : undefined,
                city,
                country,
                search,
            });
            res.json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getCustomerById = async (req: Request<CustomerParams>, res: Response) => {
        try {
            const customer = await this.customerService.getCustomerById(
                parseInt(req.params.customerId!)
            );
            if (!customer) return res.status(404).json({ message: 'Customer not found' });
            res.json(customer);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getOrdersByCustomer = async (req: Request<CustomerParams>, res: Response) => {
        try {
            const orders = await this.customerService.getOrdersByCustomer(
                parseInt(req.params.customerId!)
            );
            res.json(orders);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    createCustomer = async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, city, country, phone } = req.body;
            if (!firstName || !lastName || !city || !country || !phone) {
                return res.status(400).json({ message: 'firstName, lastName, city, country and phone are required' });
            }
            const newCustomer = await this.customerService.createCustomer({
                firstName,
                lastName,
                city,
                country,
                phone,
            });
            res.status(201).json(newCustomer);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    patchCustomer = async (req: Request<CustomerParams>, res: Response) => {
        try {
            const updated = await this.customerService.patchCustomer(
                parseInt(req.params.customerId!),
                req.body
            );
            if (!updated) return res.status(404).json({ message: 'Customer not found' });
            res.json(updated);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}
