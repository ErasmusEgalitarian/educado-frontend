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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
type Inputs = {
    title: string,
    description: string
};

type SectionPartial = {
    title: string,
    description: string
}

const SectionEdit = () => {
    const { cid, sid } = useParams();
    
    const token = "dummyToken";
    //const token = useToken()

    // Component state
    const [section, setSection] = useState<Section>();
    const [exercises, setExercises] = useState<Exercise[]>([]);

    // Fetch the section data from the server.
    const { data, error: sectionError} = useSWR(
        token ? [`${BACKEND_URL}/api/section/${sid}`, token] : null,
        SectionServices.getSectionDetail
    );

    console.log(data?.parentCourse);
    if(data != undefined && data.parentCourse != cid){
        toast.error("Parent course doesn't match section.");
    }
    
    // Create Form Hooks
    
    const { register: registerSection, handleSubmit: handleSectionUpdate, formState: { errors: sectionErrors } } = useForm<Inputs>();
    //const { register: registerExercise, handleSubmit: handleExerciseAdd, formState: { errors: exerciseErrors } } = useForm();

    // Submit Handlers for function
    //const onExerciseAdd: SubmitHandler<Exercise> = data => addExercise(data);
    //const onSectionSave: SubmitHandler<Section> = data => onSubmit(data);

    // SubmitHandler: Add new exercise to section
    /*
    const addExercise = async (data: Exercise) => {
        const response = await ExerciseServices.addExercise(data, token, sid)
        const addedExercise = response.data
        sectionData.exercises.push(addedExercise)
        setExercises(sectionData.exercises)
    }*/

    // SubmitHandler: Save section update
    /*const saveSection = async (data: Section) => {
        const toSave = { ...data, ...data };
        const response = await SectionServices.saveSection(toSave, sid/*, token);*/
        /*const status = response.status

        if (status >= 200 && status <= 299) {
            toast.success("Section saved")
            setSection(response.data);
        } else if (status >= 400 && status <= 599) {
            toast.error(`(${status}, ${response.statusText}) while attempting to save section`)
        }
    }*/

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const changes: SectionPartial = {
            title: data.title,
            description: data.description
        }

        SectionServices.saveSection(changes, sid/*, token*/)
            .then(res => toast.success('Updated section'))
            .catch(err => toast.error(err));
    }

    // Render onError and onLoading
    if (sectionError) return <p>"An error has occurred."</p>;
    if (!data) return <Loading/>;

    return (
        <Layout meta='Section edit page'>
            
            <main className="h-full bg-gradient-to-br from-[#c8e5ec] to-[white]">
            <div className="w-full">
                {/** Course navigation */}
                <div className="navbar bg-base-100">
                    <div className='flex-1'>
                        <Link to={`/courses/edit/${cid}`} className="btn btn-square btn-ghost normal-case text-xl"><ArrowLeftIcon width={24} /></Link>
                        <a className="normal-case text-xl ml-4">{section?.parentCourse || "Voltar para a edição do curso"}</a>
                    </div>
                </div>

                {/** Section details edit */}
                <div className='max-w-3xl mx-auto bg-white p-4 rounded my-6'>
                    {/** Section update area */}
                    <form
                        onSubmit={handleSectionUpdate(onSubmit)}
                        className="flex flex-col space-y-6 divide"
                    >
                        {/** Section Title Field */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor='title'>Título</label>
                            <input type="text" defaultValue={section?.title || data?.title} placeholder={data?.title}
                                className="form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                {...registerSection("title", { required: true })}
                            />
                            {sectionErrors.title && <span>Este campo é obrigatório!</span>}
                        </div>

                        {/** Section Description Field */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor='description'>Descrição</label>
                            <textarea rows={4} defaultValue={section?.description || data?.description} placeholder={data?.description}
                                className="resize-none form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                {...registerSection("description", { required: false })}
                            />
                            {sectionErrors.description && <span>Este campo é obrigatório!</span>}
                        </div>

                        {/** Section Description Field */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor='LorE'>Lecture or exercise</label>
                            <select defaultValue={"Escolher categoria"} /*Choose category*/
                                    className="form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    //{...register("level", { required: true })}
                                >
                                    {/*hard coded options by PO, should be changed to get from db*/}
                                    <option>Lecture </option> {/*...*/}
                                    <option>Exercise</option> {/*...*/}
                                
                                </select>
                            
                        </div>

                        <button type="submit" className='std-button ml-auto'>Seção de atualização</button>
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
            </main>
        </Layout>
    )
}

export default SectionEdit