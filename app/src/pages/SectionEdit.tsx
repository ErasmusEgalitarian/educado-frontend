import useSWR from 'swr';
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

// Contexts
import useToken from '../hooks/useToken';

// Services
import SectionServices from '../services/section.services';
import ExerciseServices from '../services/exercise.services';

// Components
import Loading from './Loading';
import Layout from '../components/Layout';
import { ExerciseArea } from '../components/ExerciseArea'

// Interface
import { Section } from '../interfaces/CourseDetail';
import { Exercise } from '../interfaces/Exercise'

// Icons
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL + "api";

const SectionEdit = () => {
    const { cid, sid } = useParams();
    
    const token = "dummyToken";
    //const token = useToken()

    // Component state
    const [section, setSection] = useState<Section>();
    const [exercises, setExercises] = useState<Exercise[]>([]);

    // Fetch section details
   /* const { data: sectionData, error: sectionError } = useSWR(
        token ? [`${BACKEND_URL}/sections/${sid}`, token] : null,
        SectionServices.getSectionDetail
    );*/

        // Fetch the section data from the server.
    const { data: sectionData, error: sectionError} = useSWR(
         token ? [`http://127.0.0.1:8888/api/section/${sid}`, token] : null,
        SectionServices.getSectionDetail
  );

    console.log("Section title is" + sectionData.title);
    
    console.log("Section secription is" + sectionData.description);
    
    
    // Create Form Hooks
    const { register: registerSection, handleSubmit: handleSectionUpdate, formState: { errors: sectionErrors } } = useForm();
 //   const { register: registerExercise, handleSubmit: handleExerciseAdd, formState: { errors: exerciseErrors } } = useForm();

    // Submit Handlers for function
   //const onExerciseAdd: SubmitHandler<Exercise> = data => addExercise(data);
    const onSectionSave: SubmitHandler<Section> = data => saveSection(data);

    // SubmitHandler: Add new exercise to section
    const addExercise = async (data: Exercise) => {
        const response = await ExerciseServices.addExercise(data, token, sid)
        const addedExercise = response.data
        sectionData.exercises.push(addedExercise)
        setExercises(sectionData.exercises)
    }

    // SubmitHandler: Save section update
    const saveSection = async (data: Section) => {
        const toSave = { ...sectionData, ...data };
        const response = await SectionServices.saveSection(toSave, sid, token);
        const status = response.status

        if (status >= 200 && status <= 299) {
            toast.success("Section saved")
            setSection(response.data);
        } else if (status >= 400 && status <= 599) {
            toast.error(`(${status}, ${response.statusText}) while attempting to save section`)
        }
    }

    // Render onError and onLoading
    if (sectionError) return <p>"An error has occurred."</p>;
    if (!sectionData) return <Loading/>;

    return (
        <Layout meta='Section edit page'>
            <div className="w-full">
                {/** Course navigation */}
                <div className="navbar bg-base-100">
                    <div className='flex-1'>
                        <Link to={`/courses/edit/${cid}`} className="btn btn-square btn-ghost normal-case text-xl"><ArrowLeftIcon width={24} /></Link>
                        <a className="normal-case text-xl ml-4">{section?.parentCourse || "back to course edit"}</a>
                    </div>
                </div>

                {/** Section details edit */}
                <div className='max-w-3xl mx-auto bg-white p-4 rounded my-6'>
                    {/** Section update area */}
                    <form
                        onSubmit={handleSectionUpdate(onSectionSave)}
                        className="flex flex-col space-y-6 divide"
                    >
                        {/** Section Title Field */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor='title'>Title</label>
                            <input type="text" defaultValue={section?.title || sectionData?.title} placeholder={sectionData?.title}
                                className="form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                {...registerSection("title", { required: true })}
                            />
                            {sectionErrors.title && <span>This field is required</span>}
                        </div>

                        {/** Section Description Field */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor='description'>Description</label>
                            <textarea rows={4} defaultValue={section?.description || sectionData?.description} placeholder={sectionData?.description}
                                className="resize-none form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                {...registerSection("description", { required: true })}
                            />
                            {sectionErrors.description && <span>This field is required</span>}
                        </div>

                        <button type="submit" className='std-button ml-auto'>Update Section</button>
                    </form>

                    <div className="divider"></div>

                    {/** Exercise area */}
                    {/*
                    <div className='flex flex-col space-y-4 mb-4' id='exercises'>
                        <h1 className='text-xl font-medium'>Exercises</h1>
                        <ExerciseArea exercises={exercises.length > 0 ? exercises : sectionData.exercises} />
                    </div>

                    {/** New exercise area */}
                    {/*
                    <div className="flex flex-col w-full mb-4">
                        <span className="text-xl font-medium">Add new exercise</span>
                    </div>
    
                    {/*}
                    <form
                        onSubmit={handleExerciseAdd(onExerciseAdd)}
                        className="flex flex-col justify-content align-items space-evenly w-full space-y-2"
                    >
                        <div className="form-control w-full">
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
                    
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-24"
                                placeholder="Add a description to your exercise"
                                {...registerExercise("description", { required: true })}
                            />
                        </div>

                        <button type='submit' className="std-button ml-auto">Add Exercise</button>

                    </form>
                    */}
                </div>
            </div>
        </Layout>
    )
}

export default SectionEdit