import {Router} from "express"
import { main } from "../controllers/chat.js"

const chat = Router()

chat.post('/', main)

export {chat}