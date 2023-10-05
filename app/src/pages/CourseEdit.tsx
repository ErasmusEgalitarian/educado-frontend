/**
 * TODO: 
 * 
 * KNOWN ISSUES:
 */

import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'react-toastify';
import useSWR from 'swr';

// Hooks
import useToken from '../hooks/useToken';

// Interfaces
import { StorageFile } from '../interfaces/File';

// Services
import CourseServices from '../services/course.services';
import StorageService from '../services/storage.services';

// Pages
import NotFound from './NotFound';

// components
import Loading from './Loading';
import Layout from '../components/Layout'
import { SectionList } from '../components/dnd/SectionList';
import { SectionForm } from '../components/dnd/SectionForm';

// Icons
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

type Inputs = {
    coverImg: FileList
    title: string,
    description: string,
    category: string
};

type CoursePartial = {
    coverImg?: StorageFile | {}
    title: string,
    description: string,
    category: string
}

// Hardcoded based on database id
const OTHER_CATEGORY_ID = '639208a0f467689fde25b5fa'

const CourseEdit = () => {
    const token = "dummyToken";
    //const token = useToken();
    const { id } = useParams(); // Get path params

    /**
     * FIX LATER: removed cover image since it has not been implemented to work yet
     */
    //const [coverImg, setCoverImg] = useState<File | null>();
    //const [coverImgPreview, setCoverImgPreview] = useState<string>("");
    
    
    const { data, error } = useSWR(
        token ? [`http://127.0.0.1:8888/api/course/${id}`, token] : null,
        CourseServices.getCourseDetail
    );

    
    // Fetch Categories
    const { data: categories, error: categoriesError } = useSWR(
        token ? [`http://127.0.0.1:8888/api/categories`, token] : null,
        CourseServices.getCourseCategories
    );

    // React useForm setup
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const changes: CoursePartial = {
            title: data.title,
            description: data.description,
            category: data.category
        }

        /*if (coverImg) {
            changes.coverImg = {
                path: `${id}/coverImg`,
                filename: coverImg.name,
                size: coverImg.size,
                type: coverImg.type
            }
        }*/

        CourseServices.updateCourseDetail(changes, id/*, token*/)
            .then(res => toast.success('Updated course'))
            .catch(err => toast.error(err));
    }

    // update cover image function
    /**
     * 
     */
    /*const onCoverImgChange = async (e: any) => {
        const image = e.target.files[0];

        // Enables us to preview the image file before storing it
        setCoverImgPreview(URL.createObjectURL(image));
        setCoverImg(image);

        try {
            await StorageService.uploadFile({ file: image, key: `${data.id}/coverImg` })
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Image could not be uploaded, try again.');
        }
    }*/

    if (error /*|| categoriesError*/) return <NotFound />;
    if (!data /*|| !categories || (!data && !categories)*/) return <Loading/>;

    return (
        <Layout meta={`Course: ${id}`}>

            {/** Course navigation */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="navbar bg-base-100">
                    <div className='flex-1'>
                        <Link to="/courses" className="btn btn-square btn-ghost normal-case text-xl"><ArrowLeftIcon width={24} /></Link>
                        <a className="normal-case text-xl ml-4">{data.title}</a>
                    </div>
                    <div className="flex-none space-x-2">
                        {/* <button onClick={() => toast.success("Course published")} className='btn btn-sm bg-blue-500 text-white border-0'>Unpublish</button> */}
                        <button type="submit" className='btn btn-sm bg-blue-700 text-white border-0'>Update Course</button>
                    </div>
                </div>

                {/** Course details edit */} 
                <div className="container mx-auto flex flex-row space-x-4 my-6">
                    <div className='w-full max-w-5xl mx-auto bg-white rounded p-6'>
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                            <div className='flex flex-col space-y-6 divide'>
                                <h1 className='text-xl font-medium'>Course Details</h1>

                                {/** Course Title Field */}
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor='title'>Title</label>
                                    <input type="text" defaultValue={data.title}
                                        className="form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        {...register("title", { required: true })}
                                    />
                                    {errors.title && <span>This field is required</span>}
                                </div>

                                {/** Course Description Field */}
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor='description'>Description</label>
                                    <textarea rows={4} defaultValue={data.description} placeholder={data.description}
                                        className="resize-none form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        {...register("description", { required: true })}
                                    />
                                    {errors.description && <span>This field is required</span>}
                                </div>

                                {/** Cover Image Field */}
                                {/*<div className="flex flex-col">
                                    <div className='relative'>
                                        <div className='p-0 rounded-b-none rounded-t border-gray-300 border-x border-t h-[240px] overflow-hidden'>
                                            {data.coverImg ?
                                                <img src={coverImgPreview || data.coverImg} alt={data.title} className="w-full h-max rounded object-cover" /> :
                                                <div className='h-full w-full oceanic-gradient flex justify-center items-center text-2xl text-white'>No Cover Image</div>
                                            }

                                        </div>*/}
                                        {/* Cover image upload */}
                                        {/*<input type="file" accept='.jpg,.jpeg,.png'
                                            {...register("coverImg")}
                                            onChange={onCoverImgChange}
                                            className='file-input w-full input-bordered rounded-b rounded-t-none focus:outline-none'
                                        >
                                        </input>
                                    </div>
                                </div>*/}

                                
                                {/** Category Pills */}
                                {/*<div className="flex flex-col space-y-2">
                                    <label htmlFor='categories'>Categories</label>
                                    <div className='flex flex-row space-x-2'>*/}
                                        {/** TODO: Register to Form */}{/*
                                        <select
                                            defaultValue={data.category.id}
                                            className="select select-bordered rounded focus:outline-none w-full"
                                            {...register("category", { required: true })}
                                        >
                                            <option disabled>Pick a category for the course</option>
                                            {data.category
                                                .filter((category: any) => category.name !== 'Other')
                                                .map((category: any, key: number) =>
                                                <option 
                                                    selected={data.category.id === category.id} 
                                                    value={category.id} 
                                                    key={key}
                                                >
                                                    {category.name}
                                                </option>)
                                            }
                                            <option value={OTHER_CATEGORY_ID} key={"other_category"}>Other</option>
                                        </select>
                                    </div>
                                </div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="container mx-auto flex flex-row space-x-4 my-6">
                <div className='w-full max-w-5xl mx-auto bg-white rounded p-6'>
                    {/** Course Sections area  */}
                    <div className='flex flex-col space-y-2 divide'>
                        <h1 className='text-xl font-medium mb-4'>Course Sections</h1>
                        <SectionForm />
                        <SectionList sections={data.sections} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CourseEdit