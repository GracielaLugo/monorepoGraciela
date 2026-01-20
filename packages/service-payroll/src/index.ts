import { supabase, Employee, PayrollRecord } from '@repo/database';

export const getEmployees = async (): Promise<Employee[]> => {
    const { data, error } = await supabase.from('employees').select('*');
    if (error) throw error;
    return data || [];
};

export const addEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
    const { data, error } = await supabase.from('employees').insert(employee).select().single();
    if (error) throw error;
    return data;
};

export const createPayrollRecord = async (record: Omit<PayrollRecord, 'id' | 'paid_at'>): Promise<PayrollRecord> => {
    const { data, error } = await supabase
        .from('payroll')
        .insert({ ...record, paid_at: new Date().toISOString() })
        .select()
        .single();
    if (error) throw error;
    return data;
};

export const getPayrollHistory = async (): Promise<PayrollRecord[]> => {
    const { data, error } = await supabase.from('payroll').select('*, employees(name)');
    if (error) throw error;
    return data || [];
};
