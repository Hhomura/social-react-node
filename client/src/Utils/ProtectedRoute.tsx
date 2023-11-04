import { Navigate } from "react-router-dom";
import Parent from "../Parent";
import { useCookies } from "react-cookie";

export const ProtectedRoute = () =>{

    const [cookies] = useCookies(['user'])
    const {adm} = cookies.user
    
    if(adm != 1){
        return <Navigate to= '/'/>;
    }

    console.log("Autorizado ADM")
    return <Parent/>

}