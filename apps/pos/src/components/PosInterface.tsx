"use client";

import { useState } from "react";
import { createSaleAction } from "../app/actions";

type MenuItem = {
    id: string;
    name: string;
    price: number;
    category: string;
};

export default function PosInterface({ menuItems }: { menuItems: MenuItem[] }) {
    const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);

    const addToCart = (item: MenuItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.item.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { item, quantity: 1 }];
        });
    };

    const total = cart.reduce((sum, i) => sum + i.item.price * i.quantity, 0);

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        // Transform cart for backend
        const saleItems = cart.map(i => ({
            menu_item_id: i.item.id,
            quantity: i.quantity,
            price: i.item.price,
            name: i.item.name
        }));

        await createSaleAction(saleItems, 'CASH'); // Hardcoded 'CASH' for now
        setCart([]);
        alert('Sale Completed!');
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-100px)]">
            {/* Menu Grid */}
            <div className="flex-1 overflow-auto">
                <h2 className="text-xl font-bold mb-4">Menu</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => addToCart(item)}
                            className="p-4 bg-white rounded shadow hover:bg-blue-50 text-left transition"
                        >
                            <div className="font-semibold">{item.name}</div>
                            <div className="text-gray-500">${item.price}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Cart */}
            <div className="w-full md:w-96 bg-white p-6 rounded shadow flex flex-col">
                <h2 className="text-xl font-bold mb-4">Current Order</h2>
                <div className="flex-1 overflow-auto space-y-2">
                    {cart.map((line, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <div>
                                <div className="font-medium">{line.item.name}</div>
                                <div className="text-sm text-gray-500">${line.item.price} x {line.quantity}</div>
                            </div>
                            <div className="font-bold">${(line.item.price * line.quantity).toFixed(2)}</div>
                        </div>
                    ))}
                    {cart.length === 0 && <div className="text-gray-400 text-center py-4">Cart is empty</div>}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-xl font-bold mb-4">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0}
                        className="w-full py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 disabled:opacity-50"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
