import Groq from "groq-sdk";
import 'dotenv/config'
import {prisma} from "../lib/prisma.js";
const groq = new Groq()

const systemPrompt = 'You are an examiner for a history taking osce. The student is supposed to provide a diagnosis and you are give feedback. the right diagnosis is diabetes'
async function answers(req,res) {
    try {
        const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: "my diagnosis is diabetes"
            }
        ],
        model: "openai/gpt-oss-20b"
    })

    const message = chatCompletion.choices[0].message.content || "nothing"
    console.log(message)
    } catch (error) {
        console.error(error)
    }
}

answers()