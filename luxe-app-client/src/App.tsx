import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import MainLayout from "./layouts/MainLayout"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import ShoppingCartPage from "./pages/ShoppingCartPage"
import AuthPage from "./pages/AuthPage"
import AdminDashboardPage from "./pages/AdminDashboardPage"

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
            <Route path="/admin" element={<AdminDashboardPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
