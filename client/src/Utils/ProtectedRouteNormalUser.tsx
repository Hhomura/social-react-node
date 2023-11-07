import { Navigate } from "react-router-dom";
import Parent from "../Parent";
import { useCookies } from "react-cookie";

export const ProtectedRouteNormalUser = () =>{

    const [cookies] = useCookies(['user'])
    const adm = cookies.user != undefined? cookies.user.adm: null;

    if(adm == 1){
        console.log("Não Autorizado")
        return <Navigate to= '/'/>;
    }

    return <Parent/>

}