import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AuthContext = createContext();
export const context = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => { 
  const [decodedToken, setDecodedToken] = useState(null);
  const [emailVal, setEmailVal] = useState(null);
  const [orders,setOrders] = useState([])
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        
        const value = sessionStorage.setItem("email",decoded.email)
        
         
        
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
      const sesion =sessionStorage.getItem("email")
      setEmailVal(sesion)

  }, [token]);
  

  return (
    <AuthContext.Provider value={{emailVal,orders,setOrders }}>
      {children}
    </AuthContext.Provider>
  );
};