import { handleUserAnswers, main} from "./util/embeddings";
import express from 'express';
const app = express()
const port = 8080

app.use(express.json());
app.get('/', async (req, res) => {
    res.send('Hello World!')
   await main()
});

app.post("/", async (req, res)=>{
    const {body} = req;
   await handleUserAnswers(body)
    res.send(JSON.stringify({body: "You got a hit"}))
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

