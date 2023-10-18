import useSWR from 'swr'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';



// Services
import SectionServices from '../services/section.services';
import ExerciseServices from '../services/exercise.services';
import { CreateLecture } from '../components/LecturePage';
import { CreateExercise } from '../components/Exercise/CreateExercisePopUp';

// Components
import Loading from './Loading'
import Layout from '../components/Layout'
import { ExerciseArea } from "../components/ExerciseArea";
import { AnswerField } from "../components/Exercise/AnswerField";


// Interface
import { type Section } from '../interfaces/CourseDetail'
import { type Exercise } from '../interfaces/Exercise'
import { Answer } from "../interfaces/Answer";

// Icons
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon'
import { PlusIcon } from "@heroicons/react/24/outline";

// Backend URL from .env file (automatically injected) 
const backendUrl = import.meta.env.VITE_BACKEND_URL;

type Inputs = {
  title: string;
  description: string;
};

type SectionPartial = {
  title: string;
  description: string;
};


/**
 * SectionEdit component
 *
 * @returns JSX.Element
 */
const SectionEdit = () => {
  const { cid, sid } = useParams();

  const token = "dummyToken";
  //const token = useToken()

  // Component state
  const [section, setSection] = useState<Section>();
  const [exercises, setExercises] = useState<Exercise[]>([]);


  // Fetch the section data from the server.
  const { data: sectionData, error: sectionError } = useSWR(
    token ? [`${backendUrl}/api/sections/${sid}`, token] : null,
    SectionServices.getSectionDetail
  );

  console.log(sectionData?.parentCourse);
  if (sectionData != undefined && sectionData.parentCourse != cid) {
    toast.error("Parent course doesn't match section."+ sectionData.parentCourse + " " + cid);
  }

  // Fetch the exercises data from the server.
  const { data: exerciseData, error: exerciseError } = useSWR(
    token ? [`${backendUrl}/api/exercises/getall/${sid}`, token] : null,
    ExerciseServices.getExerciseDetail
  );

  // Create Form Hooks
  const {
    register: registerSection,
    handleSubmit: handleSectionUpdate,
    formState: { errors: sectionErrors },
  } = useForm<Inputs>();


  /**
   * SubmitHandler: update section
   *
   * @param sectionData  The section data to be updated
   * @returns     void
   */
  const onSubmit: SubmitHandler<Inputs> = (sectionData) => {
    const changes: SectionPartial = {
      title: sectionData.title,
      description: sectionData.description,
    };

    SectionServices.saveSection(changes, sid /*, token*/)
      .then((res) => toast.success("Updated section"))
      .catch((err) => toast.error(err));
  };



  // Render onError and onLoading
  if (sectionError) return <p>"An error has occurred."</p>;
  if (!sectionData || !exerciseData) return <Loading />;
 
  return (
    <Layout meta="Section edit page">
        {/** Course navigation */}
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link
              to={`/courses/edit/${cid}`}
              className="btn btn-square btn-ghost normal-case text-xl"
            >
              <ArrowLeftIcon width={24} />
            </Link>
            <a className="normal-case text-xl ml-4">
              {section?.parentCourse || "Voltar para a edição do curso"}
            </a>
          </div>
        </div>

        {/** Section details edit */}
        <div className="max-w-3xl mx-auto bg-white p-4 rounded my-6">
          {/** Section update area */}
          <form
            onSubmit={handleSectionUpdate(onSubmit)}
            className="flex flex-col space-y-6 divide"
          >
            {/** Section Title Field */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="title">Título</label> {/*Titel */}
              <input
                type="text"
                defaultValue={section?.title || sectionData?.title}
                placeholder={sectionData?.title}
                className="form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                {...registerSection("title", { required: true })}
              />
              {sectionErrors.title && <span>Este campo é obrigatório!</span>}
            </div>

            {/** Section Description Field */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="description">Descrição</label> {/**Description */}
              <textarea
                rows={4}
                defaultValue={section?.description || sectionData?.description}
                placeholder={sectionData?.description}
                className="resize-none form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                {...registerSection("description", { required: false })}
              />
              {sectionErrors.description && (
                <span>Este campo é obrigatório!</span> /**This field is obligator */
              )}
            </div>

            <button type="submit" className="std-button ml-auto">
              Atualizar
            </button>
          
          </form>
              

          <div className="divider"></div>
          
          <div className="navbar bg-none p-6">
              <div className="flex-1">
                  
              {/** Create new lecture */}
              <CreateLecture />
              </div>
          </div>

          <div className="divider"></div>

          {/** Exercise area */}

          <div className="flex flex-col space-y-4 mb-4" id="exercises">
            <h1 className="text-xl font-medium">Exercises</h1>
            <ExerciseArea
              exercises={
                exercises.length > 0 ? exercises : exerciseData
              }
            />
          </div>

          {/** New exercise area */}

          <div className="flex flex-col w-full mb-4">
            <span className="text-xl font-medium">Adicionar novo exercício.</span> {/* Add new exercise*/}
          </div>
          
          <div className="divider"></div>
          
          <div className="navbar bg-none p-6">
              <div className="flex-1">
                  
              {/** Create new lecture */}
              <CreateExercise sid={sid} cid={cid}/>
              </div>
          </div>


        </div>
    </Layout>
  );
};

export default SectionEdit;
