import Link from "next/link";

export default function Home() {
  const links = [
    { name: "Point of Sale", href: "/pos", color: "bg-blue-500" },
    { name: "Menu Management", href: "/menu", color: "bg-green-500" },
    { name: "Inventory", href: "/inventory", color: "bg-yellow-500" },
    { name: "Suppliers", href: "/suppliers", color: "bg-purple-500" },
    { name: "Payroll", href: "/payroll", color: "bg-red-500" },
    { name: "Credit", href: "/credit", color: "bg-indigo-500" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Welcome to POS System</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block p-6 rounded-lg shadow-lg text-white font-semibold text-xl ${link.color} hover:opacity-90 transition`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
