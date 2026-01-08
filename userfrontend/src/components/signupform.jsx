import { useState } from "react"
import { useNavigate } from "react-router"
import { API_URL } from "../config"
export function SignupForm(){
  

   const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password:""
   })
   const [error, setError]= useState(null)
   const [loading, setLoading] = useState(true)
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
        <h1>sign up page</h1>
         <form onSubmit={handleSubmit}>
         <label>Username:
         <input
          type="text" 
          name="username"
          value={userCredentials.username}
          onChange={handleChange}
          required
        />
      </label>
       <label>Email:
         <input
         type="email" 
         name="email"
          value={userCredentials.email}
          onChange={handleChange}
          required
        />
      </label>
       <label>Password:
         <input
          type="password" 
          name="password"
          value={userCredentials.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Create Account</button>
    </form>
        </>
    )
}