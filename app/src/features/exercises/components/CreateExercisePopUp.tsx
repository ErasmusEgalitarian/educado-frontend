import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { useNotifications } from "../../../common/context/NotificationContext";
import { Answer } from "../../../common/unknown/interfaces/Answer";
import { ModalButtonCompont } from "../../../components/ModalButtonCompont";
import ExerciseServices from "../../services/exercise.services";
import { getUserToken } from "../../user/utilities/get-local-user";

import AnswerCards from "./AnswerCards";
// Components

// Interfaces

// Helpers

// Pop-up messages

export interface ExercisePartial {
  title: string;
  question: string;
  answers: Answer[];
}

interface Props {
  savedSID: string;
  data: any;
  handleExerciseCreation: Function;
}

interface Inputs {
  title: string;
  question: string;
}

export const CreateExercise = ({ savedSID, handleExerciseCreation }: Props) => {
  const TempAnswers = [
    { text: "", correct: true, feedback: "" },
    { text: "", correct: false, feedback: "" },
  ];

  const [answers, setAnswers] = useState<Answer[]>(TempAnswers);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { addNotification } = useNotifications();

  /** Token doesnt work, reimplement when it token is implemented */
  const token = getUserToken();

  const onSubmit: SubmitHandler<Inputs> = async (newData) => {
    setIsSubmitting(true);
    ExerciseServices.addExercise(
      {
        title: newData.title,
        question: newData.question,
        answers: answers,
      },
      token,
      savedSID
    )
      .then((res) => {
        addNotification("Exercício criado com sucesso");
        handleExerciseCreation(res.data);
        reset();
        setIsSubmitting(false);
        setAnswers(TempAnswers);
      }) /** Successfully created exercise */

      .catch((err) => {
        toast.error("Fracassado: " + err);
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <div className="modal" id={`exercise-create-"new"}-modal`}>
        <div className="bg-white bg-gradient-to-b rounded w-3/8 h-5/6">
          <div className="p-5 bg-gradient-to-b from-primaryLight overflow-auto h-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-6 divide py-2"
            >
              <div className="rounded-md cursor-pointer p-2 focus:outline-none bg-base-100 border">
                <div className="flex flex-col form-control align-items justify-content w-full">
                  <label className="label">
                    <span className="label-text">Título</span> {/*Title*/}
                  </label>
                  <input
                    type="text"
                    placeholder="Adicione um título a este exercício" /*Add a title to this exercise*/
                    defaultValue=""
                    className="input input-bordered w-full max-w-xs"
                    {...register("title", { required: true })}
                  />

                  <label className="label">
                    <span className="label-text">Pergunta</span> {/*Question*/}
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    defaultValue=""
                    placeholder="Adicione uma pergunta a este exercício" /*Add a question to this exercise*/
                    {...register("question", { required: true })}
                  />
                </div>
              </div>

              {/* divider */}
              <div className="flex flex-col w-full">
                <div className="divider" />
              </div>

              {/* Answers. Answers sometimes doesn't get loaded hence the conditional rendering ... */}
              {
                answers ? (
                  <div className="rounded-md cursor-pointer p-2 focus:outline-none bg-base-100 border ">
                    <h1 className="text-md font-medium">Resposta</h1>{" "}
                    {/** Answer */}
                    <AnswerCards update={setAnswers} initialAnswers={answers} />
                  </div>
                ) : (
                  <p>Carregando ...</p>
                ) /** Loading ... */
              }
              {/*Create and cancel buttons*/}
              <ModalButtonCompont
                type="create"
                isSubmitting={isSubmitting}
                typeButtons={`exercise-create-${savedSID}`}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
