// Icon from: https://materialdesignicons.com/

import { useState, useEffect } from 'react';

import { SectionForm } from './dnd/SectionForm';
import { SectionList } from './dnd/SectionList';

import { BACKEND_URL } from "../helpers/environment";

import CourseServices from '../services/course.services';
import { YellowWarning } from './Courses/YellowWarning';
import { useNavigate } from 'react-router-dom';

import Loading from './general/Loading'
import Layout from './Layout'
import { toast } from 'react-toastify';

interface Inputs {
    id: string,
    token: string,
    setTickChange: Function,
}


// Create section
export const SectionCreation = ({ id, token, setTickChange}: Inputs ) => {
  const [isLeaving, setIsLeaving] = useState<boolean>(false);
  const [onSubmitSubscribers, setOnSubmitSubscribers] = useState<Function[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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


  async function onSubmit() {
    await CourseServices.updateCourseSectionOrder(sections, id, token);
    notifyOnSubmitSubscriber();

    toast.success("Seções salvas com sucesso!");

    if(confirm("Tem certeza que deseja sair? Você perderá todas as alterações feitas.")){
      setIsLeaving(true);
    }
    
    if(isLeaving){
      window.location.href = '/courses';
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

    // Fetch Course Details
    useEffect(() => {
      if (id !== "0") {
        getData(`${BACKEND_URL}/api/courses/${id}`)
          .then(data => {
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
              <label onClick={()=>changeTick(0)}   className=" w-full cursor-pointer underline py-2 px-4 bg-transparent hover:bg-warning-100 text-primary w-full transition ease-in duration-200 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                  Voltar para Informações {/** GO BACK TO COURSE CREATION PAGE 1/3 IN THE CHECKLIST */}
              </label>

              <label  className="pl-56  underline py-2 bg-transparent hover:bg-primary-100 text-primary w-full transition ease-in duration-200 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                <label onClick={()=>{setIsLeaving(true); onSubmit()}} className='hover:cursor-pointer underline' >
                Salvar como Rascunho {/** Save as draft */}
                </label>
              </label>

              <label  className="h-12 p-2 bg-primary hover:bg-primary focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                <label onClick={onSubmit} className='py-2 px-4 h-full w-full cursor-pointer' >
                    Revisar Curso {/** Go to the Revisar curso page which is not yet implemented therefore it is just a save  */}
                </label>
              </label>
            </div>
          </div>
        </div> 
      </div> 
    );
}