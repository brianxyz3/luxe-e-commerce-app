import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/userPages/HomePage"
import ProductsPage from "./pages/userPages/ProductsPage"
import MainLayout from "./layouts/MainLayout"
import ProductDetailsPage from "./pages/userPages/ProductDetailsPage"
import ShoppingCartPage from "./pages/userPages/ShoppingCartPage"
import AuthPage from "./pages/userPages/AuthPage"
import AdminDashboardPage from "./pages/adminPages/AdminDashboardPage"
import AdminLayout from "./layouts/AdminLayout"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>

          <Route element={<MainLayout/>}>
            <Route path="/products/search?" element={<ProductsPage/>}/>
            <Route path="/products/:productId" element={<ProductDetailsPage/>}/>
            <Route path="/shoppingCart" element={<ShoppingCartPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route element={<AdminLayout/>}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage/>}/>
              <Route path="/admin/products" element={<AdminDashboardPage/>}/>
              <Route path="/admin/orders" element={<AdminDashboardPage/>}/>
              <Route path="/admin/users" element={<AdminDashboardPage/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
