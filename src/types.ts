export interface Questions {
    question: string,
    answer: string;
}


export interface QuestionsFormProps {
    formValues: Questions[],
    setFormValues: (value: (((prevState: Questions[]) => Questions[]) | Questions[])) => void,
}
