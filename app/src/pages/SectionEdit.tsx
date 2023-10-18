import useSWR from 'swr'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';



// Services
import SectionServices from '../services/section.services';
import ExerciseServices from '../services/exercise.services';

// Components
import Loading from './Loading'
import Layout from '../components/Layout'
import { ExerciseArea } from "../components/ExerciseArea";

// Interface
import { type Section } from '../interfaces/CourseDetail'
import { type Exercise } from '../interfaces/Exercise'
import { Answer } from "../interfaces/Answer";

// Icons
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon'
import { PlusIcon } from "@heroicons/react/24/outline";
import { AnswerField } from "../components/Exercise/AnswerField";

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

type ExercisePartial = {
  title: string;
  question: string;
  answers: Answer[];
};

/**
 * SectionEdit component
 *
 * @returns JSX.Element
 */
const SectionEdit = () => {
  const { cid, sid } = useParams();
  const [tempAnswers, setTempAnswer] = useState<Answer[]>([new Answer(), new Answer()]);
  const [answerFieldIndex, setAnswerFieldIndex] = useState(tempAnswers.length);
  const [answerField, setAnswerField] = useState<JSX.Element[]>([<AnswerField index={0} answerObject={tempAnswers[0]}  callback={updateAnswer}/>, <AnswerField index={1} answerObject={tempAnswers[1]}  callback={updateAnswer}/>]);

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
    toast.error("Parent course doesn't match section.");
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
  const {
    register: registerExercise,
    handleSubmit: handleExerciseAdd,
    formState: { errors: exerciseErrors },
  } = useForm<ExercisePartial>();

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

  /**
   * SubmitHandler: add exercise
   * @param exerciseData  The exercise data to be added
   * @returns     void
   */
  const onExerciseAdd: SubmitHandler<ExercisePartial> = (exerciseData) => {
    const exerciseToAdd: ExercisePartial = {
      title: exerciseData.title,
      question: exerciseData.question,
      answers: exerciseData.answers,
    };

    ExerciseServices.addExercise(exerciseToAdd, /*token,*/ sid)
      .then((res) => {
        toast.success("Added exercise");
        window.location.reload();
      })
      .catch((err) => toast.error(err));
  };

  // Render onError and onLoading
  if (sectionError) return <p>"An error has occurred."</p>;
  if (!sectionData || !exerciseData) return <Loading />;

  /**
   * Add new answer 
   * @param index index of the answer to be added
   * @returns 
   */
  function addOrGetAnswer(index: number) {
    if (tempAnswers[index] == undefined) {
      tempAnswers[index] = new Answer();
    }
    return tempAnswers[index];
  }

  /** 
   * Update answer to match inputted data
   */ 
  function updateAnswer(answerFieldIndex: number, answer: Answer) {
    tempAnswers[answerFieldIndex] = answer;
    setTempAnswer(tempAnswers);
  }

  /**
   * Add new answer field
   * 
   */
  function addAnswerField() {
    setAnswerFieldIndex(answerFieldIndex + 1);
    setAnswerField([
      ...answerField,
      <AnswerField
        index={answerFieldIndex}
        answerObject={addOrGetAnswer(answerFieldIndex)}
        callback={updateAnswer}
      />,
    ]);
  }

 
  return (
    <Layout meta="Section edit page">
      <div className="w-full" onScroll={(e) => {addAnswerField();addAnswerField();}}>
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
              <label htmlFor="title">Título</label>
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
              <label htmlFor="description">Descrição</label>
              <textarea
                rows={4}
                defaultValue={section?.description || sectionData?.description}
                placeholder={sectionData?.description}
                className="resize-none form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                {...registerSection("description", { required: false })}
              />
              {sectionErrors.description && (
                <span>Este campo é obrigatório!</span>
              )}
            </div>

            <button type="submit" className="std-button ml-auto">
              Atualizar
            </button>

          
          </form>

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
            <span className="text-xl font-medium">Add new exercise</span>
          </div>

          <form
            onSubmit={handleExerciseAdd(onExerciseAdd)}
            className="flex flex-col justify-content align-items space-evenly w-full space-y-2"
          >
            {/** Exercise Title Field */}
            <div className="form-control w-full" >
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Some awesome title"
                className="input input-bordered w-full"
                {...registerExercise("title", { required: true })}
              />
              {exerciseErrors.title && <span>This field is required</span>}
            </div>
             
            {/** Exercise Question Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Question</span>
              </label>
              <textarea 
                className="textarea textarea-bordered h-24"
                placeholder="Add a question to your exercise"
                {...registerExercise("question", { required: true })}
              />
            </div>

            {/** Exercise Answers Field */}
            {answerField}

            <div className="flex justify-between items-center border rounded p-1">
              <div>
                <button
                  className="btn" type="button"
                  onClick={() => {
                    if (answerFieldIndex < 4) {
                      addAnswerField();
                    } else {
                      toast.error("Maximum number of answers reached.");
                    }
                  }}
                >
                  <PlusIcon width={24} />
                </button>
              </div>
            </div>

            <button type="submit" className="std-button ml-auto" {...registerExercise('answers', {value: tempAnswers})}>
              Add Exercise
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SectionEdit;
