import {Router} from "express"



const answers = Router()

answers.post("/", (req,res)=>{
    res.send('hi')
})

export {answers}