import { Input } from "@/components/ui/input";
import { Plus, Search, ShoppingCart, User } from "lucide-react";
import { heroModelImg } from "@/assets/images";
import { Link } from "react-router";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const HeaderNav: React.FC<{isHome?: boolean}>  = ({isHome = false}) => {

    const [showNavBar, setShowNavBar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
  const navBtn = useRef(null);

  const navBtnTL = gsap.timeline({
    defaults: {
      duration: .3
    }
  });
  const {contextSafe} = useGSAP({scope: navBtn});


  const toggleNavBar = contextSafe(() => {
    window.document.body.classList.toggle("disable_scroll");
    if(!showNavBar) {
      navBtnTL.add([
        gsap.to(".navBtn", {rotate: "90deg"}),
      ])
      .add([
        gsap.to(".stroke2", {backgroundColor:"#e17100"}),
        gsap.to(".stroke2", {translateX:"-40px", delay: .3}),
      ])
      .add([
        gsap.to(".strokeBox", {marginRight: "4px", gap: "0px"}),
        gsap.to(".stroke1", {width:"28px", transformOrigin: "center", rotate: "-45deg"}),
        gsap.to(".stroke3", {width:"28px", transformOrigin: "center", rotate: "45deg", marginTop: "-8px"}),
      ])
    } else {
      navBtnTL.add([
        gsap.to(".stroke1", {width:"24px", transformOrigin: "center", rotate: "0deg"}),
        gsap.to(".stroke3", {width:"24px", transformOrigin: "center", rotate: "0deg", marginTop: "0px"}),
        gsap.to(".strokeBox", {marginRight: "0px", gap: "4px"}),
      ])
      .add([
        gsap.to(".stroke2", {backgroundColor:"black", delay: .3}),
        gsap.to(".stroke2", {translateX:"0px"}),
      ])
      .add([
        gsap.to(".navBtn", {rotate: "0deg"}),
      ])
    }
    setShowNavBar(prevState => !prevState)
  });


  return (
    <header>
      <section className="sticky z-50 top-0 bg-white shadow-sm p-4 flex items-center justify-between">
        <div ref={navBtn} className="md:hidden">
          <button title="navigation icon" type="button" className={`navBtn ease-linear overflow-hidden flex p-[3px] size-8 justify-center items-center md:hidden border border-transparent rounded-md hover:border-gray-700 `}
            onClick={toggleNavBar}>
            <div className={`w-full strokeBox flex flex-col gap-1`}>
              <div className={`stroke1 w-6 h-1 bg-gray-700 rounded-lg ease-linear`}></div>
              <div className={`stroke2 w-6 h-1 bg-black rounded-lg ease-linear`}></div>
              <div className={`stroke3 w-6 h-1 bg-gray-700 rounded-lg ease-linear`}></div>
            </div>
          </button>
        </div>

        <Link to="/" className="text-2xl font-bold mx-auto md:m-0 text-amber-600">LUXÉ</Link>
        
        {isHome && <div className="w-1/2 hidden md:flex">
          <div className="relative flex w-full">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full w-full"
            />
            <Search className="absolute top-2.5 left-3 w-5 h-5 text-gray-500" />
          </div>
        </div>}
        <div className="flex items-center gap-4">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          <User className="w-6 h-6 text-gray-700" />
        </div>
      </section>

      {/* Navigation Menu */}
      <nav className="hidden bg-[#957461] md:px-6 py-2 text-sm font-medium text-gray-800 md:flex justify-center gap-5">
        {['Home', 'Shop All', 'Skincare', 'Haircare', 'Makeup', 'Fragrance', 'Gifts', 'Sale', 'About Us'].map((item) => (
          <Link to="/" key={item} className="hover:text-amber-300 text-nowrap transition-colors">{item}</Link>
        ))}
      </nav>

      {/* Mobile Navigation Menu */}
      
      <section className={`grid grid-cols-1 h-dvh w-dvw md:hidden bg-white overflow-hidden z-20 fixed inset-0 duration-500 ease-in ${!showNavBar && "-left-full"}`}>
        <div className="w-4/5 mx-auto mt-[5rem] flex md:hidden">
          <div className="relative flex w-full rounded-lg bg-gray-300">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-lg"
            />
            <Search className="absolute top-2.5 left-3 w-5 h-5 text-gray-500" />
          </div>
        </div>
        <nav className="pb-2 ps-6">
          <div className="text-[#957461] overflow-auto text-xl font-bold flex gap-5 px-2.5 ms-0.5 py-4">
            {['Skincare', 'Haircare', 'Makeup', 'Fragrance', 'Gifts', 'Sale', 'About Us'].map((item) => (
              <Link to="/" key={item} className="hover:text-amber-300 scale-y-125 text-nowrap transition-colors">{item}</Link>
            ))}
          </div>
          <Link to="/products" className="underline">shop all products</Link>
        </nav>
        <div className="pb-6 px-6 overflow-auto">
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => (
              <Link to="/" key={idx} className="flex text-[#7f6251] items-center gap-3 py-2.5 border-b border-[#957461]">
                <img src={heroModelImg} alt="" className="w-16 aspect-square rounded-md" />
                <div className="flex items-baseline gap-x-0.5">
                  <p>item- {item}</p>
                  <Plus className="size-3"/>
                </div>
              </Link>
            ))
          }
        </div>
      </section>
    </header>
  )
}

export default HeaderNav;