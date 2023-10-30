import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from 'swr';
import {Dropzone} from '../Dropzone/Dropzone';

// Contexts
// import useAuthStore from '../../contexts/useAuthStore';

// Helpers
import categories from "../../helpers/courseCategories";

// Hooks
import useToken from '../../hooks/useToken';

// Services
import CourseServices from '../../services/course.services';
import StorageServices from '../../services/storage.services';


// Icons
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Navigate, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiInformationSlabCircleOutline } from '@mdi/js';



type Inputs = {
    title: string,
    description: string,
    category: string,
    difficulty: number,
    estimatedHours: number,
};

export const CreateCourseModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [coverImage, setCoverImage] = useState(null);
    const [categoriesOptions, setCategoriesOptions] = useState<JSX.Element[]>([]);

    const token = useToken();
    const navigate = useNavigate();
    
    useEffect(() => {
        // get categories from db
        let inputArray = ["personal finance","health and workplace safety","sewing","electronics"];
        setCategoriesOptions(inputArray.map((category: string, key: number) => (
            <option value={category} key={key} >{categories[inputArray[key]]?.br}</option>
        )));
    }, []);

    // use-form setup
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    // success on submit handler
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        CourseServices.createCourse({
            title: data.title,
            description: data.description,
            category: data.category,
            difficulty: data.difficulty,
            estimatedHours: data.estimatedHours,
        }, token)
            .then(res =>{ console.log(res); 
                StorageServices.uploadFile({id: res.data._id+"/0", filePath: coverImage});
                //CourseServices.updateCoverImage(res.data._id, token); // pass the required arguments
                navigate(`/courses/edit/${res.data._id}`);
            }) 
            .catch(err => console.log(err))
            .finally();
    };
    function returnFunction(coverImage: any){
        setCoverImage(coverImage);
    }
    
    return (

        <>
            {/* The button to open modal */}
            <label htmlFor="course-create" className="std-button flex modal-button  space-x-2">
                <PencilSquareIcon className='w-5 h-5' />
                <p className='font-normal '>Criar novo curso</p> {/** Create new course */}
            </label>
            
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="course-create" className="modal-toggle" />
            {
                //onclick = function () {StorageServices.uploadFile({bucketName: "educado-bucket", id: "testFoto", filePath: "c:/Users/perni/Downloads/settings_icon.png"});}
            }
            {/*Text shown in the top of create course*/}
            <div className="modal" id="course-create-modal">
                <div className="modal-box bg-gradient-to-b from-primaryLight rounded w-11/12 max-w-xl">
                    <h3 className="font-bold text-lg">Crie seu novo curso!</h3> {/** Create your new course! */}
                    <p className="py-4">Preencha o formulário e comece seu novo curso!</p> {/** Fill the form and start your new course! */}
                   
                    {/*Field to input the title of the new course*/}
                    <form className="flex h-full flex-col justify-between space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='title'>Título</label> {/*Title*/}
                            <input type="text" defaultValue={""}
                                className="form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...register("title", { required: true })}
                            />
                            {errors.title && <span className='text-warning'>Este campo é obrigatório</span>} {/** This field is required */}
                        </div>
                
                            {/*Field to choose a category from a list of options*/}
                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='category'>Categoria</label> {/** Category */}
                            <select 
                                defaultValue={"personal finance"}
                                className="form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...register("category", { required: true })}
                            >
                                {/*Hard coded options by PO, should be changed to get from db*/}
                                {categoriesOptions}
                                
                            </select>
                            {errors.description && <span className='text-warning'>Este campo é obrigatório</span>} {/** This field is required */}
                        </div>

                        <div className="flex items-center gap-8 w-full mt-8">
                            
                            {/*Cover image field is made but does not interact with the db*/}
                            <div className="flex flex-col space-y-2 text-left">    
                            <label htmlFor='cover-image'>Imagem de capa</label> {/** Cover image */}
                                    <Dropzone callBack={returnFunction}></Dropzone> {/** FIX: Doesn't have the functionality to upload coverimage to Buckets yet!*/}
                                {errors.description && <span className='text-warning'>Este campo é obrigatório</span>} {/** This field is required */}
                            </div>

                            {/*Field to select a level from a list of options*/}
                            <div  className="flex flex-col space-y-2 text-left">
                                <label htmlFor='level'>Nível</label> {/** Level */}
                                <select
                                    className="small-form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    {...register("difficulty", { required: true })}
                                >
                                    {/*Hard coded options by PO, should be changed to get from db*/}
                                    <option value={1}>Iniciante </option> {/** Beginner */}
                                    <option value={2}>Intermediário</option> {/** Intermediate */}
                                    <option value={3}>Avançado </option> {/** Advanced */}
                                
                                </select>
                                {errors.difficulty && <span className='text-warning'>Este campo é obrigatório</span>} {/** This field is required */}
                            </div>

                            {/*Field to input the estimated time*/}
                            <div  className="flex flex-col space-y-2 text-left">
                                <label htmlFor='title'>Tempo estimado</label> {/** Estimated time */}
                                <input type="number" defaultValue={""} min={0} step={1}
                                    className="form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    {...register("estimatedHours", { required: true })}
                                />
                                {errors.title && <span className='text-warning'>Este campo é obrigatório</span>} {/** This field is required */}
                            </div>
                       
                        </div>

                        {/*Field to input the description of the course*/}
                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='description'>Descrição</label> {/** Description */}
                            <textarea rows={4} defaultValue={""}
                                className="resize-none form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...register("description", { required: true })}
                            />
                            {errors.description && <span className='text-warning'>Este campo é obrigatório</span>} {/** This field is required */}
                        </div>

                        {/*Create and cancel buttons*/}
                        <div className='modal-action'>
                            <div className="flex items-center justify-between gap-4 w-full mt-8">
                                <label htmlFor='course-create' className=" bg-primary hover:bg-primaryHover border border-primary focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                                    <button type="submit" className='py-2 px-4 h-full w-full'>
                                        Criar {/** Create */}
                                    </button>
                                </label>
                                <label htmlFor='course-create' className="py-2 px-4 bg-white hover:bg-gray-100 border border-primary  hover:border-primaryHover hover:text-primaryHover  text-primary w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                                    Cancelar {/** Cancel */}
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
