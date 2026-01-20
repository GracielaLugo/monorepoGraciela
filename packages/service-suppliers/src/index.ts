import { supabase, Supplier } from '@repo/database';

export const getSuppliers = async (): Promise<Supplier[]> => {
    const { data, error } = await supabase.from('suppliers').select('*');
    if (error) throw error;
    return data || [];
};

export const addSupplier = async (supplier: Omit<Supplier, 'id'>): Promise<Supplier> => {
    const { data, error } = await supabase.from('suppliers').insert(supplier).select().single();
    if (error) throw error;
    return data;
};

export const updateSupplier = async (id: string, updates: Partial<Supplier>): Promise<Supplier> => {
    const { data, error } = await supabase.from('suppliers').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
};

export const deleteSupplier = async (id: string): Promise<void> => {
    const { error } = await supabase.from('suppliers').delete().eq('id', id);
    if (error) throw error;
};
