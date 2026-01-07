import {Router} from "express";
import {prisma} from "../lib/prisma.js"
import bcrypt from "bcryptjs"
import { validateUser } from "../middleware/validator.js";

const signup = Router();



signup.post('/',validateUser, async(req,res)=>{
    try {
        const user = await prisma.user.findFirst({
            where:{
                OR:[
                    {email: validatedData.email},
                    {username: validatedData.username}
                ]
            }
        })

        
        if(user.email === validatedData.email){
            return res.status(409).json({message: "email exists"})
        }

        if(user.username === validatedData.username){
            return res.status(409).json({message: "username exists"})
        }
        
       
            const password = await bcrypt.hash(validatedData.password, 10)
            await prisma.user.create({
                data:{
                    username: validatedData.username,
                    email: validatedData.email,
                    password: password
                }
            })
            res.status(201).json({message: "user created"})
        
        
    } catch (error) {
        res.status(500)
        console.error(error)
    }
})
 export {signup}