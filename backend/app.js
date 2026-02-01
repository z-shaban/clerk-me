import express from "express"
import 'dotenv/config'
import { signup } from "./routes/signup.js"
import cors from "cors"
import { loginUser } from "./routes/login.js"
import { chat } from "./routes/chat.js"
import { answer } from "./routes/answers.js"



const PORT = process.env.config || 3000
const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/signup', signup)
app.use('/login', loginUser)
app.use('/', chat)
app.use('/answer', answer)




app.listen(PORT, (error)=>{
    if(error){
        console.error(error)
    } 
    console.log('server is running')
})