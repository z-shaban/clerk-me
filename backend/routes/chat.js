import {Router} from "express"
import { myChat } from "../controllers/chat.js"


const chat = Router()

chat.post("/", myChat)

export {chat}