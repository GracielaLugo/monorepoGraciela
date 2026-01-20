import { supabase, InventoryItem } from '@repo/database';

export const getInventory = async (): Promise<InventoryItem[]> => {
    const { data, error } = await supabase.from('inventory').select('*');
    if (error) throw error;
    return data || [];
};

export const updateStock = async (id: string, quantityChange: number): Promise<InventoryItem> => {
    // This is a naive implementation. In production, use database functions or transactions for safe increments.
    const { data: current, error: fetchError } = await supabase.from('inventory').select('quantity').eq('id', id).single();

    if (fetchError) throw fetchError;

    const newQuantity = (current?.quantity || 0) + quantityChange;

    const { data, error } = await supabase
        .from('inventory')
        .update({ quantity: newQuantity })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const addInventoryItem = async (item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> => {
    const { data, error } = await supabase.from('inventory').insert(item).select().single();
    if (error) throw error;
    return data;
}
