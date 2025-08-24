import {useState} from 'react'
import questionsArr from "./questions.json";
import './styles.css'

interface Questions {
    question: string,
    answer: null | string;
}

const QuestionsForm = () => {
    const [formValues, setFormValues] = useState<Questions[]>(questionsArr);

    const handleChange = (event) => {
        //name matches the question in the state
        const {name, value} = event.target;

        // loop through state and find matching question
        // update its answer while maintaining previous state

        setFormValues((prevState) => (prevState.map((obj) => (
            obj.question === name ? {...obj, answer: value} : obj))))
    }

    const handleClick = ()=> {
        console.log("Clicked")
    }

    return (<div className={"questions-container"}>
            <form onSubmit={e => e.preventDefault()}>
                {questionsArr.map((obj, index) => (
                    <div className={"question-text-input"} key={index}>
                        {obj.question}
                        <textarea name={obj.question} onChange={handleChange}/>
                    </div>
                ))}
                <button onClick={handleClick}>Let's Go!</button>
            </form>
        </div>

    )
}


export default QuestionsForm
