import { heroModelImg, productImg1, productImg2, productImg3, productImg4, productImg5 } from "@/assets/images"
import { Button } from "@/components/ui/button"

import { Minus, Plus, Star } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router"

const ProductDetailsPage = () => {

    const [showMore, setShowMore] = useState(false);
    const [quantity, setQuantity] = useState(1);

  return (
    <main className="px-2 sm:px-6 lg:px-12 pt-4 bg-[#f3e4d7]">
        {/* Full Product Detail */}
        <section className="bg-white px-3 py-6 sm:p-6 grid grid-cols-1 md:grid-cols-10 lg:grid-cols-11 gap-y-12 lg:gap-6 mb-8">
            <div className="w-full md:col-span-10 lg:col-span-3 xl:col-span-4 place-self-center h-full">

                {/* Product Image(s) */}
                <div className="">
                    <img src={heroModelImg} className="w-60 mx-auto" alt="" />
                    <div className="flex gap-3 mt-4 h-20 w-full overflow-scroll flex-nowrap justify-center">
                        <img src={productImg1} className="min-w-20" alt="" />
                        <img src={productImg3} className="min-w-20" alt="" />
                        <img src={productImg2} className="min-w-20" alt="" />
                        <img src={productImg3} className="min-w-20" alt="" />
                        <img src={productImg4} className="min-w-20" alt="" />
                    </div>
                </div>
            </div>

            {/* Product Title and Description */}
            <div className="md:col-span-6 lg:col-span-4 lg:pl-2 xl:pr-4">
                <h3 className="text-3xl tracking-wider font-bold mb-3">Product Name</h3>
                <p className="text-xl font-bold mb-3"># 2000</p>
                <h4 className="text-lg font-bold border-b border-red-600 w-fit mb-2 pb-1">About Item</h4>
                <div className="flex gap-x-6 mb-1 flex-wrap md:flex-nowrap">
                    <div className="flex gap-x-1">
                        <p className="text-gray-600">Brand:</p>
                        <p>Brand Name</p>
                    </div>
                    <div className="flex gap-x-1">
                        <p className="text-gray-600">Type:</p>
                        <p>Type</p>
                    </div>
                </div>
                <div className="flex gap-x-6 mb-3 flex-wrap md:flex-nowrap">
                    <div className="flex gap-x-1">
                        <p className="text-gray-600">Category:</p>
                        <p>Category Name</p>
                    </div>
                    <div className="flex gap-x-1">
                        <p className="text-gray-600">weight:</p>
                        <p>10g</p>
                    </div>
                </div>
                <p className="flex items-center my-3"><Star/> 4.9 Ratings * 2.3+ Reviews</p>

                <div className="product_description_container h-44 overflow-auto">
                    <button 
                        title="toggle view more" 
                        type="button" 
                        className="flex items-center gap-2 font-bold"
                        onClick={() => (setShowMore(prevVal => !prevVal))}
                        >
                        Description
                        <div className="relative">
                            <div className={`${showMore && "rotate-90"} h-0.5 w-2.5 bg-black absolute inset-0 origin-center duration-300`}></div>
                            <div className="h-0.5 w-2.5 bg-black absolute inset-0"></div>
                        </div>
                    </button>
                    <div className="details">
                        <div className={`${showMore && "open"} overflow-hidden leading-5`}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid reiciendis sit labore fugiat? Nisi recusandae corrupti molestias laudantium voluptatum suscipit quas impedit tenetur eum voluptate temporibus quisquam maiores odit sunt obcaecati, aspernatur consequatur at nobis itaque assumenda? Soluta possimus deserunt, deleniti consequatur libero eveniet cupiditate quisquam. Cum id iste unde!
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Product Section */}
            <div className="md:col-span-4 xl:col-span-3 h-full px-1 sm:px-3">
                <h2 className="text-2xl text-center font-bold mb-4">Set Order</h2>
                <div className="flex gap-x-3 items-center mb-4">
                    <div className="border-[12px] border-gray-400 rounded-2xl w-2/5 h-32 bg-white">
                        <img src={heroModelImg} className="w-full h-full rounded-sm" alt="" />
                    </div>
                    <div>
                        <p>Seleted Order</p>
                        <p className="font-bold">XL(Extra Large)</p>
                    </div>
                </div>
                <div className="text-lg mb-4">
                    <div className="flex justify-between mb-3">
                        <p>Quantity: </p>
                        <div className="flex group">
                            <button 
                                title="decrease"
                                disabled={!(quantity -1)} 
                                type="button" 
                                className="quantity_btn text-red-600 border-2 border-red-600 active:bg-red-600 active:text-[#f3e4d7] border-r-black px-2 duration-300"
                                onClick={() => setQuantity(prevVal => prevVal - 1)}><Minus/></button>
                            <p className="border-2 border-black group-active:text-gray-300 px-4 duration-150">{quantity}</p>
                            <button 
                                title="increase" 
                                type="button" 
                                className="quantity_btn text-green-600 border-2 border-green-600 active:bg-green-600 active:text-[#f3e4d7] border-l-black px-2 duration-300"
                                onClick={() => setQuantity(prevVal => prevVal + 1)}><Plus/></button>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p>Total: </p>
                        <p className="font-black"># {2000 * quantity}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4">
                    <Button className="rounded-sm text-lg border-2 border-black h-12">Buy Now</Button>
                    <Button className="rounded-sm text-lg border-2 border-black h-12 bg-white text-black hover:text-white">Add To Cart</Button>
                </div>
            </div>
        </section>
        
        {/* Product Review */}
        <section>
            <div className="px-3 sm:px-8 py-4 sm:text-lg tracking-wide font-bold bg-white flex gap-4 sm:gap-8">
                {
                    ["Reviews", "Warranty", "Return Policy"].map((item, idx) => (
                        <NavLink to="/" key={idx} className="truncate">{item}</NavLink>
                    ))
                }
            </div>
            <div className="px-4 sm:px-8 py-4 mt-2 bg-white">
                <div className="grid grid-cols-5">
                    <div className="mb-3 col-span-2">
                        <h2 className="text-4xl tracking-wider font-black scale-y-125 lg:scale-y-150 mb-3 text-amber-400">4.8</h2>
                        <p className="text-gray-600">STARS</p>
                        <p className="text-gray-600">7 Reviews</p>
                    </div>
                    <div className="mb-3 col-span-3 text-sm sm:text-base">
                        <div>
                            5
                        </div>
                        <div>
                            4
                        </div>
                        <div>
                            3
                        </div>
                        <div>
                            2
                        </div>
                        <div>
                            1
                        </div>
                    </div>
                    {
                        [1, 2, 3, 4, 5].map(() => (
                    <>
                        <div className="mb-3 col-span-2">
                            <div className="flex items-center sm:gap-3">
                                <div className="sm:size-16 aspect-square bg-black rounded-full"></div>
                                <div className="text-sm sm:text-base">
                                    <p>Reviewer's Name</p>
                                    <p className="text-xs sm:text-sm text-gray-600">Date posted</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 h-20 md:h-fit overflow-auto text-sm md:text-base sm:pt-2 mb-3">
                            <p>STARZ</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cupiditate velit earum hic veritatis nisi iste cumque, quisquam numquam! Labore.</p>
                        </div>
                    </>))
                    }
                </div>
            </div>
        </section>
    </main>
  )
}

export default ProductDetailsPage