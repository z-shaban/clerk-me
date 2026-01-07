import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { prisma } from "../lib/prisma.js";


async function login (req,res){
   try {
    const user = await prisma.user.findUnique({
        where: {username: req.validatedData.username}
    })

    if(!user){
        return res.status(401).json({error: "Invalid credentials"})
    }

    const matchedPassword = await bcrypt.compare(req.validatedData.password, user.password)

    if(!matchedPassword){
         return res.status(401).json({error: "Invalid credentials"})
    }

    const payload = {
        userId: user.id,
        role: user.role
    }

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: "7d"},
        (error,token)=>{
            if(error){
                res.status(500).json({error: "Error generating token"})
                console.error(error)
            }
            return res.status(201).json({token, user:{username: user.username}})
        }
    )

   } catch (error) {
     res.status(500).json({error:"Server error "})
   }
}

export {login}