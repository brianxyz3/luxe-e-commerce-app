import { NavLink, Outlet } from 'react-router'

const AdminLayout = () => {
  return (
    <div className="bg-cream-lighter flex flex-wrap md:flex-nowrap min-h-screen dark:bg-stone-700">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r shadow-sm p-3 md:p-6 md:block">
        <h2 className="text-2xl font-bold mb-8">Luxe Admin</h2>
        <nav className="flex justify-evenly md:justify-start md:flex-col gap-x-2 gap-y-4 text-sm font-medium">
          <NavLink to="/admin" className="hover:text-amber-600">Dashboard</NavLink>
          <NavLink to="/admin/products" className="hover:text-amber-600">Products</NavLink>
          <NavLink to="/admin/orders" className="hover:text-amber-600">Orders</NavLink>
          <NavLink to="/admin/users" className="hover:text-amber-600">Users</NavLink>
          {/* <NavLink to="#" className="hover:text-amber-600">Settings</NavLink> */}
        </nav>
      </aside>

      <Outlet/>
      </div>
  )
}

export default AdminLayout