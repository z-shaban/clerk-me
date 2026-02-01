import Groq from "groq-sdk";
import 'dotenv/config'
import {prisma} from "../lib/prisma.js";
const groq = new Groq()

const prompt = 'You are an examiner for a history taking osce. The student is supposed to provide a diagnosis and you are to give  feedback based on the script and conversation history.'
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

        /*convert conversation history from an array of objects to a string since groq llm only accepts Strings*/
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
    res.json(message)
   
   
    } catch (error) {
        console.error(error)
    }
}

