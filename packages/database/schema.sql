-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Menu Items
create table menu_items (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price decimal(10,2) not null,
  category text not null,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Sales
create table sales (
  id uuid default uuid_generate_v4() primary key,
  total decimal(10,2) not null,
  payment_method text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Sale Items
create table sale_items (
  id uuid default uuid_generate_v4() primary key,
  sale_id uuid references sales(id) on delete cascade not null,
  menu_item_id uuid references menu_items(id),
  quantity integer not null,
  price decimal(10,2) not null,
  name text not null
);

-- Inventory
create table inventory (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  quantity integer default 0 not null,
  unit text default 'units',
  min_quantity integer default 10,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Suppliers
create table suppliers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  contact_name text,
  phone text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Employees
create table employees (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  hourly_rate decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Payroll
create table payroll (
  id uuid default uuid_generate_v4() primary key,
  employee_id uuid references employees(id) not null,
  period_start date not null,
  period_end date not null,
  hours_worked decimal(10,2) not null,
  total_paid decimal(10,2) not null,
  paid_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Customers (Credit)
create table customers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text,
  balance decimal(10,2) default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
