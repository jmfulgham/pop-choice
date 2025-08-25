import { openai, supabase } from './config';
import express from 'express';
const app = express()
const port = 8080

import movies from "./content";
import {createEmbeddings}  from "./util/embeddings";

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
    createEmbeddings(movies);
    console.log("Hit!")
})

app.post("/", (req, res)=>{
    const {body} = req;
    createEmbeddings(movies);
    res.send(JSON.stringify({body: "You got a hit"}))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

