import Groq from "groq-sdk";
import 'dotenv/config'
import {prisma} from "../lib/prisma.js";
const groq = new Groq()


async function newChat(req,res) {
    const myCase  = await prisma.case.findUnique({
    where:{
        id:1
    }
    })
    const updatedConversationHistory = myCase.conversationHistory || []
    
    const prompt = [
    {
        role: "system",
        content: `${myCase.systemprompt} ${myCase.script}`
    },
    ...updatedConversationHistory
]
    const chatCompletion = await groq.chat.completions.create({
        messages: prompt,
        model: "openai/gpt-oss-20b"
    })

    const message = chatCompletion.choices[0].message.content || "nothing"

    
  
    updatedConversationHistory.push({
        role: "assistant",
        content: message
    })

  await prisma.case.update({
    where: { id: myCase.id },
    data: { conversationHistory: updatedConversationHistory }
  })

    res.json(updatedConversationHistory)
}


export async function myChat(req,res){
    const myCase  = await prisma.case.findUnique({
    where:{
        id:1
    }
})
const updatedConversationHistory = myCase.conversationHistory || []

   updatedConversationHistory.push({
        role: "user",
        content: req.body.userQuestion
    })

  await prisma.case.update({
    where: { id: myCase.id },
    data: { conversationHistory:updatedConversationHistory}
  })
  
  await newChat(req,res)
}






