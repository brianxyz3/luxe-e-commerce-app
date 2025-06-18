import Footer from "@/components/Footer";
import HeaderNav from "@/components/HeaderNav"
import { Outlet } from "react-router"


const MainLayout = () => {
  return (
    <>
      <HeaderNav/>
      <div className="mt-16 md:mt-0">
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}

export default MainLayout;