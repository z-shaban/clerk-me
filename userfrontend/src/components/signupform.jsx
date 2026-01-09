import { useState } from "react"
import { useNavigate } from "react-router"
import { API_URL } from "../config"
import { Link } from "react-router"

export function SignupForm(){
  

   const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password:""
   })
   const [error, setError]= useState(null)
  /* const [loading, setLoading] = useState(true)*/
   const navigate = useNavigate()

   function handleChange(e){
        const name = e.target.name
        const value = e.target.value
        setUserCredentials(userCredentials=>({...userCredentials, [name]: value}))
   }

   async function handleSubmit(e){
    e.preventDefault();
    
    try {
        const response = await fetch(`${API_URL}`,{
            method: "POST",
            headers:{
               "Content-Type": "application/json"
            },
            body: JSON.stringify(userCredentials)
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.error || "something went wrong")
        }
        localStorage.setItem('jwtToken', data.token)
       
        navigate('/profile')
    } catch (error) {
        setError(error)
        console.error(error)  
    }
   }

    return(
        <>
        <div className="border-2 border-slate-200 flex flex-col items-center p-8">
           <h1>CREATE AN ACCOUNT</h1>
         <form onSubmit={handleSubmit} className="flex flex-col">
         <label>Username:</label>
         <input
          className="border-2 border-black mb-2"
          type="text" 
          name="username"
          value={userCredentials.username}
          onChange={handleChange}
          required
        />
       <label>Email:</label>
       <input
       className="border-2 border-black mb-2"
         type="email" 
         name="email"
          value={userCredentials.email}
          onChange={handleChange}
          required
        />
       <label>Password:</label>
        <input
        className="border-2 border-black mb-2"
          type="password" 
          name="password"
          value={userCredentials.password}
          onChange={handleChange}
          required
        />
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-200">Create Account</button>
      <p>Already have an account? <Link to="login" className="text-blue-600 underline">login</Link> </p>
    </form>
        </div>
       
        </>
    )
}