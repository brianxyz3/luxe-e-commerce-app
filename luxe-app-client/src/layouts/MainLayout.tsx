import Footer from "@/components/Footer";
import HeaderNav from "@/components/HeaderNav"
import { Outlet } from "react-router"


const MainLayout = () => {
  return (
    <>
      <HeaderNav/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default MainLayout;