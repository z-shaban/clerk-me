import { SignupForm } from "../components/signupform"
import { Outlet } from "react-router"

function Signup(){
 return(
 <>
    <div>
    <Outlet/>
   </div>
 </>
    
 )
}

export {Signup}