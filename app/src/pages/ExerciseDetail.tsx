import { useState, } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Components
//import DropZoneComponent from "../components/Exercise/dropZone";
import AnswerCards from "../components/Exercise/AnswerCards";

// Interfaces
import { Answer } from "../interfaces/Answer";
import { Exercise } from "../interfaces/Exercise"

// Helpers
import ExerciseServices from "../services/exercise.services";

// Video Player
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

// Hooks
import useToken from "../hooks/useToken";

export interface ExercisePartial {
    id: string,
    sectionId: string,
    title: string,
    description: string,
    exerciseNumber: number,
    content?: any,
    onWrongFeedback?: any,
    answers: Answer[]
}

/*
export const ExerciseDetail = ({ exercise, eid }: { exercise: Exercise, eid: string }) => {

    const [onWrongFeedbackFile, setonWrongFeedbackFile] = useState<any>();
    const [mainContentFile, setMainContentFile] = useState<any>();
    const [answers, setAnswers] = useState<Answer[]>(exercise.answers);

    const { register, handleSubmit: handleExerciseSave, formState: { errors } } = useForm();
    const onExerciseSave: SubmitHandler<any> = data => saveExercise(data);

    //const token = useAuthStore(state => state.token);
    const token = useToken();

    const saveExercise = (data: any) => {

        {/** (3.12.22) Current version of mobile app requires exactly 4 answers *//* }
        if (answers.length < 4 || answers.length > 4) {
            toast.error("Please set 4 answers before saving exercise")
            return
        }

        const exerciseToSave: ExercisePartial = {
            id: exercise.id,
            sectionId: exercise.sectionId || "",
            title: data.title,
            description: data.description,
            exerciseNumber: exercise.exerciseNumber,
            answers: answers
        }

        if (mainContentFile) exerciseToSave.content = mainContentFile;
        if (onWrongFeedbackFile) exerciseToSave.onWrongFeedback = onWrongFeedbackFile;

        console.log(exerciseToSave);

        ExerciseServices.saveExercise(exerciseToSave, token)
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
                        <span className="label-text">Exercise description</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-24"
                        defaultValue={exercise.description}
                        placeholder="Here you can describe the exercise"
                        {...register("description", { required: true })}
                    ></textarea>

                </div>
            </div>

            {/* Content video *//*}
            <div className="rounded-md cursor-pointer p-2 focus:outline-none bg-base-100 border ">
                {exercise.content ?
                    <div>
                        <h1 className='text-md font-medium'>Content video</h1>
                        <ReactPlayer url={exercise.content} controls={true} light={true} />
                    </div> :
                    <h1 className='text-md font-medium'>Content video not uploaded</h1>
                }

                <DropZoneComponent update={setMainContentFile} storageKey={`${exercise.id}/mainContent`} />
            </div>

            {/* divider *//*}
            <div className="flex flex-col w-full">
                <div className="divider"></div>
            </div>

            {/* feedback Video *//*}
            <div className="rounded-md cursor-pointer p-2 focus:outline-none bg-base-100 border ">
                {exercise.onWrongFeedback ?
                    <div>
                        <h1 className='text-md font-medium'>Feedback video (on wrong answer)</h1>
                        <ReactPlayer url={exercise.onWrongFeedback} controls={true} light={true} />
                    </div> :
                    <h1 className='text-md font-medium'>Feedback video (on wrong answer) not uploaded</h1>
                }
                <DropZoneComponent update={setonWrongFeedbackFile} storageKey={`${exercise.id}/feedbackContent`} />
            </div>

            {/* Answers. Answers sometimes doesn't get loaded hence the conditional rendering ... *//*}
            {answers ?
                <div className="rounded-md cursor-pointer p-2 focus:outline-none bg-base-100 border ">
                    <h1 className='text-md font-medium'>Answers</h1>
                    <AnswerCards update={setAnswers} initialAnswers={answers} />
                </div>
                :
                <p>Loading ...</p>
            }

            <button type='submit' className="std-button ml-auto py-2 px-4">Save Exercise</button>
        </form>

    );
};

export default ExerciseDetail;
*/