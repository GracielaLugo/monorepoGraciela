import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "POS System",
  description: "Monorepo POS System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <aside className="w-64 bg-gray-900 text-white p-4 hidden md:block">
            <h1 className="text-2xl font-bold mb-8">POS System</h1>
            <nav className="space-y-2">
              <Link href="/" className="block p-2 hover:bg-gray-800 rounded">Dashboard</Link>
              <Link href="/pos" className="block p-2 hover:bg-gray-800 rounded">Point of Sale</Link>
              <Link href="/menu" className="block p-2 hover:bg-gray-800 rounded">Menu</Link>
              <Link href="/inventory" className="block p-2 hover:bg-gray-800 rounded">Inventory</Link>
              <Link href="/suppliers" className="block p-2 hover:bg-gray-800 rounded">Suppliers</Link>
              <Link href="/payroll" className="block p-2 hover:bg-gray-800 rounded">Payroll</Link>
              <Link href="/credit" className="block p-2 hover:bg-gray-800 rounded">Credit</Link>
            </nav>
          </aside>
          <main className="flex-1 overflow-auto p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
