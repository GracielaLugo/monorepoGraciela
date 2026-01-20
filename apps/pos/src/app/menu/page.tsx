import { getMenu } from '@repo/service-menu';
import { addMenuItemAction, deleteMenuItemAction } from '../actions';

export default async function MenuPage() {
    const menuItems = await getMenu();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Menu Management</h1>

            <div className="bg-white p-6 rounded shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
                <form action={addMenuItemAction} className="flex gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input name="name" type="text" required className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input name="price" type="number" step="0.01" required className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input name="category" type="text" required className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border" />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Item</button>
                </form>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {menuItems.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <form action={deleteMenuItemAction.bind(null, item.id)}>
                                        <button type="submit" className="text-red-600 hover:text-red-900">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
