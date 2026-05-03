export interface Supplier {
    id: number;
    companyName: string;
    contactName: string;
    contactTitle: string;
    city: string;
    country: string;
    phone: string;
    fax: string | null;
}

export interface Product {
    id: number;
    productName: string;
    unitPrice: number;
    package: string;
    isDiscontinued: boolean;
    supplier?: Supplier;
}

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    phone: string;
}

export interface OrderItem {
    id: number;
    product: Product;
    unitPrice: number;
    quantity: number;
}

export interface Order {
    id: number;
    orderNumber: string;
    orderDate: string;
    totalAmount: number;
    customer: Customer;
    items: OrderItem[];
}
