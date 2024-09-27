import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

// Services
import CourseServices from '../../services/course.services';
import StorageService from '../../services/storage.services';

// Helpers
import { getUserInfo } from '../../helpers/userInfo';
import categories from "../../helpers/courseCategories";

// Components
import { Dropzone } from '../Dropzone/Dropzone';
import { ToolTipIcon } from '../ToolTip/ToolTipIcon';
import Layout from '../Layout';

// Interface
import { Course } from '../../interfaces/Course';

interface CourseComponentProps {
  token: string;
  id: string | undefined;
  setTickChange: Function;
  setId: Function;
  courseData?: any;
  updateHighestTick: Function;
}

export const CourseComponent = ({ token, id, setTickChange, setId, courseData, updateHighestTick }: CourseComponentProps) => {
  const [coverImg, setCoverImg] = useState<File | null>();
  const [categoriesOptions, setCategoriesOptions] = useState<JSX.Element[]>([]);
  const [statusSTR, setStatusSTR] = useState<string>("draft");
  const [statusChange, setStatusChange] = useState<boolean>(false);
  const [toolTipIndex, setToolTipIndex] = useState<number>(4);
  const [charCount, setCharCount] = useState<number>(0);
  const [isLeaving, setIsLeaving] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Course>();

  const navigate = useNavigate();

  useEffect(() => {
    const inputArray = ["personal finance", "health and workplace safety", "sewing", "electronics"];
    setCategoriesOptions(inputArray.map((categoryENG: string, key: number) => (
      <option value={categoryENG} key={key}>{categories[inputArray[key]]?.br}</option>
    )));
  }, []);

  useEffect(() => {
    if (courseData) {
      setStatusSTR(courseData.status);
      setCharCount(courseData.description.length);
    }
  }, [courseData]);

  const onSubmit: SubmitHandler<Course> = (data) => {
    let newStatus = statusSTR;

    if (statusChange) {
      newStatus = statusSTR === "draft" ? "published" : "draft";
      setStatusChange(false);
    }

    if (!isLeaving || confirm("Você tem certeza?") === true) {
      StorageService.uploadFile({ id: id, file: coverImg, parentType: "c" });

      const changes: Course = {
        title: data.title,
        description: data.description,
        category: data.category,
        difficulty: data.difficulty,
        status: newStatus,
        creator: getUserInfo().id,
        estimatedHours: data.estimatedHours,
        coverImg: id + "_" + "c"
      };

      if (id !== "0") {
        CourseServices.updateCourseDetail(changes, id, token)
          .then(() => {
            toast.success('Curso atualizado');
            setStatusSTR(changes.status);
            updateHighestTick(1); // Update highest tick

            if (isLeaving) {
              window.location.href = "/courses";
            } else {
              setTickChange(1);
              navigate(`/courses/manager/${id}/1`);
            }
          })
          .catch(err => toast.error(err));
      } else {
        CourseServices.createCourse(changes, token)
          .then(res => {
            toast.success('Curso criado');
            setId(res.data._id);
            updateHighestTick(1); // Update highest tick

            if (isLeaving) {
              window.location.href = "/courses";
            } else {
              setTickChange(1);
              navigate(`/courses/manager/${res.data._id}/1`);
            }
          })
          .catch(err => toast.error(err));
      }
    }

    setIsLeaving(false);
  };

  return (
    <div>
      <div className='w-full flex flex-row py-5'>
        <h1 className="text-2xl text-left font-bold justify-between space-y-4"> Informações gerais </h1>
        <ToolTipIcon index={0} toolTipIndex={toolTipIndex} text={"👩🏻‍🏫Nossos cursos são separados em seções e você pode adicionar quantas quiser!"} tooltipAmount={2} callBack={setToolTipIndex} />
      </div>

      <div className="w-full float-right bg-white rounded-lg shadow-lg justify-between space-y-4 p-10">
        <form className="flex h-full flex-col justify-between space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2 text-left">
            <label htmlFor='title'>Nome do curso</label>
            <input id="title-field" type="text" defaultValue={courseData ? courseData.title : ""} placeholder={courseData ? courseData.title : ""}
              className="form-field  bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              {...register("title", { required: true })}
            />
            {errors.title && <span className='text-warning'>Este campo é obrigatório</span>}
          </div>

          <div className="flex items-center gap-8 w-full mt-8">
            <div className="flex flex-col w-1/2 space-y-2 text-left">
              <label htmlFor='level'>Nível</label>
              <select id="difficulty-field"
                defaultValue={courseData ? courseData.difficulty : "Selecione o nível"}
                className="bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                {...register("difficulty", { required: true })}>
                <option disabled> Selecione o nível</option>
                <option value={1}>Iniciante</option>
                <option value={2}>Intermediário</option>
                <option value={3}>Avançado</option>
              </select>
              {errors.difficulty && <span className='text-warning'>Este campo é obrigatório</span>}
            </div>

            <div className="flex flex-col w-1/2 space-y-2 text-left">
              <label htmlFor='category'>Categoria</label>
              <select id="category-field"
                defaultValue={courseData ? courseData.category : "Selecione a categoria"}
                className="bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                {...register("category", { required: true })}>
                <option value={"Selecione a categoria"} disabled> Selecione a categoria</option>,
                {categoriesOptions}
              </select>
              {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <label className='text-left' htmlFor='description'>Descrição </label>
              <ToolTipIcon index={1} toolTipIndex={toolTipIndex} text={"😉 Dica: insira uma descrição que desperte a curiosidade e o interesse dos alunos"} tooltipAmount={2} callBack={setToolTipIndex} />
            </div>
            <textarea id="description-field" maxLength={400} rows={4}
              defaultValue={courseData ? courseData.description : ""}
              placeholder={courseData ? courseData.description : ""}
              className="resize-none form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-secondary"
              {...register("description", { required: true })}
              onChange={(e) => setCharCount(e.target.value.length)}
            />
            {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}
            <div className='text-right'>
              <label htmlFor="">{charCount}/400</label>
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-2 text-left">
              <label htmlFor='cover-image'>Imagem de capa</label>
            </div>
            <Dropzone inputType='image' callBack={setCoverImg} />
            {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}
          </div>
          <div className='text-right'>
            <label htmlFor="">o arquivo deve conter no máximo 10Mb</label>
          </div>

          <div className='modal-action'>
            <div className="flex items-center justify-between gap-4 w-full mt-8">
              <label onClick={() => { navigate("/courses") }} htmlFor='course-create' className="cursor-pointer underline py-2 px-4 bg-transparent hover:bg-warning-100 text-warning w-full transition ease-in duration-200 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                Cancelar e Voltar
              </label>

              <label htmlFor='course-create' className="ml-56 underline py-2 px-4 bg-transparent hover:bg-primary-100 text-primary w-full transition ease-in duration-200 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                <button id="SaveAsDraft" onClick={() => setIsLeaving(true)} type="submit" className='underline'>
                  Salvar como Rascunho
                </button>
              </label>
              <label htmlFor='course-create' className="h-12 p-2 bg-primary hover:bg-primary focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                <button type="submit" id="addCourse" className='py-2 px-4 h-full w-full cursor-pointer'>
                  Adicionar seções
                </button>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};