import PlusMinusButton from "@/components/PlusMinusButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Heart, Trash2 } from "lucide-react";
import { useState } from "react"


const ShoppingCartPage = () => {

  const [quantity, setQuantity] = useState(1);
  const [showOrderOptions, setShowOrderOptions] = useState(false);
  
  const increaseQantity = () => setQuantity(prevVal => prevVal + 1)

  const decreaseQantity = () => setQuantity(prevVal => prevVal - 1)

  const cartTotal = 5
  return (
    <div className="relative py-6 bg-cream-light dark:bg-stone-700">
      <section className="flex flex-wrap-reverse md:flex-nowrap">
        <main className="w-full md:w-3/5 lg:w-2/3 px-3 lg:px-6">
          <div className="bg-cream-light dark:bg-black p-4">
            <h3 className="font-bold text-2xl">Shopping Cart({cartTotal})</h3>
          </div>

          {/* Cart Products */}
          <div className="">
            <div className="lg:flex py-4 text-xl font-semibold hidden">
              <h5 className="w-3/5 ps-4">Product Details</h5>
              <h5 className="w-1/5">Quantity</h5>
              <h5 className="w-1/5">Item Price</h5>
            </div>
            <div className="flex flex-col gap-y-3 mt-8 lg:mt-0 min-h-[50dvh]">
              {
                [1, 2, 3, 4].map(item => (
                  <Card key={item} className="rounded-none overflow-hidden shadow bg-cream-light dark:bg-black py-3">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4 px-3 lg:pe-0">
                        {/* <div className="w-14">
                          <Circle className="stroke-red-700 mx-auto"/>
                        </div> */}
                        <div className="w-full flex items-center justify-between flex-wrap lg:flex-nowrap">
                          <div className="flex items-center gap-5 lg:gap-10 lg:w-3/5">
                          <img src="/" className="size-28 aspect-square mb-5 lg:mb-0 bg-black" alt="" />
                            <div className="">
                              <h6 className="text-lg font-semibold mb-1">Product Name</h6>
                              <p className="mb-1">Brand: Brand Name</p>
                              <div className="flex gap-4">
                                <p>Color: Blue</p>
                                <p>Weight: 10kg</p>
                              </div>
                            </div>
                          </div>
                          <div className="w-56 lg:w-1/5">
                            <PlusMinusButton quantity={quantity} plusQuantity={increaseQantity} minusQuantity={decreaseQantity}/>
                          </div>
                          <h5 className="lg:w-1/5 text-2xl font-semibold">
                            # {quantity + 20000}
                          </h5>
                        </div>
                      </div>
                      <div className="ms-3 flex gap-4 w-1/3 max-w-44 justify-between">
                        <div className="flex items-center gap-2">
                          <Trash2 className="stroke-red-600"/>
                          <p className="text-xs">Remove</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="stroke-red-300"/>
                          <p className="text-xs">Like</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </div>
        </main>

        {/* Shopping Cart Summary */}
        <aside className="w-1/2 min-w-80 lg:min-w-72 mx-auto md:sticky top-10 md:h-fit lg:w-1/4 mb-10 sm:mb-6 md:mb-0 md:mr-6">
          <div className=" flex flex-col gap-1 mb-1">
            <h2 className="text-xl font-semibold bg-cream-light dark:bg-black p-4">CART SUMMARY <span className="inline-block ml-2">({cartTotal}) items</span></h2>
            <div className="bg-cream-light dark:bg-black text-gray-800 p-4 dark:text-gray-300">
              <div className="flex justify-between items-center w-11/12 mb-8">
                <h6 className="text-lg">Order Charges</h6>
                <p># 1,100</p>
              </div>

              <div className="flex justify-between items-center w-11/12">
                <h6 className="text-lg">Subtotal</h6>
                <p># 25,600</p>
              </div>
            </div>
            <div className="bg-cream-light dark:bg-black p-4">
              <div className="w-11/12 text-lg font-semibold flex justify-between items-baseline">
                <h5 className="tracking-wider">
                  TOTAL
                </h5>
                <h5 className="text-xl scale-110"># 27,700</h5>
              </div>
            </div>
          </div>

          {/* Order Options */}
          <div className="order_options_container">
            <form className={`${showOrderOptions && "open"} bg-cream-light dark:bg-black mt-6 overflow-hidden`}>
              <fieldset className="px-4 my-4">
                <legend className="text-2xl font-bold">Order Confirmation</legend>
                <div className="flex flex-col gap-2.5">
                  <p className="text-lg font-semibold">Payment Options:</p>
                  <label htmlFor="payOnOrder">
                    <input className="mr-2" checked value="payment on order" title="payment on order" type="radio" name="paymentOption" id="payOnOrder" />
                    Payment On Delivery
                  </label>

                  <p className="text-lg font-semibold">Delivery Address:</p>
                  <Input className="border-black dark:border-white" title="Address" type="text" placeholder="Delivery Address" />
                  <div className="mt-4">
                    <Button 
                      className="w-full rounded-sm text-lg border-2 border-black dark:border-white h-12 dark:bg-black dark:text-white"
                      >Proceed to Pay</Button>  
                  </div>
                </div>
              </fieldset>
            </form>
          </div>

          <div className="flex flex-col gap-y-4 mt-2">
            <Button
            disabled={showOrderOptions} 
            className={`${showOrderOptions && "hidden"} rounded-sm text-lg border-2 border-black h-12 dark:bg-black dark:text-white`}
            onClick={() => setShowOrderOptions(prevValue => !prevValue)}
            >Proceed to Pay</Button>
            <Button className="rounded-sm text-lg border-2 border-black h-12 bg-white dark:bg-stone-700 dark:text-white dark:border-white text-black hover:text-white">Continue Shopping</Button>
          </div>
        </aside>
      </section>

      {/* Suggested Products */}
      <section className="py-4 px-4 mt-8 bg-white dark:bg-stone-700 w-full">
        <h5 className="text-xl font-semibold mb-6">Suggested Products</h5>
        <div className="flex flex-nowrap pb-4 gap-6 overflow-scroll">
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
    </div>
  )
}

export default ShoppingCartPage