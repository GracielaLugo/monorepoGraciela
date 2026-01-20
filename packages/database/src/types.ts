export type MenuItem = {
    id: string;
    name: string;
    price: number;
    category: string;
    description?: string;
    image_url?: string;
};

export type Sale = {
    id: string;
    created_at: string;
    total: number;
    items: SaleItem[];
    payment_method: string;
};

export type SaleItem = {
    menu_item_id: string;
    quantity: number;
    price: number;
    name: string;
};

export type InventoryItem = {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    min_quantity: number;
};

export type Supplier = {
    id: string;
    name: string;
    contact_name: string;
    phone: string;
    email: string;
};

export type Employee = {
    id: string;
    name: string;
    role: string;
    hourly_rate: number;
};

export type PayrollRecord = {
    id: string;
    employee_id: string;
    period_start: string;
    period_end: string;
    hours_worked: number;
    total_paid: number;
    paid_at: string;
};

export type CustomerDB = {
    id: string;
    name: string;
    phone: string;
    balance: number;
};
