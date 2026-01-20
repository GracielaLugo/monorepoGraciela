import { getInventory } from '@repo/service-inventory';
import { updateStockAction } from '../actions';

export default async function InventoryPage() {
    const inventory = await getInventory();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Inventory</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inventory.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-4">Quantity: <span className="font-mono text-lg">{item.quantity}</span> {item.unit}</p>

                        <div className="flex gap-2">
                            <form action={updateStockAction.bind(null, item.id, 1)}>
                                <button className="bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200">+</button>
                            </form>
                            <form action={updateStockAction.bind(null, item.id, -1)}>
                                <button className="bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200">-</button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
