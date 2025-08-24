const { openai, supabase } = require('./config.js');
const express = require('express')
const app = express()
const port = 8080
const helmet = require('helmet')
app.use(helmet())

app.get('/', (req, res) => {
    res.send('Hello World!')
    console.log("Hit!")
})

app.post("/", (req, res)=>{
    res.send("You got a hit")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

