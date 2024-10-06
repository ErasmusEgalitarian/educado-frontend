import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getUserToken } from "../../helpers/userInfo";
import { useNotifications } from "../notification/NotificationContext";

// Components
import AnswerCards from "./AnswerCards";
import { ModalButtonCompont } from "../ModalButtonCompont";

// Interfaces
import { Answer } from "../../interfaces/Answer";

// Helpers
import ExerciseServices from "../../services/exercise.services";

// Pop-up messages
import { toast } from "react-toastify";
import { use } from "chai";

export interface ExercisePartial {
  title: string;
  question: string;
  answers: Answer[];
}

interface Props {
  data: any;
  handleEdit: Function;
}

type Inputs = {
  title: string;
  question: string;
};

export const EditExercise = ({ data, handleEdit }: Props) => {
  const TempAnswers = [
    { text: "", correct: true, feedback: "" },
    { text: "", correct: false, feedback: "" },
  ];

  const [answers, setAnswers] = useState<Answer[]>(data.answers);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { addNotification } = useNotifications();

  const { register, handleSubmit } = useForm<Inputs>();

  /** Token doesnt work, reimplement when it token is implemented */
  const token = getUserToken();

  const onSubmit: SubmitHandler<Inputs> = async (newData) => {
    //update
    console.log("answers", answers);
    ExerciseServices.updateExercise(
      {
        title: newData.title,
        question: newData.question,
        answers: answers,
      },
      token,
      data._id
    )

      .then(() => {
        addNotification("Exercício atualizado com sucesso");
        handleEdit(newData.title);
      })
      .catch((err) => {
        toast.error("Fracassado: " + err);
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <div
        className="modal"
        id={`exercise-edit-${data ? data._id : "new"}-modal`}
      >
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
                    defaultValue={data ? data.title : ""}
                    className="input input-bordered w-full max-w-xs"
                    {...register("title", { required: true })}
                  />

                  <label className="label">
                    <span className="label-text">Pergunta</span> {/*Question*/}
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    defaultValue={data ? data.question : ""}
                    placeholder="Adicione uma pergunta a este exercício" /*Add a question to this exercise*/
                    {...register("question", { required: true })}
                  ></textarea>
                </div>
              </div>

              {/* divider */}
              <div className="flex flex-col w-full">
                <div className="divider"></div>
              </div>

              {/* Answers. Answers sometimes doesn't get loaded hence the conditional rendering ... */}
              {
                answers ? (
                  <div className="rounded-md cursor-pointer p-2 focus:outline-none bg-base-100 border ">
                    <h1 className="text-md font-medium">Resposta</h1>{" "}
                    {/** Answer */}
                    {
                      <AnswerCards
                        update={setAnswers}
                        initialAnswers={data ? data.answers : answers}
                      />
                    }
                  </div>
                ) : (
                  <p>Carregando ...</p>
                ) /** Loading ... */
              }
              {/*Create and cancel buttons*/}
              <ModalButtonCompont
                type="edit"
                isSubmitting={isSubmitting}
                typeButtons={`exercise-edit-${data._id}`}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
