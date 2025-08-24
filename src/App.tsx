import './App.css'
import Questions from "./questions/questions.tsx";

function App() {
    return (
        <>
            <div className={"logo"}>
                <img src={"../popcorn.png"} width={99} height={108}/>
                <h1>Pop Choice</h1>
            </div>
            <Questions/>
        </>
    )
}

export default App
