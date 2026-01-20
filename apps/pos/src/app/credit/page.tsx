import { getCustomers } from '@repo/service-credit';

export default async function CreditPage() {
    const customers = await getCustomers();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Customer Credits</h1>
            <div className="bg-white rounded shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {customers.map(c => (
                            <tr key={c.id}>
                                <td className="px-6 py-4 font-medium">{c.name}</td>
                                <td className="px-6 py-4">{c.phone}</td>
                                <td className={`px-6 py-4 font-bold ${c.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                    ${c.balance}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
