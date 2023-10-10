import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from 'swr';
import {Dropzone} from '../Dropzone/Dropzone'; // Used for the cover image upload  



// Contexts
// import useAuthStore from '../../contexts/useAuthStore';

// Hooks
import useToken from '../../hooks/useToken';

// Services
import CourseServices from '../../services/course.services';
import StorageService from '../../services/storage.services';


// Icons
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Navigate, useNavigate } from 'react-router-dom';
import { eventType } from 'aws-sdk/clients/health';
import { integer } from 'aws-sdk/clients/lightsail';
import StorageServices from '../../services/storage.services';


type Inputs = {
    title: string,
    category: string,
    level: string,
    time: number,
    description: string,
};



/**
 * This component is a modal that opens when the user clicks on the button to create a new course.
 * It has a form to input the data of the new course.
 *
 * @returns HTML Element
 */
export const CreateCourseModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const token = useToken();
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();

    

    // use-form setup
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    /**
     * Function to handle the submit of the form
     * 
     * @param {Inputs} data The data from each field in the form put into an object
     */
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        

        setIsLoading(true);
        CourseServices.createCourse({
            title: data.title,
            category: data.category,
            level: data.level,
            time: data.time,
            description: data.description,
        }, token)
            .then(res =>{ console.log(res); navigate(`/Courses/edit/${res.data._id}`)}) 
            .catch(err => console.log(err))
            .finally(() => { mutate("http://127.0.0.1:8888/api/courses/");  });
    };
    return (
        <>
            {/* The button to open modal */}
            <label htmlFor="course-create" className="btn flex modal-button  space-x-2">
                <PencilSquareIcon className='w-5 h-5' />
                <p className='font-normal'>Criar novo curso</p>
            </label>
            
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="course-create" className="modal-toggle" />
            {
                onclick = function () {StorageServices.uploadFile({bucketName: "educado-bucket", id: "testFoto", filePath: "c:/Users/perni/Downloads/settings_icon.png"});}
            }
            {/*Text shown in the top of create course*/}
            <div className="modal" id="course-create-modal">
                <div className="modal-box bg-gradient-to-b from-primaryLight rounded w-11/12 max-w-xl">
                    <h3 className="font-bold text-lg">Crie seu novo curso!</h3>
                    <p className="py-4">Preencha o formulário e comece seu novo curso!</p>
                   
                    {/*Field to input the title of the new course*/}
                    <form className="flex h-full flex-col justify-between space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='title'>Título</label> {/*Title*/}
                            <input type="text" defaultValue={""}
                                className="form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...register("title", { required: true })}
                            />
                            {errors.title && <span className='text-warning'>Este campo é obrigatório</span>}
                        </div>
                
                            {/*Field to choose a category from a list of options*/}
                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='category'>Categoria</label>
                            <select 
                                className="form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...register("category", { required: true })}
                            >
                                {/*Hard coded options by PO, should be changed to get from db*/}
                                <option>Finanças pessoais </option> {/*Personal Finance*/}
                                <option>Saúde e Segurança no Trabalho </option> {/*Health and Workplace Safety*/}
                                <option>Costura </option> {/*Sewing*/}
                                <option>Eletrônica </option> {/*Electronics*/}
                            </select>
                            {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}
                        </div>

                        <div className="flex items-center gap-8 w-full mt-8">
                            
                            {/*Cover image feild is made but does not interact with the db*/}
                            <div className="flex flex-col space-y-2 text-left">    
                            <label htmlFor='cover-image'>Imagem de capa</label>
                                    <Dropzone></Dropzone>
                                {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}
                            </div>

                            {/*Field to select a level from a list of options*/}
                            <div  className="flex flex-col space-y-2 text-left">
                                <label htmlFor='level'>Nível</label> {/*Level*/}
                                <select
                                    className="small-form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    {...register("level", { required: true })}
                                >
                                    {/*Hard coded options by PO, should be changed to get from db*/}
                                    <option>Iniciante </option> {/*Beginner*/}
                                    <option>Intermediário</option> {/*Intermediate*/}
                                    <option>Avançado </option> {/*Advanced*/}
                                
                                </select>
                                {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}
                            </div>

                            {/*Field to input the estimated time*/}
                            <div  className="flex flex-col space-y-2 text-left">
                                <label htmlFor='title'>Tempo estimado</label> {/*Estimated time*/}
                                <input type="number" defaultValue={""} min={0} step={1}
                                    className="form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    {...register("time", { required: true })}
                                />
                                {errors.title && <span className='text-warning'>Este campo é obrigatório</span>}
                            </div>
                       
                        </div>

                        {/*Field to input the description of the course*/}
                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='description'>Descrição</label> {/*Description*/}
                            <textarea rows={4} defaultValue={""}
                                className="resize-none form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...register("description", { required: true })}
                            />
                            {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}
                        </div>

                        {/*Create and cancel buttons*/}
                        <div className='modal-action'>
                            <div className="flex items-center justify-between gap-4 w-full mt-8">
                                <label htmlFor='course-create' className=" bg-primary hover:bg-primaryHover border border-primary focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                                    <button type="submit" className='py-2 px-4 h-full w-full'>
                                        Criar
                                    </button>
                                </label>
                                <label htmlFor='course-create' className="py-2 px-4 bg-white hover:bg-gray-100 border border-primary  hover:border-primaryHover hover:text-primaryHover  text-primary w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                                    Cancelar
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
