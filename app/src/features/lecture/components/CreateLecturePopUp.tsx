import { mdiInformationSlabCircleOutline } from "@mdi/js";
import { Icon } from "@mdi/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

// Contexts
// import useAuthStore from '../../contexts/useAuthStore';
// Hooks
import { Dropzone } from "../common/components/dropzone";
import LectureService from "../services/lecture.services";
import StorageServices from "../services/storage.services";
import { getUserToken } from "../user/utilities/get-local-user";

// Services

//components
import { ModalButtonCompont } from "./ModalButtonCompont";
import { useNotifications } from "./notification/NotificationContext";
import RichTextEditor from "./RichTextEditor";
// Icons

<Icon path={mdiInformationSlabCircleOutline} size={1} />;

interface Inputs {
  title: string;
  description: string;
  contentType: string;
  content: string;
}

interface Props {
  savedSID: string;
  handleLectureCreation: Function;
}
/**
 * This component is a modal that opens when the user clicks on the button to create a new lecture.
 * It has a form to input the data of the new lecture.
 *
 * @returns HTML Element
 */
export const CreateLecture = ({ savedSID, handleLectureCreation }: Props) => {
  //TODO: When tokens are done, Remove dummy token and uncomment useToken
  const token = getUserToken();

  //const sid = window.location.pathname.split("/")[2];

  // use-form setup
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [contentType, setContentType] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editorValue, setEditorValue] = useState<string>("");
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [lectureVideo, setLectureVideo] = useState<File | null>(null);

  const { addNotification } = useNotifications();

  const toggler = (value: string) => {
    setContentType(value);
  };

  /**
   * Function to handle the submit of the form
   *
   * @param {Inputs} data The data from each field in the form put into an object
   */
  const onSubmit: SubmitHandler<Inputs> = async (newData) => {
    setIsSubmitting(true);
    LectureService.addLecture(
      {
        title: newData.title,
        description: newData.description,
        contentType: newData.contentType,
        content: newData.content,
      },
      token,
      savedSID
    )
      .then((res) => {
        if (lectureVideo !== null) {
          StorageServices.uploadFile({
            id: res.data.compId,
            file: lectureVideo,
            parentType: "l",
          });
        }
        LectureService.updateLecture(res.data, token, res.data._id);
        console.log("lecture created:", res);
        handleLectureCreation(res.data);
        setIsSubmitting(false);
        clearLectureModalContent();
        addNotification("Aula criada com sucesso");
      })
      .catch((err) => {
        toast.error("Fracassado: " + err);
        setIsSubmitting(false);
      });
  };

  function clearLectureModalContent() {
    reset();
    setContentType("");
  }

  const handleEditorChange = (value: string) => {
    setEditorValue(value); // Update local state
    setValue("content", value); // Manually set form value
  };

  return (
    <>
      {/*Text shown in the top of create lecture*/}
      <div className="modal" id={`lecture-create-${savedSID}-modal`}>
        <div className="modal-box bg-gradient-to-b from-primaryLight rounded w-11/12 max-w-xl">
          <h3 className="font-bold text-lg">Crie sua nova aula</h3>{" "}
          {/*Create your new lecture!*/}
          <p className="py-4">
            Preencha o formulário e inicie sua nova aula!
          </p>{" "}
          {/*Fill out the form and start your new lecture!*/}
          {/*Field to input the title of the new lecture*/}
          <form
            className="flex h-full flex-col justify-between space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-2 text-left">
              <label htmlFor="title">Título</label> {/*Title*/}
              <input
                type="text"
                placeholder="Insira o título da aula"
                defaultValue=""
                className="form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-warning">Este campo é obrigatório</span>
              )}
            </div>
            {/*Field to input the description of the lecture*/}
            <div className="flex flex-col space-y-2 text-left">
              <label htmlFor="description">Descrição</label> {/*Description*/}
              <textarea
                rows={4}
                placeholder="Insira o conteúdo escrito dessa aula"
                defaultValue=""
                className="resize-none form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                {...register("description", { required: true })}
              />
              {/*defaultValue=Add a description to your lecture*/}
              {errors.description && (
                <span className="text-warning">Este campo é obrigatório</span>
              )}
            </div>
            <label htmlFor="content-type">Tipo de conteúdo</label>{" "}
            {/*Content type*/}
            <div className="flex flex-row space-x-8">
              <div>
                <label htmlFor="radio1">
                  <input
                    type="radio"
                    className="mr-2"
                    id="radio1"
                    value="video"
                    checked={contentType === "video" ? true : false}
                    {...register("contentType", { required: true })}
                    onChange={(e) => {
                      toggler(e.target.value);
                    }}
                  />
                  Video
                </label>
              </div>

              <div>
                <label htmlFor="radio2" className="space-x-2">
                  <input
                    type="radio"
                    className="mr-2"
                    id="radio2"
                    value="text"
                    checked={contentType === "text"}
                    {...register("contentType", { required: true })}
                    onChange={(e) => {
                      toggler(e.target.value);
                    }}
                  />
                  Texto Estilizado
                </label>
              </div>

              {errors.contentType && (
                <span className="text-warning">Este campo é obrigatório</span>
              )}
            </div>
            {/*One day this will be file*/}
            <div className="flex flex-col space-y-2 text-left">
              {contentType === "video" ? (
                <>
                  <label htmlFor="cover-image">
                    Arquivo de entrada: vídeo ou imagem
                  </label>{" "}
                  {/*Input file*/}
                  <Dropzone
                    inputType="video"
                    id="0"
                    onFileChange={setLectureVideo}
                  />
                </>
              ) : contentType === "text" ? (
                <>
                  <label htmlFor="content">Formate o seu texto abaixo</label>
                  <RichTextEditor
                    value={editorValue}
                    onChange={handleEditorChange}
                  />
                </>
              ) : (
                <p />
              )}
              {/* {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}*/}
            </div>
            {/*Create and cancel buttons*/}
            <ModalButtonCompont
              isSubmitting={isSubmitting}
              typeButtons={`lecture-create-${savedSID}`}
              type="create"
            />
          </form>
        </div>
      </div>
    </>
  );
};
