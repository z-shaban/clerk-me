import Groq from "groq-sdk";
import 'dotenv/config'
const groq = new Groq()

export async function main(req,res){
     const chatCompletion = await chat(req,res);
     const message = chatCompletion.choices[0].message.content || ""
     res.json(message)
    console.log(message)
}

async function chat(req,res) {
    return groq.chat.completions.create({
        messages:[
            { role: 'system', 
                content: 'You are a simulated patient.' },
            {
                role: "user",
                content: req.body.message
            }
        ],

      model: 'openai/gpt-oss-20b',
    })
}

