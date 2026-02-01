import Groq from "groq-sdk";
import 'dotenv/config'
import {prisma} from "../lib/prisma.js";
const groq = new Groq()


export async function answers(req,res) {
    try {
        const myCase  = await prisma.case.findUnique({
        where:{
        id: 1
        }
        })

        const answer = await prisma.answer.findUnique({
        where:{
        id: 1
        }
        })

        const answerHistory = answer.answerHistory

      /*convert conversation history to string to include as context in system prompt*/
        const conversationHistory = myCase.conversationHistory.map(m=> `${m.role} : ${m.content}`).join('\n')

        const systemPrompt = `Prompt: ${answer.prompt} Case Script:${myCase.script} Conversation history: ${conversationHistory}` 
       
        const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: req.body.diagnosis
            }
        ],
        model: "openai/gpt-oss-20b"
    })

    const message = chatCompletion.choices[0].message.content || "nothing"
    
    answerHistory.push({
        role: "user",
        content : req.body.diagnosis
    },
    {
        role: "assistant",
        content: message
    }
)

await prisma.answer.update({
    where: { id: answer.id },
    data: { answerHistory: answerHistory }
  })
    res.status(200).json(message)
   
   
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
        console.error(error)
    }
}

