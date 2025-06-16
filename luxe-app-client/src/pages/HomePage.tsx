// import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User } from "lucide-react";
import { heroModelImg } from "@/assets/images";
import { Link } from "react-router";
import Footer from "@/components/Footer";
import HeaderNav from "@/components/HeaderNav";

const HomePage = () => {  
  return (
    <>
      {/* Header */}
      <HeaderNav isHome={true}/>

      {/* Hero Section */}
      <main>
        <section className="hero text-black relative overflow-hidden w-dvw bg-[#f3e4d7] h-[60dvh] lg:h-[75dvh] ">
          <div className="relative flex bg-gradient-to-b from-[#957461] to-40% to-transparent w-full h-full">
            <div className="hero_container_shadow z-10 w-2/3 h-full md:bg-[#f3e4d7] md:w-[65%]">
              <div className="flex flex-col gap-y-8 justify-center items-center h-full px-10 lg:gap-y-10">
                <div className="">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl mb-6 tracking-wider font-bold lg:mb-8">Unleash Your <br/> Inner Radiance</h1>
                  <p className="leading-5 mb-6 tracking-wider text-lg lg:text-xl lg:leading-7 lg:mb-7">Look effortlessly radiant with easy-to-apply <br/> products that save time and feel like you.</p>
                  <div className="flex flex-wrap md:flex-nowrap gap-4 font-bold items-center">
                    <Button className="bg-black text-white truncate text-base font-bold w-52 h-12"> Shop Quick Beauty Kits</Button>
                    <Button className="truncate border-2 bg-transparent hover:text-white hover:border-white text-base font-bold border-black w-52 h-12 text-black transition-all">Consult a Cosmetician</Button>
                  </div>
                </div>
                <div className="hidden md:flex gap-6 text-sm lg:text-base">
                    <div className="flex flex-col items-center text-center gap-y-1 w-28 lg:w-32">
                      <Search/>
                      <p>Safe, Clean beauty tested by dermatologists</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-y-1 w-28 lg:w-32">
                      <ShoppingCart/>
                      <p>Fast & flawless makeup made for real mornings</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-y-1 w-28 lg:w-32">
                      <User/>
                      <p>No animal testing --ever. Certified cruelty-free.</p>
                    </div>
                </div>
              </div>
            </div>
            <div className="md:absolute top-0 right-0 md:-right-4 w-full md:w-2/5 h-full">
              <img src={heroModelImg} className="w-full h-full object-cover lg:object-fill object-top" alt="" />
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 px-2 md:px-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">Best Sellers</h2>
          <div className="flex flex-nowrap gap-6 overflow-auto pb-6">
            {[1, 2, 3, 4, 5, 6,7,8].map((item) => (
              <Card key={item} className="rounded-2xl shadow hover:shadow-md min-w-[150px] md:min-w-52 w-2/5 max-w-[275px]">
                <img src={`/product${item}.jpg`} alt="Product" className="rounded-t-2xl" />
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold">Luxury Serum</h3>
                  <p className="text-amber-600 font-bold">$49</p>
                  <Button className="mt-2 bg-amber-500 hover:bg-amber-600 text-white w-full">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Products */}
        <section className="">
          <div className="flex justify-between mb-6 bg-[#f3e4d7]">
            <p className="px-1 md:px-6 text-gray-800 py-1.5 font-black">All Products</p>
            {/* <div className="flex gap-4 text-black">
              <div className="flex border border-black rounded-lg p-1">
                  <label htmlFor="sort">sort by:</label>
                <select name="sort" title="sort" id="sort" className="w-20">
                  <option value="newest">newest</option>
                  <option value="best selling">best selling</option>
                  <option value="price descending">price (high to low)</option>
                  <option value="price ascending">price (low to high)</option>
                </select>
              </div>
              <div className="flex border border-black rounded-lg p-1">
                <select name="sort" title="sort" id="sort" className="w-20">
                  <option value="newest">newest</option>
                  <option value="best selling">best selling</option>
                  <option value="price descending">price (high to low)</option>
                  <option value="price ascending">price (low to high)</option>
                </select>
              </div>
            </div> */}
          </div>
          <div className="flex flex-wrap justify-evenly px-1 md:px-6 shrink-0 gap-6 mb-10">
            {[ 11, 12, 13, 14, 15, 16, 17, 18].map((item) => (
              <Card key={item} className="rounded-2xl shadow hover:shadow-md min-w-[140px] md:min-w-52 w-2/5 max-w-[275px]">
                <img src={`/product${item}.jpg`} alt="Product" className="rounded-t-2xl" />
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold">Luxury Serum</h3>
                  <p className="text-amber-600 font-bold">$49</p>
                  <Button className="mt-2 bg-amber-500 hover:bg-amber-600 text-white w-full">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Link to='/products' className="block w-fit mx-auto mb-8 hover:font-bold text-amber-600 transition-all">VIEW ALL PRODUCTS</Link>
        </section>

        {/* Promotions Section */}
        <section className="bg-[#f3e4d7] py-10 px-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Buy 2 Get 1 Free</h2>
          <p className="mb-4">On selected haircare products. Limited time only.</p>
          <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full">Shop Offer</Button>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 px-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">Customer Love</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="p-4 rounded-2xl shadow-md">
                <p className="italic">“Absolutely obsessed with the glow this gives me!”</p>
                <p className="mt-2 font-semibold">— Jamie L.</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-white py-10 px-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Get 10% Off Your First Order</h2>
          <p className="mb-4">Sign up for our newsletter to receive exclusive offers and updates.</p>
          <div className="flex justify-center">
            <Input placeholder="Enter your email" className="max-w-md rounded-l-full" />
            <Button className="rounded-r-full bg-amber-500 hover:bg-amber-600 text-white">Subscribe</Button>
          </div>
        </section>
      </main>
      {/* Footer */}
      <Footer/>
    </>
  )
}

export default HomePage;
