import { supabase, CustomerDB } from '@repo/database';

export const getCustomers = async (): Promise<CustomerDB[]> => {
    const { data, error } = await supabase.from('customers').select('*');
    if (error) throw error;
    return data || [];
};

export const addCustomer = async (customer: Omit<CustomerDB, 'id' | 'balance'>): Promise<CustomerDB> => {
    const { data, error } = await supabase.from('customers').insert({ ...customer, balance: 0 }).select().single();
    if (error) throw error;
    return data;
};

export const updateCustomerBalance = async (id: string, amount: number): Promise<CustomerDB> => {
    // Naive implementation. Use RPC or Transactions for safety.
    const { data: current, error: fetchError } = await supabase.from('customers').select('balance').eq('id', id).single();
    if (fetchError) throw fetchError;

    const newBalance = (current?.balance || 0) + amount;

    const { data, error } = await supabase
        .from('customers')
        .update({ balance: newBalance })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};
