import './App.css'
import QuestionsForm from "./components/questionsForm/questions-form.tsx";

function App() {
    return (
        <>
            <div className={"logo"}>
                <img src={"../popcorn.png"} width={99} height={108} alt={"Pop Choice"}/>
                <h1>Pop Choice</h1>
            </div>
            <QuestionsForm/>
        </>
    )
}

export default App
