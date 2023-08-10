import { Navigate } from "react-router-dom";
import Parent from "../Parent";

export const ProtectedRouteNormalUser = () =>{

    if(localStorage.getItem('userType') == '1'){
        console.log("Não Autorizado")
        return <Navigate to= '/'/>;
    }

    return <Parent/>

}