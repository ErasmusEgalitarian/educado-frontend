import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from 'swr';
import {Dropzone} from './Dropzone/Dropzone'; // Used image or video upload NOT IMPLEMENTED YET

// Contexts
// import useAuthStore from '../../contexts/useAuthStore';
// Hooks
import useToken from '../hooks/useToken';

// Services
import StorageService from '../services/storage.services';


// Icons
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Navigate, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiInformationSlabCircleOutline } from '@mdi/js';
import { eventType } from 'aws-sdk/clients/health';
import { integer } from 'aws-sdk/clients/lightsail';
import StorageServices from '../services/storage.services';
import LectureService from '../services/lecture.services';


<Icon path={mdiInformationSlabCircleOutline} size={1} />


type Inputs = {
    title: string,
    description: string,
    file: any
};


/**
 * This component is a modal that opens when the user clicks on the button to create a new lecture.
 * It has a form to input the data of the new lecture.
 *
 * @returns HTML Element
 */
export const CreateLecture = () => {
    const [isLoading, setIsLoading] = useState(false);
    const token = "dummyToken";
    //const token = useToken();
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();
    const cid = window.location.pathname.split("/")[3];
    const sid = window.location.pathname.split("/")[5];

    // use-form setup
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    /**
     * Function to handle the submit of the form
     * 
     * @param {Inputs} data The data from each field in the form put into an object
     */
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        
        setIsLoading(true);
        LectureService.addLecture({
            title: data.title,
            description: data.description,
            content: data.file
        }, token, sid)
            .then(res =>{ console.log(res); navigate(`/courses/edit/${cid}/sections/edit/${sid}/lectures/edit/${res.data._id}`)}) 
            .catch(err => console.log(err))
            .finally(() => { /*mutate(``); //Don't currently do anything*/  });
    };
    return (
        <>
            {/* The button to open create lecture modal */}
            <label htmlFor="lecture-create" className="btn flex modal-button space-x-2 bg-primary border-primary">
                <PencilSquareIcon className='w-5 h-5' />
                <p className='font-normal' >create new lecture</p>
            </label>
            
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="lecture-create" className="modal-toggle" />
            {
                onclick = function () {StorageServices.uploadFile({bucketName: "educado-bucket", id: "testFoto", filePath: "c:/Users/perni/Downloads/settings_icon.png"});}
            }
            {/*Text shown in the top of create lecture*/}
            <div className="modal" id="lecture-create-modal">
                <div className="modal-box bg-gradient-to-b from-primaryLight rounded w-11/12 max-w-xl">
                    <h3 className="font-bold text-lg">Create your new lecture</h3>
                    <p className="py-4">Fill out the form and start your new lecture!</p>
                   
                    {/*Field to input the title of the new lecture*/}
                    <form className="flex h-full flex-col justify-between space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='title'>Título</label> {/*Title*/}
                            <input type="text" defaultValue={""}
                                className="form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...register("title", { required: true })}
                            />
                            {errors.title && <span className='text-warning'>Este campo é obrigatório</span>}
                        </div>
            
            
                        {/*<div className="flex items-center gap-8 w-full mt-8">*/}
                         

                        {/*Field to input the description of the lecture*/}
                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='description'>Descrição</label> {/*Description*/}
                            <textarea rows={4} defaultValue={""}
                                className="resize-none form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...register("description", { required: true })}
                            />
                            {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}
                        </div>

                        {/*One day this will be file*/}
                        <div className="flex flex-col space-y-2 text-left">    
                            <label htmlFor='cover-image'>Input file: video or image</label>
                                    <Dropzone></Dropzone>
                               {/* {errors.description && <span className='text-warning'>Este campo é obrigatório</span>}*/}
                            </div>

                        {/*Create and cancel buttons*/}
                        <div className='modal-action'>
                            <div className="flex items-center justify-between gap-4 w-full mt-8">
                                <label htmlFor='lecture-create' className=" bg-primary hover:bg-primaryHover border border-primary focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                                    <button type="submit" className='py-2 px-4 h-full w-full'>
                                        Criar
                                    </button>
                                </label>
                                <label htmlFor='lecture-create' className="py-2 px-4 bg-white hover:bg-gray-100 border border-primary  hover:border-primaryHover hover:text-primaryHover  text-primary w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
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
