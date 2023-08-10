import { Navigate } from "react-router-dom";
import Parent from "../Parent";

export const ProtectedRoute = () =>{

    if(localStorage.getItem('userType') != '1'){
        return <Navigate to= '/'/>;
    }

    console.log("Autorizado ADM")
    return <Parent/>

}