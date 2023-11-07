import { Navigate } from "react-router-dom";
import Parent from "../Parent";
import { useCookies } from "react-cookie";

export const ProtectedRoute = () =>{

    const [cookies] = useCookies(['user'])
    const adm = cookies.user != undefined? cookies.user.adm: null;
    
    if(adm != 1){
        return <Navigate to= '/'/>;
    }

    console.log("Autorizado ADM")
    return <Parent/>

}