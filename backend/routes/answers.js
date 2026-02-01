import {Router} from "express"
import { answers } from "../controllers/answers.js"

const answer = Router()

answer.get('/', (req,res)=>{res.send('hi')})

answer.post("/", answers)

export {answer}