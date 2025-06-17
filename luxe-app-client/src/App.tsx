import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import MainLayout from "./layouts/MainLayout"
import ProductDetailsPage from "./pages/ProductDetailsPage"

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>}/>

            <Route element={<MainLayout/>}>
              <Route path="/products" element={<ProductDetailsPage/>}/>
              {/* <Route path="/products" element={<ProductsPage/>}/> */}
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
