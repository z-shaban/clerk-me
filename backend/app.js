import express from "express"
import 'dotenv/config'
import { signup } from "./routes/signup.js"
import cors from "cors"
import { loginUser } from "./routes/login.js"



const PORT = process.env.config || 3000
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/', signup)
app.use('/login', loginUser)




app.listen(PORT, (error)=>{
    if(error){
        console.error(error)
    } 
    console.log('server is running')
})