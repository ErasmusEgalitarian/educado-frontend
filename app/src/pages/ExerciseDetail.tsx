import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

// Components
// import DropZoneComponent from "../components/Exercise/dropZone";
import AnswerCards from '../components/Exercise/AnswerCards'

// Interfaces
import { type Answer } from '../interfaces/Answer'
import { Exercise } from '../interfaces/Exercise'

// Helpers
import ExerciseServices from '../services/exercise.services'

// Pop-up messages
import { toast } from "react-toastify";

// Hooks
import useToken from '../hooks/useToken'

export interface ExercisePartial {
    title: string,
    question: string,
    answers: Answer[]
}

export const ExerciseDetail = ({ exercise, eid }: { exercise: Exercise, eid: string }) => {

    const [answers, setAnswers] = useState<Answer[]>(exercise.answers);

    const { register, handleSubmit: handleExerciseSave, formState: { errors } } = useForm();
    const onExerciseSave: SubmitHandler<any> = data => updateExercise(data);

    //const token = useAuthStore(state => state.token);
    //const token = useToken();
    const token = "dummyToken";

    const updateExercise = (data: any) => {

        const exerciseToSave: ExercisePartial = {
            title: data.title,
            question: data.question,
            answers: answers
        }

        console.log(exerciseToSave);

        ExerciseServices.updateExercise(exerciseToSave/*, token*/, eid)
            .then(() => toast.success(`Successfully saved exercise`))
            .catch((e) => toast.error("Failed to save exercise due to error: " + e));

    }

    return (

        <form onSubmit={handleExerciseSave(onExerciseSave)}
            className="flex flex-col space-y-6 divide py-2"
        >
            <div className=" rounded-md cursor-pointer p-2 focus:outline-none bg-base-100 border ">
                <div className="flex flex-col form-control align-items justify-content w-full">
                    <label className="label">
                        <span className="label-text">Exercise title</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={exercise.title}
                        placeholder="Exercise title goes here"
                        className="input input-bordered w-full max-w-xs"
                        {...register("title", { required: true })}
                    />

                    <label className="label">
                        <span className="label-text">Exercise question</span>
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
                    <h1 className='text-md font-medium'>Answers</h1>
                {   <AnswerCards update={setAnswers} initialAnswers={exercise.answers} />}
                </div>
                :
                <p>Loading ...</p>
            }

            <button type='submit' className="std-button ml-auto py-2 px-4">Save Exercise</button>
        </form>

    );
};

export default ExerciseDetail;
