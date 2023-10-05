import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from 'swr';
import {Dropzone} from '../Dropzone/Dropzone';   



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
import Icon from '@mdi/react';
import { mdiInformationSlabCircleOutline } from '@mdi/js';
import { eventType } from 'aws-sdk/clients/health';
import { integer } from 'aws-sdk/clients/lightsail';
import StorageServices from '../../services/storage.services';


<Icon path={mdiInformationSlabCircleOutline} size={1} />

type Inputs = {
    title: string,
    category: string,
    level: string,
    time: number,
    description: string,
};




export const CreateCourseModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const token = useToken();
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();

    

    // use-form setup
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    // success on submit handler
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        

        setIsLoading(true);
        CourseServices.createCourse({
            title: data.title,
            category: data.category,
            level: data.level,
            time: data.time,
            description: data.description,
        }, token)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .finally(() => { mutate("http://127.0.0.1:8888/api/courses/"); navigate("/courses") });
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
            <div className="modal" id="course-create-modal">
                <div className="modal-box bg-gradient-to-b from-primaryLight rounded w-11/12 max-w-xl">
                    <h3 className="font-bold text-lg">Crie seu novo curso!</h3>
                    <p className="py-4">Preencha o formulário e comece seu novo curso!</p>
                   

                    <form className="flex h-full flex-col justify-between space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='title'>Título</label>
                            <input type="text" defaultValue={""}
                                className="form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...register("title", { required: true })}
                            />
                            {errors.title && <span className='text-warning'>Este campo é obrigatório</span>}
                        </div>

                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='category'>Categoria</label>
                            <select defaultValue={"Escolher categoria"} /*Choose category*/
                                className="form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...register("category", { required: true })}
                            >
                                {/*hard coded options by PO, should be changed to get from db*/}
                                <option>Finanças pessoais </option> {/*Personal Finance*/}
                                <option>Saúde e Segurança no Trabalho </option> {/*Health and Workplace Safety*/}
                                <option>Costura </option> {/*Sewing*/}
                                <option>Eletrônica </option> {/*Electronics*/}
                            </select>
                            {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}
                        </div>

                        <div className="flex items-center gap-8 w-full mt-8">
                            
                            {/*cover image feild is made but does not interact with the db*/}
                            <div className="flex flex-col space-y-2 text-left">    
                            <label htmlFor='cover-image'>Imagem de capa</label>
                                    <Dropzone></Dropzone>
                                {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}
                            </div>

                            <div  className="flex flex-col space-y-2 text-left">
                                <label htmlFor='level'>Nível</label>
                                <select defaultValue={"Escolher categoria"} /*Choose category*/
                                    className="small-form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    {...register("level", { required: true })}
                                >
                                    {/*hard coded options by PO, should be changed to get from db*/}
                                    <option>Iniciante </option> {/*...*/}
                                    <option>Intermediário</option> {/*...*/}
                                    <option>Avançado </option> {/*...*/}
                                
                                </select>
                                {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}
                            </div>

                            <div  className="flex flex-col space-y-2 text-left">
                                <label htmlFor='title'>Tempo estimado</label>
                                <input type="number" defaultValue={""} min={0} step={1}
                                    className="extra-small-form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    {...register("time", { required: true })}
                                />
                                {errors.title && <span className='text-warning'>Este campo é obrigatório</span>}
                            </div>
                        
                       
                        </div>

                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='description'>Descrição</label>
                            <textarea rows={4} defaultValue={""}
                                className="resize-none form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...register("description", { required: true })}
                            />
                            {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}
                        </div>

                        <div className='modal-action'>
                            <div className="flex items-center justify-between gap-4 w-full mt-8">
                                <label htmlFor='course-create' className="py-2 px-4  bg-primary hover:bg-primaryHover focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                                    <button type="submit">
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
