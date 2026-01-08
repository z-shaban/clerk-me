import {Router} from "express"
import { login } from "../controllers/login.js"
import { loginValidation} from "../middleware/validator.js"

const loginUser = Router()

loginUser.post('/', loginValidation, login)
export{loginUser}