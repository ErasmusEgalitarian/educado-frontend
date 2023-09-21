import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from 'swr';

// Contexts
// import useAuthStore from '../../contexts/useAuthStore';

// Hooks
import useToken from '../../hooks/useToken';

// Services
import CourseServices from '../../services/course.services';


// Icons
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Navigate, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiInformationSlabCircleOutline } from '@mdi/js';

<Icon path={mdiInformationSlabCircleOutline} size={1} />

type Inputs = {
    title: string,
    category: string,
    level: string,
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
            description: data.description,
        }, token)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .finally(() => { mutate("http://127.0.0.1:8888/api/courses/"); navigate("/courses") });
    };
    return (
        <>
            {/* The button to open modal */}
            <label htmlFor="course-create" className="btn btn-primary modal-button flex space-x-2">
                <PencilSquareIcon className='w-5 h-5' />
                <p className='font-normal'>Create new course</p>
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="course-create" className="modal-toggle" />
            <div className="modal" id="course-create-modal">
                <div className="modal-box rounded w-11/12 max-w-xl">
                    <h3 className="font-bold text-lg">Create your brand new course!</h3>
                    <p className="py-4">Fill out the form and get started with your brand new course!</p>

                    <form className="flex h-full flex-col justify-between space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='title'>Title</label>
                            <input type="text" defaultValue={""}
                                className="form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                {...register("title", { required: true })}
                            />
                            {errors.title && <span>This field is required</span>}
                        </div>

                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='category'>Category</label>
                            <select defaultValue={"Escolher categoria"} /*Choose category*/
                                className="form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                {...register("category", { required: true })}
                            >
                                <option>Finanças pessoais </option> {/*Personal Finance*/}
                                <option>Saúde e Segurança no Trabalho </option> {/*Health and Workplace Safety*/}
                                <option>Costura </option> {/*Sewing*/}
                                <option>Eletrônica </option> {/*Electronics*/}
                            </select>
                            {errors.description && <span>This field is required</span>}
                        </div>

                        <div className="flex items-center gap-10 w-full mt-8">
                            <div  className="flex flex-col space-y-2 text-left">
                                <div className='flex items-center gap-1 w-full mt-8'>
                                    <label htmlFor='level'>Level</label>
                                    <Icon path={mdiInformationSlabCircleOutline} size={0.70} />
                                </div>
                                <select defaultValue={"Escolher categoria"} /*Choose category*/
                                    className="small-form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    {...register("level", { required: true })}
                                >
                                    <option>Iniciante </option> {/*...*/}
                                    <option>Intermediário</option> {/*...*/}
                                    <option>Avançado </option> {/*...*/}
                                
                                </select>
                                {errors.description && <span>This field is required</span>}
                            </div>
                        

                            <div className="flex flex-col space-y-2 text-left">
                                 <div className='flex items-center gap-1 w-full mt-8'>
                                    <label htmlFor='cover-image'>Cover-image</label>
                                    <Icon path={mdiInformationSlabCircleOutline} size={0.70} />
                                </div>
                                <input type="file" defaultValue={""}
                                    className="extra-small-form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    {...register("title", { required: true })}
                                />
                                {errors.description && <span>This field is required</span>}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 text-left">
                            <label htmlFor='description'>Description</label>
                            <textarea rows={4} defaultValue={""}
                                className="resize-none form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                {...register("description", { required: true })}
                            />
                            {errors.description && <span>This field is required</span>}
                        </div>

                        <div className='modal-action'>
                            <div className="flex items-center justify-between gap-4 w-full mt-8">
                                <label htmlFor='course-create' className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                                    <button type="submit">
                                        Create
                                    </button>
                                </label>
                                <label htmlFor='course-create' className="py-2 px-4 bg-white hover:bg-gray-100 border border-blue-500 focus:ring-blue-500 focus:ring-offset-blue-200 text-blue-500 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                                    Cancel
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
