import {prisma} from "../lib/prisma.js"
import bcrypt from "bcryptjs"

export const signupController = async(req,res, next)=>{
    try {
        const user = await prisma.user.findFirst({
            where:{
                OR:[
                    {email: req.validatedData.email},
                    {username: req.validatedData.username}
                ]
            }
        })

       
        if(user){
              if(user.email === req.validatedData.email){
            return res.status(409).json({message: "email exists"})
        }

            if(user.username === req.validatedData.username){
            return res.status(409).json({message: "username exists"})
        }
        }
       
             const password = await bcrypt.hash(req.validatedData.password, 10)
            await prisma.user.create({
                data:{
                    username: req.validatedData.username,
                    email: req.validatedData.email,
                    password: password
                }
            })
            
        
        
    } catch (error) {
        res.status(500)
        console.error(error)
    }
    next();
}