import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<HomePage/>}/>

            <Route element={<MainLayout/>}>
              <Route path='/products' element={<ProductsPage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
