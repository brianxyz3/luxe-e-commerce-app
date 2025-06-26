import React from "react"
import ProductCard from "./ProductCard";
import type { ProductType } from "@/controller/useProductFetch";

interface ProductsSliderProps {
  heading: string;
  productsArr: ProductType[];
}

const ProductsSlider: React.FC<ProductsSliderProps> = ({heading, productsArr}) => {
  return (
    <>
      <h4 className="text-2xl font-semibold mb-6">{heading}</h4>
      <div className="flex flex-nowrap px-1 pb-4 gap-6 overflow-x-auto">
      {productsArr.map((product) => (
        <ProductCard key={product._id} product={product}/>
      ))}
      </div>
    </>
  )
}

export default ProductsSlider