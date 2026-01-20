import { supabase, Sale, SaleItem } from '@repo/database';

export const createSale = async (items: SaleItem[], paymentMethod: string): Promise<Sale> => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 1. Create Sale Record
    const { data: saleData, error: saleError } = await supabase
        .from('sales')
        .insert({ total, payment_method: paymentMethod })
        .select()
        .single();

    if (saleError) throw saleError;

    // 2. Create Sale Items
    const itemsWithSaleId = items.map(item => ({
        sale_id: saleData.id,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        price: item.price,
        name: item.name
    }));

    const { error: itemsError } = await supabase.from('sale_items').insert(itemsWithSaleId);
    if (itemsError) throw itemsError;

    return {
        ...saleData,
        items
    };
};

export const getSalesHistory = async (): Promise<Sale[]> => {
    const { data, error } = await supabase
        .from('sales')
        .select('*, items:sale_items(*)')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
};
