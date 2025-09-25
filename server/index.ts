import { handleUserAnswers, main} from "./util/embeddings";
import express from 'express';
import {getOpenAiResponse} from "./util/aiResponse.ts";
const app = express()
const port = 8080

app.use(express.json());
app.get('/', async (req, res) => {
    res.send('Movie DB updated!')
   await main()
});

app.post("/", async (req, res)=>{
    const {body} = req;
    const matches = await handleUserAnswers(body)
    const aiResponse = await getOpenAiResponse(matches)
    res.send(JSON.stringify({results: aiResponse}))
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

