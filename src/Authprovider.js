import { useEffect } from "react";
import { createContext, useState } from "react";
import { set } from "react-hook-form";
import { useLocation } from "react-router-dom";

// Create the AuthContext
export const AuthContext = createContext();



// Create the AuthProvider component
export const AuthProvider = ({ children }) => {

  
  const [auth, setAuth] = useState('');
  const[brokerLogo,setBrokerLogo]=useState('')
  
 

  const setUrl = () => {
    try {
      if(auth === ''){
        if(window.localStorage.getItem("DyAuth")){
          setAuth(window.localStorage.getItem("DyAuth"))
        }

      } 
       if(brokerLogo === ''){
        if(window.localStorage.getItem("Brokerlogo")){
        setBrokerLogo(window.localStorage.getItem("Brokerlogo"))          
        }
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  // useEffect(()=>{

  // },[auth])

  useEffect(() => {
    setUrl()
  },[])
  return (
    <AuthContext.Provider value={{ auth, setAuth,brokerLogo,setBrokerLogo }}>
      {children}
    </AuthContext.Provider>
  );
};




