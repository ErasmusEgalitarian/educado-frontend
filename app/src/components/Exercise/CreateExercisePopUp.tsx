import { useState, } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Icons
import { PencilSquareIcon } from '@heroicons/react/24/outline'


// Components
import AnswerCards from "../../components/Exercise/AnswerCards";

// Interfaces
import { Answer } from "../../interfaces/Answer";
import { Exercise } from "../../interfaces/Exercise"

// Helpers
import ExerciseServices from "../../services/exercise.services";

// Pop-up messages
import { toast } from "react-toastify";

// Hooks
import useToken from "../../hooks/useToken";


export interface ExercisePartial {
    title: string,
    question: string,
    answers: Answer[]
}

type Inputs = {
    sid: string|undefined;
};


export const CreateExercise = ({sid}:Inputs) => {

    let TempAnswers = [{text: "", correct: true, feedback: ""}, {text: "", correct: false, feedback: ""}];

    const [answers, setAnswers] = useState<Answer[]>(TempAnswers);

    const { register, handleSubmit: handleExerciseSave, formState: { errors } } = useForm();
    const onExerciseSave: SubmitHandler<any> = data => createExercise(data);

    /** Token doesnt work, reimplement when it token is implemented */
    //const token = useAuthStore(state => state.token);
    //const token = useToken();
    const token = "dummyToken";

    const createExercise = (data: any) => {

        const exerciseToSave: ExercisePartial = {
            title: data.title,
            question: data.question,
            answers: answers
        }

        ExerciseServices.addExercise(exerciseToSave, token, sid)
            .then(() => {toast.success(`Exercício criado com sucesso`); window.location.reload();}) /** Successfully created exercise */
            .catch((e) => toast.error("Failed to create exercise due to error: " + e));

    }

    return (

        <div>
            {/** The button to open create exercise modal */}
            <label htmlFor="exercise-create" className="std-button flex modal-button space-x-2 bg-primary border-primary">
                <PencilSquareIcon className='w-5 h-5' />
                <p className='font-normal' >Criar novo exercício</p>  {/** Create new Exercise */}
            </label>

            <input type="checkbox" id="exercise-create" className="modal-toggle" />
            <div className="modal" id="exercise-create-modal">
                <div className="bg-white bg-gradient-to-b rounded w-3/8 h-5/6">
                    <div className="p-5 bg-gradient-to-b from-primaryLight overflow-auto h-full">
                        <form onSubmit={handleExerciseSave(onExerciseSave)}
                        className="flex flex-col space-y-6 divide py-2">
                            <div className="rounded-md cursor-pointer p-2 focus:outline-none bg-base-100 border">
                                <div className="flex flex-col form-control align-items justify-content w-full">
                                    <label className="label">
                                        <span className="label-text">Exercise title</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Exercise title goes here"
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("title", { required: true })}
                                    />

                                    <label className="label">
                                        <span className="label-text">Exercise question</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered h-24"
                                        placeholder="Write the question for the exercise here"
                                        {...register("question", { required: true })}
                                    ></textarea>

                                </div>
                            </div>

                            {/* divider */}
                            <div className="flex flex-col w-full">
                                <div className="divider"></div>
                            </div>

                            {/* Answers. Answers sometimes doesn't get loaded hence the conditional rendering ... */}
                            {answers ?
                                <div className="rounded-md cursor-pointer p-2 focus:outline-none bg-base-100 border ">
                                    <h1 className='text-md font-medium'>Resposta</h1>  {/** Answer */}
                                {   <AnswerCards update={setAnswers} initialAnswers={answers} />}
                                </div>
                                :
                                <p>Carregando ...</p>  /** Loading ... */
                            }
                            {/*Create and cancel buttons*/}
                            <div className='modal-action'>
                                <div className="flex items-center justify-between gap-4 w-full mt-8">
                                    <label htmlFor='exercise-create' className=" bg-primary hover:bg-primaryHover border border-primary focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded">
                                        <button type="submit" className='py-2 px-4 h-full w-full' >
                                            Criar
                                        </button>
                                    </label>
                                    <label htmlFor='exercise-create' className="py-2 px-4 bg-white hover:bg-gray-100 border border-primary  hover:border-primaryHover hover:text-primaryHover  text-primary w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded">
                                        Cancelar
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};
