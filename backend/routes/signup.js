import {Router} from "express";
import { validateUser } from "../middleware/validator.js";
import { login } from "./login.js";
import { signupController } from "../controllers/signup.js";

const signup = Router();



signup.post('/',validateUser, signupController, login )

export {signup}