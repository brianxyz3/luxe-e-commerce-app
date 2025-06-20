import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

    const types = ["All", "Serum", "Cream", "Perfume", "Body Mist", "Scrub", "Wash", "Soap"];

    const filteredProducts = allProducts.filter((product) => {
      const matchType = selectedType === "All" || product.type === selectedType;
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredProducts.map((product, index) => (
            <Card key={index} className="rounded-xl overflow-hidden shadow">
              <CardContent className="p-0">
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                  <p className="text-amber-600 font-semibold">{product.price}</p>
                  <Button variant="ghost" className="mt-2 w-full text-sm border border-amber-400">
                    Quick Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ProductsPage;
