import questionsArr from "./questions.json";
import './styles.css'
import type {QuestionsFormProps} from "../../types.ts";


const QuestionsForm = ({formValues, setFormValues}: QuestionsFormProps) => {

    const handleChange = (event) => {
        //name matches the question in the state
        const {name, value} = event.target;

        setFormValues((prevState) => (prevState.map((obj) => (
            obj.question === name ? {...obj, answer: value} : obj))))
    }

    return (<div className={"questions-container"}>
            <form onSubmit={e => e.preventDefault()}>
                {questionsArr.map((obj, index) => (
                    <div className={"question-text-input"} key={index}>
                        {obj.question}
                        <textarea name={obj.question} onChange={handleChange}/>
                    </div>
                ))}
            </form>
        </div>

    )
}


export default QuestionsForm
