import axios from 'axios';
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface CartProviderType {
  children: ReactNode;
}

export interface CartType {
  productId: string;
  productName: string;
  productBrand: string;
  price: number;
  units: number;
}

const CartContext = createContext<{cart: CartType[]; isEmpty: boolean; updateCart: (userId: string, cart: CartType) => Promise<{status: number; message: any}>;  removeFromCart: (userId: string, itemId: string) => Promise<{status: number; message: any}>} | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext)
  if(!context) throw new Error("No Authentication Context found")
  return context;
};



const updateLocalStore = (items: CartType[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
}

const CartProvider: React.FC<CartProviderType> = ({children}) => {

    const [cart, setCart] = useState<CartType[]>([]);
    const [isEmpty, setIsEmpty] = useState<boolean>(true);

    useEffect(() => {
      const cart = localStorage.getItem("cart")
      if (cart == null) return localStorage.setItem("cart", JSON.stringify([]))
      initializeCartState(JSON.parse(cart));
    }, [isEmpty])



    const updateCart = async (userId: string, item: CartType) => {
      const response = await axios({
        method: "PUT",
        url: `http://localhost:4000/${userId}/shoppingCart/update`,
        data: item
      })
    
      if( response.status == 200) {
        updateLocalStore(response.data.cart);
        setCart(response.data.cart)
        setIsEmpty(false)
      }
      return {status: response.status, message: response.data.message}
    }
    
    const removeFromCart = async (userId: string, itemId: string) => {
      const response = await axios({
        method: "PUT",
        url: `http://localhost:4000/${userId}/shoppingCart/delete`,
        params: {
          itemId
        }
      })
    
      if( response.status == 200) {
        updateLocalStore(response.data.cart);
        setCart(response.data.cart)
      }
      if (response.data.cart.length == 0) setIsEmpty(true)
      return {status: response.status, message: response.data.message}
    }
    

    const initializeCartState = (cart:CartType[]) => {
      setCart(cart)
      setIsEmpty(false)
    }

    const value = {
      cart,
      isEmpty,
      updateCart,
      removeFromCart,
    }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider