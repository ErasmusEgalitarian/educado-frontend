// Icon from: https://materialdesignicons.com/

import { useState, useEffect } from 'react';
import { useParams } from "react-router"

import { SectionForm } from './dnd/SectionForm';
import { SectionList } from './dnd/SectionList';

import { BACKEND_URL } from "../helpers/environment";

import CourseServices from '../services/course.services';
import { YellowWarning } from './Courses/YellowWarning';
import { useNavigate } from 'react-router-dom';

import Loading from './general/Loading'
import Layout from './Layout'
import { toast } from 'react-toastify';
import { set } from 'cypress/types/lodash';

interface Inputs {
    id: string,
    token: string,
    setTickChange: Function,
}


// Create section
export const SectionCreation = ({ id: propId, token, setTickChange}: Inputs ) => {
  const { id: urlId } = useParams<{ id: string }>();
  const id = propId === "0" ? urlId : propId;
  const [isLeaving, setIsLeaving] = useState<boolean>(false);
  const [onSubmitSubscribers, setOnSubmitSubscribers] = useState<Function[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("draft");

  const navigate = useNavigate();
  function addOnSubmitSubscriber(callback: Function) {
    //console.log("add subscriber");
    setOnSubmitSubscribers((prevSubscribers) => [
      ...prevSubscribers,
      callback,
    ]);
  }


  /**
   * Currently not used, but should be implemented in the future
   */
  // function removeOnSubmitSubscriber(callback: Function) {
  //   setOnSubmitSubscribers((prevSubscribers) =>
  //     prevSubscribers.filter((cb) => cb !== callback)
  //   );
  // }


  function notifyOnSubmitSubscriber() {
    onSubmitSubscribers.forEach((cb) => cb());
  }

  // Function to call when publish button is clicked, if publish succueds user will be send to courses after toast has been send
  async function onPublish() {
    try{
      notifyOnSubmitSubscriber();
      const confirmMSG = status === "published" 
      ? 
      "Tem certeza de que deseja publicar o curso? Isso o disponibilizará para os usuários do aplicativo"
      :
      "Tem certeza de que deseja publicar as alterações feitas no curso"

      if(confirm(confirmMSG)) {
        if (status !== "published") {
          await CourseServices.updateCourseStatus(id, "published", token);
          console.log("Course published");
          toast.success("Curso publicado com sucesso!");
        }
        else {
          await CourseServices.updateCourseSectionOrder(sections, id, token);
          toast.success("Seções salvas com sucesso!");
        }
      }
    }
    catch(err){
      console.error(err);
    }
    
    
  }
  async function onSubmit() {
    notifyOnSubmitSubscriber();

    if(confirm("Tem certeza que deseja sair? Você perderá todas as alterações feitas.")){
      await CourseServices.updateCourseSectionOrder(sections, id, token);
      toast.success("Seções salvas com sucesso!");
    }
    
    
    //setTickChange(2)(); //TODO: add in when next page is implemented
  }

  function changeTick(tick: number) {
    setTickChange(tick);
    navigate(`/courses/manager/${id}/0`);
  }


    /**
       * Extra function to handle the response from the course service before it is passed to the useSWR hook
       * 
       * @param url The url to fetch the course details from backend
       * @param token The user token
       * @returns The course details
       */
    const getData = async (url: string/*, token: string*/) => {
      const res:any = await CourseServices.getCourseDetail(url, token)
      return res;
    }

   // Redirect to courses page when setLeaving is set to true
    useEffect(() => {
      if (isLeaving) {
        navigate("/courses");
    }}, [isLeaving])

    // Fetch Course Details
    useEffect(() => {
      if (id !== "0") {
        getData(`${BACKEND_URL}/api/courses/${id}`)
          .then(data => {
            setStatus(data.status);
            setSections(data.sections); // Array of section ID's 
            setLoading(false);
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }, [id, token]);
    
    if(loading && id != "0") return <Layout meta='course overview'><Loading /></Layout> // Loading course details
  
    
    
    return (
      <div>
        <div className="">
          <div className="flex w-full float-right items-center justify-left space-y-4 my-4">
            <h1 className="text-2xl text-left font-bold justify-between space-y-4">Seções do curso </h1>
          </div>

          <div className="flex w-full float-right space-y-4">
            <YellowWarning text='Você pode adicionar até 10 itens em cada seção, entre aulas e exercícios.'/>
          </div>

          <div className="flex w-full float-right items-center justify-left space-y-4 my-4">
            {/** Course Sections area  */}
            <div className='flex w-full flex-col space-y-2 '>
                <SectionList sections={sections} setSections={setSections} addOnSubmitSubscriber={addOnSubmitSubscriber} />
                <SectionForm setSections={setSections}/>
            </div>
          </div>

          {/*Create and cancel buttons*/}
          <div className='className="flex w-full float-right space-y-4 "'>
            <div className="flex items-center justify-between gap-4 w-full mt-8">
              <label onClick={()=>changeTick(0)}   className="whitespace-nowrap cursor-pointer underline py-2 pr-4 bg-transparent hover:bg-warning-100 text-primary w-full transition ease-in duration-200 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                  Voltar para Informações {/** GO BACK TO COURSE CREATION PAGE 1/3 IN THE CHECKLIST */}
              </label>

              <label  className={` ${status === "published" ? "invisible pointer-events-none" : ""} pl-32  underline py-2 bg-transparent hover:bg-primary-100 text-primary w-full transition ease-in duration-200 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded `}>
                <label onClick={()=>{setIsLeaving(true); onSubmit()}} className='whitespace-nowrap hover:cursor-pointer underline' >
                Salvar como Rascunho {/** Save as draft */}
                </label>
              </label>

              <label  className="h-12 p-2 bg-primary hover:bg-primary focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                <label onClick={()=> {setIsLeaving(true); onPublish()}} className='whitespace-nowrap py-4 px-8 h-full w-full cursor-pointer' >
                 {status === 'published' ? 'Publicar Edições' : 'Publicar Curso'} {/** Publish course, this should be replaced with a move to preview button when preview page is implemented */}
                </label>
              </label>
            </div>
          </div>
        </div> 
      </div> 
    );
}