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

const CartContext = createContext<{cart: CartType[]; isEmpty: boolean; updateCart: (cart: CartType) => void; addToCart: (cart: CartType) => void} | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext)
  if(!context) throw new Error("No Authentication Context found")
  return context;
};

const updateStore = (item: CartType) => {
  const cartStore = localStorage.getItem("cart");
  if(cartStore) {
    const cart: CartType[] = JSON.parse(cartStore)
    
    const isInCart = cart.some(product => product.productId == item.productId)
    if (isInCart) {
      const updatedCart = cart.map(product => {
        if (product.productId == item.productId) {
          product.units = item.units
          return product
        } else {
          return product;
        }
      })
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      return updatedCart
    } else {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart)) 
      return cart
    }
  }
  return [item];
}

const addToStore = (item: CartType) => {
  const cartStore = localStorage.getItem("cart");
  if(cartStore) {
    const cart: CartType[] = JSON.parse(cartStore)
    
    const isInCart = cart.some(product => product.productId == item.productId)
    if (isInCart) {
      const updatedCart = cart.map(product => {
        if (product.productId == item.productId) {
          product.units += item.units
          return product
        } else {
          return product;
        }
      })
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      return updatedCart
    } else {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart)) 
      return cart
    }
  }
  return [item];
}

const CartProvider: React.FC<CartProviderType> = ({children}) => {

    const [cart, setCart] = useState<CartType[]>([]);
    const [isEmpty, setIsEmpty] = useState<boolean>(true);

    useEffect(() => {
      const cart = localStorage.getItem("cart")
      if (cart == null) return localStorage.setItem("cart", JSON.stringify([]))
      initializeCartState(JSON.parse(cart));
    }, [isEmpty])

    const updateCart = (item: CartType) => {
      const update = updateStore(item);
      setCart(update)
      setIsEmpty(false)
    }

    const addToCart = (item: CartType) => {
      const update = addToStore(item);
      setCart(update)
      setIsEmpty(false)
    }
    

    const initializeCartState = (cart:CartType[]) => {
      setCart(cart)
      setIsEmpty(false)
    }

    const value = {
      cart,
      isEmpty,
      updateCart,
      addToCart
    }

  return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider