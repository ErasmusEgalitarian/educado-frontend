import { useState, } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Components
import AnswerCards from "../components/Exercise/AnswerCards";

// Interfaces
import { Answer } from "../interfaces/Answer";
import { Exercise } from "../interfaces/Exercise"

// Helpers
import ExerciseServices from "../services/exercise.services";

// Pop-up messages
import { useNotifications } from "../components/notification/NotificationContext";
import { toast } from "react-toastify";

// Hooks
import { getUserToken } from "../helpers/userInfo";

export interface ExercisePartial {
    title: string,
    question: string,
    answers: Answer[]
}


export const ExerciseDetail = ({ exercise, eid }: { exercise: Exercise, eid: string }) => {

    const [answers, setAnswers] = useState<Answer[]>(exercise.answers);

    const { register, handleSubmit: handleExerciseSave } = useForm();
    const onExerciseSave: SubmitHandler<any> = data => updateExercise(data);

    const {addNotification} = useNotifications();

/** Token doesnt work, reimplement when it token is implemented */
    const token = getUserToken();
    
    const updateExercise = (data: any) => {

        const exerciseToSave: ExercisePartial = {
            title: data.title,
            question: data.question,
            answers: answers
        }

        ExerciseServices.updateExercise(exerciseToSave, token, eid)
            .then(() => addNotification("Exercício salvo com sucesso")) /** Successfully saved exercise */
            .catch((e) => toast.error("Falha ao salvar o exercício devido a um erro: " + e));  /** Failed to save exercise due to an error: */

    }

/**
 * Delete exercise and reload page
 * Uses window.location.reload to refresh
 * 
 * @param eid The exercise id
 * @param token The user token
 */
const deleteExercise = async () => {
    if (confirm("Você tem certeza?") == true) {
        const response = await ExerciseServices.deleteExercise(eid, token);
        const status = response.status

        if (status >= 200 && status <= 299) {
            window.location.reload();
            addNotification("Exercício excluído") /** Exercise deleted */
        } else if (status >= 400 && status <= 599) {
            toast.error(`(${status}, ${response.statusText}) while attempting to delete exercise`)
        }
    }
}

    return (

        <form onSubmit={handleExerciseSave(onExerciseSave)}
            className="flex flex-col space-y-6 divide py-2"
        >
            <div className=" rounded-md cursor-pointer p-2 focus:outline-none bg-base-100 border ">
                <div className="flex flex-col form-control align-items justify-content w-full">
                    <label className="label">
                        <span className="label-text">Título</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={exercise.title}
                        onClick={()=>console.log("answers",answers)}
                        placeholder="Exercise title goes here"
                        className="input input-bordered w-full max-w-xs"
                        {...register("title", { required: true })}
                    />

                    <label className="label">
                        <span className="label-text">Pergunta</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-24"
                        defaultValue={exercise.question}
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
            {exercise.answers ?
                <div className="rounded-md cursor-pointer p-2 focus:outline-none bg-base-100 border ">
                    <h1 className='text-md font-medium'>Respostas</h1>
                {   <AnswerCards update={setAnswers} initialAnswers={exercise.answers} />}
                </div>
                :
                <p>Loading ...</p>
            }
            <div className="flex items-left w-full mt-8">
                {/** Exercise save and delete button */}
                <button type="button" onClick={deleteExercise} className='left-0 std-button bg-warning hover:bg-red-800' >Excluir exercício</button> {/** Delete exercise*/}
                <button type='submit' className="std-button ml-auto py-2 px-4">Salvar exercícios</button> {/** Save exercise */}
            </div>
        </form>

    );
};

export default ExerciseDetail;
