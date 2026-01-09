
import { Outlet } from "react-router"

function Signup(){
 return(
 <>
    <div className="min-h-screen grid place-items-center bg-slate-100">
    <div>
        <h1 className="flex justify-center mb-4">WELCOME TO CLERK ME </h1>
        <Outlet/>
    </div>
  
   </div>
 </>
    
 )
}

export {Signup}