import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const allProducts = [
  { name: "Glow Foundation", price: "$42", image: "/products/foundation.jpg", category: "Makeup" },
  { name: "Brown Foundation", price: "$30", image: "/products/foundation.jpg", category: "Makeup" },
  { name: "Silk Shampoo", price: "$28", image: "/products/shampoo.jpg", category: "Haircare" },
  { name: "Aloe Face Cream", price: "$36", image: "/products/facecream.jpg", category: "Skincare" },
  { name: "Essential Perfume", price: "$75", image: "/products/perfume2.jpg", category: "Fragrance" },
  // Add more products as needed
];


const ProductsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Skincare", "Haircare", "Makeup", "Fragrance"];

    const filteredProducts = allProducts.filter((product) => {
        const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });


  return (
    <div className="relative flex flex-col md:flex-row min-h-screen p-6 bg-[#fdfaf7]">
      {/* Sidebar Filters */}
      <aside className="md:sticky top-0 md:h-dvh md:w-1/4 mb-6 md:mb-0 md:pr-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full text-left justify-start"
            >
              {category}
            </Button>
          ))}
        </div>
      </aside>

      {/* Product Listing */}
      <main className="md:w-3/4">
        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full w-full"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <Card key={index} className="rounded-xl overflow-hidden shadow">
              <CardContent className="p-0">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
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
