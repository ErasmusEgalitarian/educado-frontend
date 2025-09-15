import { useForm, SubmitHandler } from "react-hook-form";

// Interfaces
import { toast } from "react-toastify";

import { getUserToken } from "../helpers/userInfo";
import { Lecture } from "../interfaces/Lecture";

// Helpers
import LectureService from "../services/lecture.services";

// Pop-up messages

// Hooks

import { useNotifications } from "./notification/NotificationContext";

export interface LecturePartial {
  title: string;
  description: string;
  fileRef?: string;
}

export const LectureDetail = ({
  lecture,
  lid,
}: {
  lecture: Lecture;
  lid: string;
}) => {
  const { register, handleSubmit: handleLectureSave } = useForm();
  const onLectureSave: SubmitHandler<any> = (data) => {
    updateLecture(data);
  };

  /** Token doesnt work, reimplement when it token is implemented */
  const token = getUserToken();
  const { addNotification } = useNotifications();

  const updateLecture = (data: any) => {
    const lectureToSave: LecturePartial = {
      title: data.title,
      description: data.description,
    };

    LectureService.updateLecture(lectureToSave, token, lid)
      .then(() => {
        addNotification("Aula salva com sucesso");
      }) /**  Successfully saved lecture*/
      .catch((e) =>
        toast.error("Falha ao salvar o exercício devido a um erro: " + e),
      ); /**Failed to save lecture due to error: */
  };

  /**
   * Delete lecture and reload page
   * Uses window.location.reload to refresh
   *
   * @param lid The lecture id
   * @param token The user token
   */

  const deleteLecture = async () => {
    if (confirm("Você tem certeza?")) {
      const response = await LectureService.deleteLecture(lid, token);
      const status = response.status;

      if (status >= 200 && status <= 299) {
        window.location.reload();
        addNotification("Aula excluída");
      } else if (status >= 400 && status <= 599) {
        toast.error(
          `(${status}, ${response.statusText}) while attempting to delete lecture`,
        );
      }
    }
  };

  return (
    <form
      onSubmit={handleLectureSave(onLectureSave)}
      className="flex flex-col space-y-6 divide py-2"
    >
      <div className=" rounded-md cursor-pointer p-2 focus:outline-none bg-base-100 border ">
        <div className="flex flex-col form-control align-items justify-content w-full">
          <label className="label">
            <span className="label-text">Título da aulas</span>
            {/* lecture title*/}
          </label>
          <input
            type="text"
            defaultValue={lecture.title}
            placeholder="Título da aulas" /* lecture title */
            className="input input-bordered w-full max-w-xs"
            {...register("title", { required: true })}
          />

          <label className="label">
            <span className="label-text">Conteúdo da aula </span>
            {/*lecture question*/}
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            defaultValue={lecture.description}
            placeholder="Adicione o conteúdo escrito dessa aula" /** Write the lecture description here */
            {...register("description", { required: true })}
          />
        </div>
      </div>

      <div className="flex items-left w-full mt-8">
        {/** Lecture save and delete button */}
        <button
          type="button"
          onClick={deleteLecture}
          className="left-0 std-button bg-warning hover:bg-red-800"
        >
          Excluir aulas
        </button>{" "}
        {/** Delete lecture*/}
        <button type="submit" className="std-button ml-auto py-2 px-4">
          Salvar aulas
        </button>{" "}
        {/** Save lecture */}
      </div>
    </form>
  );
};

export default LectureDetail;
