import questionsArr from "./questions.json";
import './styles.css'

const Questions = () => {
    return (<div className={"questions-container"}>
            {questionsArr.map((q, index) => (
                <div className={"question-text-input"} key={index}>
                    {q.question}
                    <textarea/>
                </div>
            ))}
        </div>

    )
}


export default Questions
