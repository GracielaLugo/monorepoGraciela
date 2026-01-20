import { supabase, MenuItem } from '@repo/database';

export const getMenu = async (): Promise<MenuItem[]> => {
  const { data, error } = await supabase.from('menu_items').select('*');
  if (error) throw error;
  return data || [];
};

export const addMenuItem = async (item: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
  const { data, error } = await supabase.from('menu_items').insert(item).select().single();
  if (error) throw error;
  return data;
};

export const updateMenuItem = async (id: string, updates: Partial<MenuItem>): Promise<MenuItem> => {
  const { data, error } = await supabase.from('menu_items').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  const { error } = await supabase.from('menu_items').delete().eq('id', id);
  if (error) throw error;
};
