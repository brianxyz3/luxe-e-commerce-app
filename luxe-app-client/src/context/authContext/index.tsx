import React, { useContext, createContext, useEffect, useState, type ReactNode } from "react";

interface AuthProviderType {
  children: ReactNode;
}

interface AuthContextType {
  currentUser: {
    email: string;
    id: string;
    token: string;
  };
  userLoggedIn: boolean;
  isLoading: boolean;
  handleUserState: (user: Record<string, string>) => void;
  handleLogInState: (state: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) throw new Error("No Authentication Context found")
  return context;
};

const AuthProvider: React.FC<AuthProviderType> = ({children}) => {
  const cookieObj: Record<string, string> = {};
  const [currentUser, setCurrentUser] = useState({email: "", id: "", token: ""});
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  
  const handleLogInState = (state: boolean) => {
    setUserLoggedIn(state);
  }

  const handleUserState = (user: Record<string, string>) => {
    setCurrentUser(currValue => (
      {...currValue, ...user}
    ));
  }
  
  useEffect(() => {
    updateUser();      
  }, [userLoggedIn]);

  const updateUser = () => {
    parseCookie(document.cookie);
    const {email, id, token} = cookieObj;
    try{
      if(token) {
        setCurrentUser((prevUser) => (
          {...prevUser, email, id, token}
        ));
        setUserLoggedIn(true);
      }
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };


  const parseCookie = (cookieString: string) => {
    const splitCookie = cookieString.split(";");
    splitCookie.forEach(cookie => {
      const [key, value] = cookie.trim().split("=");
      cookieObj[key] = value;
    });
    return cookieObj;
  }

  const value  = {
    currentUser,
    userLoggedIn,
    isLoading,
    handleUserState,
    handleLogInState,
  }
  

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;