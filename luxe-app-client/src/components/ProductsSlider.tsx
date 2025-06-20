import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProductsSliderProps {
    heading: string;
    productsArr: number[];
}

const ProductsSlider: React.FC<ProductsSliderProps> = ({heading, productsArr}) => {
  return (
    <>
        <h4 className="text-2xl font-semibold mb-6">{heading}</h4>
        <div className="flex flex-nowrap px-1 pb-4 gap-6 overflow-x-auto">
        {productsArr.map((product) => (
            <Card key={product} className="rounded-2xl shadow hover:shadow-md min-w-[150px] md:min-w-52 w-2/5 max-w-[275px]">
            <img src={`/product${product}.jpg`} alt="Product" className="rounded-t-2xl" />
            <CardContent className="p-4 text-center">
                <h3 className="font-semibold">Luxury Serum</h3>
                <p className="text-amber-600 font-bold">$49</p>
                <Button className="mt-2 bg-amber-500 hover:bg-amber-600 text-white w-full">Add to Cart</Button>
            </CardContent>
            </Card>
        ))}
        </div>
    </>
  )
}

export default ProductsSlider