import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardChart from "@/components/DashboardChart";

const stats = [
  { label: "Total Users", value: 3200 },
  { label: "Total Products", value: 148 },
  { label: "Total Orders", value: 837 },
  { label: "Revenue", value: "₦2,470,000" },
];

const recentOrders = [
  { id: "ORD001", customer: "Chika Obi", amount: "₦14,500", status: "Shipped" },
  { id: "ORD002", customer: "Alex Bello", amount: "₦7,200", status: "Processing" },
  { id: "ORD003", customer: "Maryyyyyyyyyyyyyyyy John", amount: "₦21,000", status: "Delivered" },
];

const AdminDashboardPage = () => {
  return (
    <div className="bg-cream-lighter flex flex-wrap md:flex-nowrap min-h-screen dark:bg-stone-700">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r shadow-sm p-3 md:p-6 md:block">
        <h2 className="text-2xl font-bold mb-8">Luxe Admin</h2>
        <nav className="flex justify-evenly md:justify-start md:flex-col gap-x-2 gap-y-4 text-sm font-medium">
          <a href="#" className="hover:text-amber-600">Dashboard</a>
          <a href="#" className="hover:text-amber-600">Products</a>
          <a href="#" className="hover:text-amber-600">Orders</a>
          <a href="#" className="hover:text-amber-600">Users</a>
          <a href="#" className="hover:text-amber-600">Settings</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
          <Button className="bg-black text-white px-4 py-2 rounded-full">Logout</Button>
        </header>

        {/* Stats */}
        <section className="grid md:grid-rows-2 gap-8 mb-10">
            <div  className="h-fit grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className={`${index == 0 && "bg-gradient-to-tr from-amber-200 via-amber-600 to-black dark:from-black dark:via-stone-900 dark:to-amber-600"} dark:bg-black shadow rounded-xl`}>
                    <CardContent className="p-4">
                        <h5 className="text- dark:text-gray-400  text-gray-600">{stat.label}</h5>
                        <h3 className="text-xl font-bold">{stat.value}</h3>
                    </CardContent>
                    </Card>
                ))}
            </div>
            <DashboardChart/>
        </section>

        {/* Recent Orders */}
        <section className="grid grid-cols-1 overflow-auto dark:bg-black shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Recent Orders</h2>
          <table className="min-w-[350px] w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-100">
                  <td className="py-2">{order.id}</td>
                  <td className="max-w-24 sm:max-w-fit truncate">{order.customer}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "Delivered" ? "bg-green-200 text-green-800" :
                      order.status === "Shipped" ? "bg-blue-200 text-blue-800" :
                      "bg-yellow-200 text-yellow-800"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboardPage;