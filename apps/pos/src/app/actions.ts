'use server'

import { addMenuItem, deleteMenuItem, updateMenuItem } from '@repo/service-menu';
import { createSale } from '@repo/service-sales';
import { updateStock, addInventoryItem } from '@repo/service-inventory';
import { addSupplier, deleteSupplier, updateSupplier } from '@repo/service-suppliers';
import { addEmployee, createPayrollRecord } from '@repo/service-payroll';
import { addCustomer, updateCustomerBalance } from '@repo/service-credit';
import { revalidatePath } from 'next/cache';

// Menu
export async function addMenuItemAction(formData: FormData) {
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;

    await addMenuItem({ name, price, category });
    revalidatePath('/menu');
}

export async function deleteMenuItemAction(id: string) {
    await deleteMenuItem(id);
    revalidatePath('/menu');
}

// Sales
export async function createSaleAction(items: any[], paymentMethod: string) {
    await createSale(items, paymentMethod);
    revalidatePath('/pos');
    revalidatePath('/inventory'); // Stock might change
}

// Inventory
export async function updateStockAction(id: string, quantity: number) {
    await updateStock(id, quantity);
    revalidatePath('/inventory');
}

// Suppliers, Payroll, Credit... (omitted for brevity, can be added as needed)
