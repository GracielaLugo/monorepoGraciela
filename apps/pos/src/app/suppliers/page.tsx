import { getSuppliers } from '@repo/service-suppliers';

export default async function SuppliersPage() {
    const suppliers = await getSuppliers();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Suppliers</h1>
            <div className="bg-white rounded shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {suppliers.map((s) => (
                            <tr key={s.id}>
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{s.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{s.contact_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{s.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{s.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
