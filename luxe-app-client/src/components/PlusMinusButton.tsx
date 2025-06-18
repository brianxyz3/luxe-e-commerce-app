import { Minus, Plus } from "lucide-react";
import React from "react"

interface ButtonProps {
    quantity: number;
    plusQuantity: () => void;
    minusQuantity: () => void;
}
const PlusMinusButton: React.FC<ButtonProps> = ({quantity, plusQuantity, minusQuantity}) => {
  return (
    <div className="flex group">
        <button 
            title="decrease"
            disabled={!(quantity -1)} 
            type="button" 
            className="quantity_btn text-red-600 border-2 border-red-600 active:bg-red-600 active:text-[#f3e4d7] border-r-black px-1 duration-300"
            onClick={() => minusQuantity()}><Minus/></button>
        <p className="border-2 border-black group-active:text-gray-300 dark:border-white px-3 duration-150">{quantity}</p>
        <button 
            title="increase" 
            type="button" 
            className="quantity_btn text-green-600 border-2 border-green-600 active:bg-green-600 active:text-[#f3e4d7] border-l-black px-1 duration-300"
            onClick={() => plusQuantity()}><Plus/></button>
    </div>
  )
}

export default PlusMinusButton