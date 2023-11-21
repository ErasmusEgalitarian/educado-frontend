import { useState, useEffect } from 'react'
import { Link, useParams} from 'react-router-dom'
import { useForm, SubmitHandler, set } from 'react-hook-form'
import { toast } from 'react-toastify'
import useSWR from 'swr'


// Hooks
import useToken from '../hooks/useToken'

// Interfaces
import { StorageFile } from '../interfaces/File'

// Services
import CourseServices from '../services/course.services'
import StorageService from '../services/storage.services'

// Pages
import NotFound from './NotFound'

// components
import Loading from '../components/general/Loading'
import Layout from '../components/Layout'
import { SectionList } from '../components/dnd/SectionList'
import { SectionForm } from '../components/dnd/SectionForm'

// Icons
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { boolean } from 'yup';

import { BACKEND_URL } from "../helpers/environment";

// Helpers
import categories from "../helpers/courseCategories";
import statuses from "../helpers/courseStatuses";



interface Inputs {
  coverImg?: FileList
  title: string
  description: string
  category: string
  difficulty: number
  status: string
  estimatedHours: number
}

/**
 * This page is responsible for showing and editing courses to the creator.
 *
 * @returns HTML Element
 */
const CourseEdit = () => {
  

  const token = 'dummyToken'
  // const token = useToken();
  const { id } = useParams() // Get path params

  /**
     * FIX LATER: removed cover image since it has not been implemented to work yet
     */
  const [coverImg, setCoverImg] = useState<File | null>()
  const [coverImgPreview, setCoverImgPreview] = useState<string>('')
  const [categoriesOptions, setCategoriesOptions] = useState<JSX.Element[]>([]);
  const [statusSTR, setStatusSTR] = useState<string>("");
  const [statusChange, setStatusChange] = useState<boolean>(false);
  
  
  useEffect(() => {
      // get categories from db
      let inputArray = ["personal finance","health and workplace safety","sewing","electronics"];
      setCategoriesOptions(inputArray.map((categoryENG: string, key: number) => (
          <option value={categoryENG} key={key} >{categories[inputArray[key]]?.br}</option>
          )));
    }, []);
        
    
    /**
     * Extra function to handle the response from the course service before it is passed to the useSWR hook
     * 
     * @param url The url to fetch the course details from backend
     * @param token The user token
     * @returns The course details
     */
    const getData = async (url: string/*, token: string*/) => {
        const res:any = await CourseServices.getCourseDetail(url/*, token*/)
        
        setStatusSTR(res.status);
        return res;
    }

    // Fetch Course Details
    const { data, error } = useSWR(
        token ? [`${BACKEND_URL}/api/courses/${id}`, token] : null,
        getData
    )

//  // Fetch Categories
//   const { data: categoriesData, error: categoriesError } = useSWR(
//     token ? [`${BACKEND_URL}/api/categories`, token] : null,
//     CourseServices.getCourseCategories
//   )

// React useForm setup
const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

/**
 * Handles the form submission for updating a course's details.
 * @param {Inputs} data - The form data containing the updated course details.
*/
const onSubmit: SubmitHandler<Inputs> = (data) => {
    
    let newStatus = statusSTR;

    if(statusChange){
        if(statusSTR === "draft"){
            newStatus = "published";
        }else{
            newStatus = "draft";
        }
        setStatusChange(false);
    }

    if (confirm("Você tem certeza?") == true) {
        const changes: Inputs = {
            coverImg: data.coverImg,
            title: data.title,
            description: data.description,
            category: data.category,
            difficulty: data.difficulty,
            status: newStatus,
            estimatedHours: data.estimatedHours
        }

        // Update course details
        CourseServices.updateCourseDetail(changes, id/*, token */)
        .then(res => {toast.success('Curso atualizado'); setStatusSTR(changes.status);}) // Course updated
        .catch(err => toast.error(err)) // Error updating course
    }
}
  
    /** TODO: Reimplement when buckets have been implemented */
    /* if (coverImg) {
        changes.coverImg = {
            path: `${id}/coverImg`,
            filename: coverImg.name,
            size: coverImg.size,
            type: coverImg.type
        }
        } */

    /**
     * Delete courses and redirect to courses page
     * Uses window.location.href to redirect instead of navigate, as navigate doesn't update the page
     * 
     * @param id The course id
     * @param token The user token
     */
    const deleteCourse = async () => {
        if (confirm("Você tem certeza?") == true) {
            const response = await CourseServices.deleteCourse(id, token);
            const statusDelete = response.status

            if (statusDelete >= 200 && statusDelete <= 299) {
                toast.success("Curso excluído"); {/* Course deleted */}
                window.location.href = "/courses";
            } else if (statusDelete >= 400 && statusDelete <= 599) {
                toast.error(`(${statusDelete}, ${response.statusText}) while attempting to delete course`)
            }
        }
    }


    
  // TODO: update cover image function
  /**
   * Sets the cover image preview and the cover image file
   * Though bucket is not implemented yet, so most of this is commented out
   */
  const onCoverImgChange = async (e: any) => {
    const image = 'https://www.shutterstock.com/image-illustration/red-stamp-on-white-background-260nw-1165179109.jpg'
    // const image = e.target.files[0];

    // Enables us to preview the image file before storing it
    setCoverImgPreview(image)
    // setCoverImgPreview(URL.createObjectURL(image));
    /* setCoverImg(image);

        try {
            await StorageService.uploadFile({ file: image, key: `${data.id}/coverImg` })
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Image could not be uploaded, try again.');
        } */
  }

  if (error /* || categoriesError */) return <NotFound />
  if (!data /* || !categories || (!data && !categories) */) return <Loading/>
  
 

  return (
        <Layout meta={`Course: ${id}`}>

            {/** Course navigation */}
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="navbar bg-base-100 ">
                    <div className='flex-1'>
                        <Link to="/courses" className="btn btn-square btn-ghost normal-case text-xl" reloadDocument><ArrowLeftIcon width={24} /></Link>
                        <a className="normal-case text-xl ml-4">{data.title}</a>
                    </div>
                    <div className="flex-none space-x-2">
                        <button type="button" onClick={deleteCourse} className='left-0 std-button bg-warning hover:bg-red-800 ml-4' >Excluir</button> {/*Delete button*/}
                        <button type="submit" className='std-button text-white border-0'>Atualizar</button> {/* Update button */}
                        <button type="submit" onClick={() => setStatusChange(true)} className='std-button bg-primary text-white border-0'>{statusSTR === "draft"? "Publicar":"Definir como rascunho" }</button>
                    </div>
                </div>

                {/** Course details edit */}
                <div className="container mx-auto flex flex-row space-x-4 my-6">
                    <div className='w-full max-w-5xl mx-auto bg-white rounded p-6'>
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                            <div className='flex flex-col space-y-6 divide'>

                                {/* Course status */}
                                <div className='flex flex-col justify-center pb-6'>
                                  <h1 className='text-3xl text-center font-medium'>Curso</h1> {/* Course details */}
                                  <div className='flex flex-row justify-center'>
                                    <div className={'w-3 h-3 mx-2 rounded-full m-auto '+(statuses[statusSTR].color ?? statuses.default.color)} />
                                    <p className='italic'>
                                      {statuses[statusSTR].br ?? statuses.default.br}
                                    </p>
                                    
                                  </div>
                                </div>

                                {/** Course Title Field */}
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor='title'>Título</label>
                                    <input type="text" defaultValue={data.title} placeholder={data.title}
                                        className="form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        {...register('title', { required: true})}
                                    />
                                    {errors.title && <span>Este campo é obrigatório!</span>}
                                </div>

                                {/** Course Description Field */}
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor='description'>Descrição</label>
                                    <textarea rows={4} defaultValue={data.description} placeholder={data.description}
                                        className="resize-none form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        {...register('description', { required: true })}
                                    />
                                    {errors.description && <span>Este campo é obrigatório!</span>}
                                </div>

                                {/* Field to choose a category from a list of options */}
                                <div className="flex flex-col space-y-2 text-left">
                                    <label htmlFor='category'>Categoria</label>
                                    <select defaultValue={data.category}
                                        className="form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        {...register('category', { required: true })}
                                    >
                                        {/* Hard coded options by PO, should be changed to get from db */}
                                        {categoriesOptions}
                                    </select>
                                    {errors.category && <span className='text-warning'>Este campo é obrigatório</span>}
                                </div>

                                {/* Field to select a level from a list of options */}
                                <div className="flex flex-col space-y-2 text-left">
                                    <label htmlFor='level'>Nível</label> {/* Level */}
                                    <select defaultValue={data.difficulty}
                                        className="small-form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        {...register('difficulty', { required: true })}
                                    >
                                        {/* Hard coded options by PO, should be changed to get from db */}
                                        <option value={1}>Iniciante </option> {/* Beginner */}
                                        <option value ={2}>Intermediário</option> {/* Intermediate */}
                                        <option value={3}>Avançado </option> {/* Advanced */}

                                    </select>
                                    {errors.difficulty && <span className='text-warning'>Este campo é obrigatório</span>}
                                </div>

                                {/* Field to input the estimated estimatedHours */}
                                <div className="flex flex-col space-y-2 text-left">
                                    <label htmlFor='title'>Tempo estimado</label> {/* Estimated time */}
                                    <input type="number" defaultValue={data.estimatedHours} min={0} step={1}
                                        className="form-field focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        {...register('estimatedHours', { required: true })}
                                    />
                                    {errors.title && <span className='text-warning'>Este campo é obrigatório</span>}
                                </div>

                                {/** Cover Image Field */}
                                <div className="flex flex-col">
                                    <div className='relative'>
                                        <div className='p-0 rounded-b-none rounded-t border-gray-300 border-x border-t h-[240px] overflow-hidden'>
                                            {data.coverImg ?
                                                <img src={data.coverImg} alt={data.title} className="w-full h-max rounded object-cover" /> :
                                                <div className='h-full w-full oceanic-gradient flex justify-center items-center text-2xl text-white'>Sem imagem de capa</div>
                                            }

                                        </div>
                                        {/* Cover image upload */}
                                        <input type="file" accept='.jpg,.jpeg,.png'
                                            {...register('coverImg')}
                                            // onChange={onCoverImgChange}
                                            className='file-input w-full input-bordered rounded-b rounded-t-none focus:outline-none'
                                        >
                                        </input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="container mx-auto flex flex-row space-x-4 my-6">
                <div className='w-full max-w-5xl mx-auto bg-white rounded p-6'>
                    {/** Course Sections area  */}
                    <div className='flex flex-col space-y-2 divide'>
                        <h1 className='text-xl font-medium mb-4'>Seções do curso</h1>
                        <SectionForm/>
                        <SectionList sections={data.sections} />
                    </div>
                </div>
            </div>

        </Layout>
  )
}

export default CourseEdit
