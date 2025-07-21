import { useContext } from "react";
//importing current user and loading state
import { AuthContext} from "../components/context/AuthProvider";
// That gives you access to the current user's data and whether it's still loading
const useAuth=()=>{
    //read the value from authcontext
    const context=useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used inside AuthProvider");
    }

    //return  {user,loading}
    return context;
}

export default useAuth;