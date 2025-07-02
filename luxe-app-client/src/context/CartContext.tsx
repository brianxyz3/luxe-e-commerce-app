import axios from 'axios';
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useAuth } from './authContext';

interface CartProviderType {
  children: ReactNode;
}

export interface CartType {
  productId: string;
  productName: string;
  productBrandName: string;
  price: number;
  units: number;
}

const CartContext = createContext<{cart: CartType[]; isEmpty: boolean; updateCart: (userId: string, cart: CartType) => Promise<{status: number; message: any}>; removeFromCart: (userId: string, itemId: string) => Promise<{status: number; message: any}>} | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext)
  if(!context) throw new Error("No Authentication Context found")
  return context;
};



const CartProvider: React.FC<CartProviderType> = ({children}) => {

    const [cart, setCart] = useState<CartType[]>([]);
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    const {userLoggedIn} = useAuth();

    useEffect(() => {
      const cart = localStorage.getItem("cart")
      const guestId = localStorage.getItem("guestId")
      if (!guestId) localStorage.setItem("guestId", "null");
      if (!cart) return localStorage.setItem("cart", JSON.stringify([]))
      initializeCartState(JSON.parse(cart))
    }, [isEmpty])

    const updateLocalStore = (items: CartType[]) => {
      localStorage.setItem("cart", JSON.stringify(items));
      setCart(items);
      setIsEmpty(false);
    }

    const updateCart = async (userId: string, item: CartType) => {
      let url: string;
      if(userLoggedIn) {
        url = `http://localhost:4000/shoppingCart/${userId}/update`;
      } else {
        url = `http://localhost:4000/shoppingCart/guest/${userId}/update`;
      }
      const response = await axios({
        method: "PUT",
        url,
        data: item
      })
    
      if( response.status == 200) updateLocalStore(response.data.cart);
      if (response.data.id) localStorage.setItem("guestId", response.data.id);
      return {status: response.status, message: response.data.message}
    }
    
    const removeFromCart = async (userId: string, itemId: string) => {
      let url: string;
      if(userLoggedIn) {
        url = `http://localhost:4000/shoppingCart/${userId}/delete`;
      } else {
        url = `http://localhost:4000/shoppingCart/guest/${userId}/delete`;
      }
      const response = await axios({
        method: "PUT",
        url,
        params: {
          itemId
        }
      })
    
      if( response.status == 200) updateLocalStore(response.data.cart);
      if (response.data.cart.length == 0) setIsEmpty(true)
      return {status: response.status, message: response.data.message}
    }
    

    const initializeCartState = (cart:CartType[]) => {
      setCart(cart)
      if (cart.length)setIsEmpty(false)
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