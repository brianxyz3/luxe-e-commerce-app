import { Input } from "@/components/ui/input";
import { Boxes, LogOut, MoonStar, Plus, Search, ShoppingCart, Sun, User, UserCheck } from "lucide-react";
import { heroModelImg } from "@/assets/images";
import { Link, NavLink, useNavigate } from "react-router";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import { signOut } from "@/controller/auth";
import { toast } from "react-toastify";

gsap.registerPlugin(useGSAP);

const HeaderNav: React.FC<{isHome?: boolean}>  = ({isHome = false}) => {

  const [showNavBar, setShowNavBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {theme, toggleTheme} = useTheme();
  const navBtn = useRef(null);
  const {userLoggedIn, handleLogInState} = useAuth();
  const {cart} = useCart();
  const navigate = useNavigate();

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
      // navBtnTL.timeScale(1)
      // navBtnTL.reverse()
    }
    setShowNavBar(prevState => !prevState)
  });

  return (
    <header className="dark:bg-black">
      <section className="fixed backdrop-blur-md bg-white/15 dark:bg-amber-900/15  w-full md:sticky z-50 top-0 shadow-sm p-4 flex items-center justify-between">
        <div ref={navBtn} className="md:hidden">
          <button title="navigation icon" type="button" className={`navBtn ease-linear overflow-hidden flex p-[3px] size-8 justify-center items-center md:hidden border border-transparent rounded-md hover:border-gray-700 `}
            onClick={toggleNavBar}>
            <div className={`w-full strokeBox flex flex-col gap-1`}>
              <div className={`stroke1 w-6 h-1 bg-gray-700 dark:bg-white rounded-lg ease-linear`}></div>
              <div className={`stroke2 w-6 h-1 bg-black rounded-lg ease-linear`}></div>
              <div className={`stroke3 w-6 h-1 bg-gray-700 dark:bg-white rounded-lg ease-linear`}></div>
            </div>
          </button>
        </div>

        <NavLink to="/" className="text-3xl text-right sm:text-left w-1/3 sm:w-fit font-bold mx-auto md:m-0 text-amber-600">LUXÉ</NavLink>
        
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
        <div className="flex items-center  text-gray-700 dark:text-white gap-3 md:gap-4">
          <button
            onClick={() => {
              if(theme == "light") return toggleTheme("dark");
              toggleTheme("light");
            }}
            title="toggle theme" type="button" className="relative">
            <MoonStar className={`${theme != "dark" && "opacity-0"} size-5 md:size-7 aspect-square duration-300 fixed`}/>
            <Sun className={`${theme == "dark" && "opacity-0"} size-5 md:size-7 aspect-square duration-300`}/>
          </button>
          <Link to="/shoppingCart"
            className="relative">
              {cart.length > 0 && <div className="w-3 md:w-4 aspect-square absolute -top-3 -z-10 right-0.5 md:right-1 rounded-full font-bold text-sm flex items-center justify-center"><Boxes className="fill-amber-500 dark:stroke-amber-600 dark:fill-transparent"/></div>}
              <ShoppingCart className="size-5 md:size-7 aspect-square" />
          </Link>
          <Link className={`${userLoggedIn && "hidden"}`} to="/auth"><User className="size-5 md:size-7 aspect-square" /></Link>
          <Link className={`${!userLoggedIn && "hidden"}`} to="/dashboard"><UserCheck className="size-5 md:size-7 aspect-square" /></Link>
          {/* <button title="Log out" type="button" className={`${!userLoggedIn && "hidden"}`} 
          onClick={async () => {
            const {message, status} = await signOut();
            if(status == 200) {
              handleLogInState(false);
              toast.success(message);
            }
            if(status != 200) toast.error(message);
          }}><LogOut className="size-5 md:size-7 aspect-square" /></button> */}
        </div>
      </section>

      {/* Navigation Menu */}
      <nav className="hidden bg-cream-darker md:px-6 py-2 text-sm font-medium text-gray-800 md:flex justify-center gap-5">
      <NavLink to="/" key={"home"} className="hover:text-amber-300 text-nowrap transition-colors">Home</NavLink>
      <NavLink to="/products" key={"shop-all"} className="hover:text-amber-300 text-nowrap transition-colors">Shop All</NavLink>
        {["Skin-care", "Hair-care", "Makeup", "Fragrance", "Gifts", "Sale"].map((item) => (
          <NavLink to={`/products/search?category=${item.toLocaleLowerCase()}`} key={item} className="hover:text-amber-300 text-nowrap transition-colors">{item}</NavLink>
        ))}
        <NavLink to="/about" key={"about"} className="hover:text-amber-300 text-nowrap transition-colors">About Us</NavLink>
      </nav>

      {/* Mobile Navigation Menu */} 
      <section className={`grid grid-cols-1 h-dvh w-dvw md:hidden bg-white dark:bg-stone-600 overflow-hidden z-20 fixed inset-0 duration-500 ease-in ${!showNavBar && "-left-full"}`}>
        <div className="w-4/5 mx-auto mt-[5rem] flex md:hidden">
          <div className="relative flex w-full rounded-lg bg-gray-300">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-lg dark:text-black"
            />
            <Search className="absolute top-2.5 left-3 w-5 h-5 text-gray-500 dark:text-cream-darker" />
          </div>
        </div>
        <nav className="pb-2 ps-6 dark:bg-stone-600">
          <div className="text-cream-darker dark:text-cream-light overflow-auto text-xl font-bold flex gap-5 px-2.5 ms-0.5 py-4">
            {["Skin-care", "Hair-care", "Makeup", "Fragrance", "Gifts", "Sale"].map((item) => (
              <NavLink to={`/products/search?category=${item.toLocaleLowerCase()}`} key={item} onClick={toggleNavBar} className="hover:text-amber-300 scale-y-125 text-nowrap transition-colors">{item}</NavLink>
            ))}
            <NavLink to="/about" onClick={toggleNavBar} key={"about"} className="hover:text-amber-300 text-nowrap transition-colors">About Us</NavLink>
          </div>
          <Link to="/products" onClick={toggleNavBar} className="underline">shop all products</Link>
        </nav>
        <div className="pb-6 px-6 overflow-auto dark:bg-gradient-to-b from-stone-700 to-15% to-black">
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => (
              <Link to="/" key={idx} className="flex text-[#7f6251] items-center gap-3 py-2.5 border-b border-cream-dbg-cream-darker">
                <img src={heroModelImg} alt="" className="w-16 aspect-square rounded-md" />
                <div className="flex items-baseline gap-x-0.5">
                  <p className="truncate">item- {item}</p>
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