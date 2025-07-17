import { fetchInventoryList } from "@/controller/inventoryFetch";
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../authContext";
import type { ProductType } from "@/controller/useProductFetch";
import type { CartType } from "../cartContext";
import { fetchOrderList } from "@/controller/orderFetch";
import { fetchUserList } from "@/controller/userFetch";

interface AuthProviderType {
  children: ReactNode;
}

interface InventoryDataType {
  _id: string;
  product: ProductType;
  units: number;
  unitsSold: number;
}

interface InventoryType {
  inventoryList: InventoryDataType[];
  totalStock: number;
  totalSale: number;
}


interface OrderDataType {
  _id: string;
  cart: CartType[];
  orderBy: {
    email: string;
    firstName: string;
    lastName: string;
  };
  totalAmount: number;
  status: string;
  deliveryAddress: string;
  paymentOption: string;
  timestamps: DateConstructor;
}

interface UserType {
  email: string;
  firstName: string;
  lastName: string;
  deliveryAddress: string;
  userRole: string;
}

interface DashboardContextType {
  inventory: InventoryType;
  orders: OrderDataType[];
  users : UserType[];
}


const AdmindashboardContext = createContext< DashboardContextType | undefined>(undefined);

export const useAdminDashboard = () => {
  const context = useContext(AdmindashboardContext);
  if (!context) throw new Error ("No AdminDashboard Context found")
  return context;
}

const AdminDashboardProvider: React.FC<AuthProviderType> = ({children}) => {
  const {userLoggedIn, currentUser} = useAuth()
  const [inventory, setInventory] = useState({inventoryList: [], totalStock: 0, totalSale: 0});
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const UpdateData = async () => {
      if (currentUser.token) {
        try {
          const inventoryData = await fetchInventoryList();
          const ordersData = await fetchOrderList();
          const usersData = await fetchUserList();
          if(inventoryData.status == 500) return toast.error(inventoryData.message)
          if(ordersData.status == 500) return toast.error(ordersData.message)
          if(usersData.status == 500) return toast.error(usersData.message)
          // console.log(usersData.data)
          // toast.success()
          setInventory(inventoryData.data);
          setOrders(ordersData.data);
          setUsers(usersData.data)
        } catch (error) {
          console.log(error)
        }
      }
      
    }
    UpdateData();    
  }, [userLoggedIn])

  const value = {
    inventory,
    orders,
    users,
  }
  return (
    <AdmindashboardContext.Provider value={value}>
      {children}
    </AdmindashboardContext.Provider>
  )
}

export default AdminDashboardProvider;