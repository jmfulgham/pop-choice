import {openai} from "../config.ts";

export const getOpenAiResponse = async (movieMatches: any) => {
    const response = await openai.responses.create({
        model: "gpt-4.1-nano-2025-04-14",
        input: [{
            role: "system",
            content: `You are a friendly movie expert that loves sharing recommendations. You will receive some information about a few movies. Your job is to give a short answer 
        given the information you receive. If you are not sure about the answer, please say "Sorry, I don't have an answer for that", do not make anything up.`
        },
            {
                role: "user",
                content: movieMatches
            }
        ]
    })
    console.log(await response)
}
