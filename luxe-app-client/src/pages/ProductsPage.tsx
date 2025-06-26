import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useProductFetch from "@/controller/useProductFetch";
import { Link } from "react-router";
import ProductCard from "@/components/ProductCard";

const allProducts = [
  { name: "Glow Foundation", price: "$42", image: "/products/foundation.jpg", type: "Serum" },
  { name: "Brown Foundation", price: "$30", image: "/products/foundation.jpg", type: "Cream" },
  { name: "Silk Shampoo", price: "$28", image: "/products/shampoo.jpg", type: "Wash" },
  { name: "Aloe Face Cream", price: "$36", image: "/products/facecream.jpg", type: "Cream" },
  { name: "Glow Foundation", price: "$42", image: "/products/foundation.jpg", type: "Scrub" },
  { name: "Brown Foundation", price: "$30", image: "/products/foundation.jpg", type: "Soap" },
  { name: "Silk Shampoo", price: "$28", image: "/products/shampoo.jpg", type: "Body Mist" },
  { name: "Aloe Face Cream", price: "$36", image: "/products/facecream.jpg", type: "Serum" },
  { name: "Essential Perfume", price: "$75", image: "/products/perfume2.jpg", type: "Perfume" },
  // Add more products as needed
];


const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [pageNumber, setPageNumber] = useState(1);

  const {productList, hasMore} = useProductFetch(pageNumber);

  const types = ["All", "Serum", "Cream", "Perfume", "Body Mist", "Scrub", "Wash", "Soap"];

  const filteredProducts = productList.filter((product) => {
    const normalizedSelectedType = selectedType.toLocaleLowerCase();
    const matchType = normalizedSelectedType === "all" || product.type === normalizedSelectedType;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });


  return (
    <div className="relative flex flex-col md:flex-row min-h-screen py-6 bg-cream-lighter dark:bg-stone-700">
      {/* Sidebar Filters */}
      <aside className="md:sticky top-0 md:h-dvh md:w-1/4 mb-10 sm:mb-6 md:mb-0 mx-6 md:pr-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="flex flex-col gap-2">
          {types.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
              className="rounded-full text-left justify-start"
            >
              {type}
            </Button>
          ))}
        </div>
      </aside>

      {/* Product Listing */}
      <main className="md:w-3/4 px-3 sm:px-6">
        {/* Search */}
        <div className="mb-10 sm:mb-6">
          <Input
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full w-full dark:bg-black dark:text-white"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 place-items-center gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} variant="ghost"/>
          ))}
        </div>
        <div className="flex mx-auto w-fit items-center gap-4 my-4">
          <Button
          disabled={pageNumber <= 1}
          onClick={() => {
            setPageNumber(prevNum => prevNum - 1)
          }}
          className="font-bold text-black dark:text-white dark:bg-cream-darker bg-cream-light">Prev</Button>
          <p className="text-xl font-black">{pageNumber}</p>
          <Button
          disabled={!hasMore}
          onClick={() => {
            setPageNumber(prevNum => prevNum + 1)
          }}
          className="font-bold text-black dark:text-white dark:bg-cream-darker bg-cream-light">Next</Button>
        </div>
      </main>
    </div>
  )
}

export default ProductsPage;
