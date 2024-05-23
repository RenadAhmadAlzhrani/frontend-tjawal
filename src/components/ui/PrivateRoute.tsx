import { reshapeUser } from "@/lib/utils";
import { ROLE } from "@/types";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import jwt from "jwt-decode"

export function PrivateRoute({children}: {children: ReactElement}){
   const cleanKey = localStorage.getItem("token") || ""
   const decodedToken = jwt(cleanKey)
   const decodedUser = reshapeUser(decodedToken)
   return decodedUser.role === ROLE.customer ? <Navigate to="/"/> : children
}

