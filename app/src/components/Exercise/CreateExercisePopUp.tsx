// Pop-up messages
import react from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form'

// Icons
import { PlusIcon } from "@heroicons/react/24/outline";

// Components
import { AnswerField } from "../../components/Exercise/AnswerField";
import { Answer } from "../../interfaces/Answer";
import { Exercise } from "../../interfaces/Exercise";

// Services
import ExerciseServices from '../../services/exercise.services';



type ExercisePartial = {
    title: string;
    question: string;
    answers: Answer[];
};

type Inputs = {
    sid: string|undefined;
    cid: string|undefined;
  
};



export const CreateExercise = ({sid, cid}:Inputs) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tempAnswers, setTempAnswer] = useState<Answer[]>([new Answer(), new Answer()]);


    const [answerFieldIndex, setAnswerFieldIndex] = useState(tempAnswers.length);
    const [answerField, setAnswerField] = useState<JSX.Element[]>([<AnswerField index={0} answerObject={tempAnswers[0]}  callback={updateAnswer}/>, <AnswerField index={1} answerObject={tempAnswers[1]}  callback={updateAnswer}/>]);
    const navigate = useNavigate();
    const token = "dummyToken";

    /**
     * Add new answer 
     * @param index index of the answer to be added
     * @returns 
     */
    function addOrGetAnswer(index: number) {
        if (tempAnswers[index] == undefined) {
        tempAnswers[index] = new Answer();
        }
        return tempAnswers[index];
    }
    /** 
     * Update answer to match inputted data
     */ 
    function updateAnswer(answerFieldIndex: number, answer: Answer) {
        tempAnswers[answerFieldIndex] = answer;
        setTempAnswer(tempAnswers);
    }

    /**
     * Add new answer field
     * 
     */
    function addAnswerField() {
        setAnswerFieldIndex(answerFieldIndex + 1);
        setAnswerField([
            ...answerField,
            <AnswerField
                index={answerFieldIndex}
                answerObject={addOrGetAnswer(answerFieldIndex)}
                callback={updateAnswer}
        />])
    }


    // Create Form Hook
    const {
        register: registerExercise,
        handleSubmit: handleExerciseAdd,
        formState: { errors: exerciseErrors },
    } = useForm<ExercisePartial>();

    

    /**
     * SubmitHandler: add exercise
     * @param exerciseData  The exercise data to be added
     * @returns     void
     */
    const onExerciseAdd: SubmitHandler<ExercisePartial> = (exerciseData) => {
        const exerciseToAdd: ExercisePartial = {
        title: exerciseData.title,
        question: exerciseData.question,
        answers: exerciseData.answers,
        };

    ExerciseServices.addExercise(exerciseToAdd, /*token,*/ sid)
        .then((res) => {
            toast.success("Added exercise");
            window.location.reload();
        })
        .catch((err) => toast.error(err));
    };
    
return (
    <div>
            {/* The button to open create exercise modal */}
            <label htmlFor="exercise-create" className="btn flex modal-button space-x-2 bg-primary border-primary">
                    
                <p className='font-normal' >Criar um novo exercício</p>  {/**create new Exercise */}
                
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="exercise-create" className="modal-toggle" />
            <div className="modal" id="exercise-create-modal">
                <div className="modal-box bg-gradient-to-b from-primaryLight rounded w-11/12 max-w-xl">
                    <form
                    onSubmit={handleExerciseAdd(onExerciseAdd)}
                    className="flex flex-col justify-content align-items space-evenly w-full space-y-2"
                    >
                    {/** Exercise Title Field */}
                    <div className="form-control w-full" >
                    <label className="label">
                        <span className="label-text">Título</span> {/**Title */}
                    </label>
                    <input
                        type="text"
                        placeholder="Some awesome title"
                        className="input input-bordered w-full"
                        {...registerExercise("title", { required: true })}
                    />
                    {exerciseErrors.title && <span>Este campo é obrigatório.</span>} {/*This field is required*/}
                    </div>
                    
                    {/** Exercise Question Field */}
                    <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Pergunta</span> {/**Question */}
                    </label>
                    <textarea 
                        className="textarea textarea-bordered h-24"
                        placeholder="Adicione uma pergunta ao seu exercício"
                        {...registerExercise("question", { required: true })}
                    />  {/**Add a question to your exercise */}
                    </div>

                    {/** Exercise Answers Field */}
                    {answerField}

                    <div className="flex justify-between items-center border rounded p-1">
                    <div>
                        <button
                        className="btn" type="button"
                        onClick={() => {
                            if (answerFieldIndex < 4) {
                            addAnswerField();
                            } else {
                            toast.error("Número máximo de respostas atingido!"); {/**Maximum number of answers reached. */}
                            }
                        }}
                        >
                        <PlusIcon width={24} />
                        </button>
                    </div>
                    </div>

                    {/*Create and cancel buttons*/}
                    <div className='modal-action'>
                            <div className="flex items-center justify-between gap-4 w-full mt-8">
                                <label htmlFor='exercise-create' className=" bg-primary hover:bg-primaryHover border border-primary focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                                    <button type="submit" className='py-2 px-4 h-full w-full' {...registerExercise('answers', {value: tempAnswers})} onClick={()=>{/*window.location.reload();*/}}>
                                        Criar
                                    </button>                                                                                                       
                                </label>
                                <label htmlFor='exercise-create' className="py-2 px-4 bg-white hover:bg-gray-100 border border-primary  hover:border-primaryHover hover:text-primaryHover  text-primary w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                                    Cancelar
                                </label>
                            </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
    )

}