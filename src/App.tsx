import './App.css'
import QuestionsForm from "./components/questionsForm/questions-form.tsx";
import {useState} from "react";
import questionsArr from "./components/questionsForm/questions.json";
import type {Questions} from "./types.ts";
import {useSubmitForm} from "./hooks/useSubmitForm.ts";

function App() {
    const [formValues, setFormValues] = useState<Questions[]>(questionsArr);
    const [movieRecommendations, setMovieRecommendations] = useState([])

    const handleClick = async ()=> {
        const response = await useSubmitForm(formValues)
        console.log(response)
    }

    return (
        <>
            <div className={"logo"}>
                <img src={"../popcorn.png"} width={99} height={108} alt={"Pop Choice"}/>
                <h1>Pop Choice</h1>
            </div>
            <QuestionsForm formValues={formValues} setFormValues={setFormValues}/>
            <button onClick={handleClick}>Let's Go!</button>
        </>
    )
}

export default App
