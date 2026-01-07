import express from "express"
import 'dotenv/config'
import { signup } from "./routes/signup.js"



const PORT = process.env.config || 3000
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/', signup)




app.listen(PORT, (error)=>{
    if(error){
        console.error(error)
    } 
    console.log('server is running')
})