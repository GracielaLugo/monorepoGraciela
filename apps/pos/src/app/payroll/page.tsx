import { getEmployees, getPayrollHistory } from '@repo/service-payroll';

export default async function PayrollPage() {
    const employees = await getEmployees();
    const payroll = await getPayrollHistory();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-6">Employees</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {employees.map(e => (
                        <div key={e.id} className="bg-white p-4 rounded shadow">
                            <h3 className="font-bold text-lg">{e.name}</h3>
                            <p className="text-gray-600">{e.role}</p>
                            <p className="text-gray-600">${e.hourly_rate}/hr</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Payroll History</h2>
                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {payroll.map(p => (
                                <tr key={p.id}>
                                    <td className="px-6 py-4">{new Date(p.paid_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{(p as any).employees?.name || p.employee_id}</td>
                                    <td className="px-6 py-4 font-bold">${p.total_paid}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
