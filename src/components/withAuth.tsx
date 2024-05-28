import { Login } from "@/pages/login";
import { ROLE } from "@/types";
import { ReactElement, ReactNode, useEffect} from "react";
import { Navigate } from "react-router-dom";
export function PrivateRoute({children}:{children:ReactElement}){
    console.log("GLOBAL DATA")

    const token=localStorage.getItem("token")||""
  const decodedToken=jwt(token)
  const decodedUser:any={}

  if(decodedToken){
    for (const [key,value]of Object.entries(decodedToken)){
       let cleantKey=""
       if(key.startsWith("http")){
        cleantKey= key.split("identity/claims/")[1]
       }else{
        cleantKey=key
       }
       
        decodedUser[cleantKey]=value
    }
  }
  console.log("decodedUser.Role:",decodedUser.Role)
  console.log("ROLE.Customer:",ROLE.customer)

  return decodedUser.Role===ROLE.customer?< Navigate to="/"/> :children

 

    return children
}