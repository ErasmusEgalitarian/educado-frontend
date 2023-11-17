import { useState, ChangeEvent} from "react";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import { useNavigate, Link, useParams } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form";

import AuthService from "../services/auth.services"
import { NewApplication } from "../interfaces/Application"


const Application = () => {

  //Get id from URL
  const { id } = useParams();
  
  const navigate = useNavigate(); 

  //Function for deciding the different values in the form
  const { register, handleSubmit, formState: { errors } } = useForm<NewApplication>();

  //Variables for toggling the different fields' visibility
  const [toggleMotivation, setToggleMotivation] = useState(true);
  const [toggleAcademicExperiences, setToggleAcademicExperiences] = useState(false);
  const [toggleProfessionalExperience, setToggleProfessionalExperience] = useState(false);

  /**
    * OnSubmit function for Application.
    * Takes the submitted data from the form and sends it to the backend through a service.
    * Navigates to the Login page upon recieving a succesfull response
    *
    * @param {JSON} data Which includes the value of the various fields in the application
    */
  const onSubmit: SubmitHandler<NewApplication> = async (data) => {
    AuthService.postNewApplication({
      motivation: data.motivation, academicLevel: data.academicLevel, academicStatus: data.academicStatus,
      major: data.major, institution: data.institution, educationStartDate: data.educationStartDate,
      educationEndDate: data.educationEndDate, company: data.company, position: data.position, 
      workStartDate: data.workStartDate, workEndDate: data.workEndDate, workActivities: data.workActivities,

      baseUser: id
    }).then((res) =>{
      if(res.status == 200){
        navigate("/login")
      }
    })
  };

  //Variable for keeping track of the length of the motivation
  const [motivation, setMotivation] = useState('');
  const maxLength = 800;

  // Function to make sure motivation is not above 800 characters
  const handleMotivationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    if (text.length <= maxLength) {
      setMotivation(text);
    }
  };

return (
<main>
  { /* Navbar */ }
  <nav className="flex fixed w-full items-center justify-between bg-secondary box-shadow-md bg-fixed top-0 left-0 right-0 z-50" style={{ background: 'var(--secondary, #F1F9FB)', boxShadow: '0px 4px 4px 0px rgba(35, 100, 130, 0.25)' }}>
    <div className="w-[165.25px] h-6 justify-start items-center gap-[7.52px] flex py-6 px-12">
      <div className="navbar-start">
        <Link to="/" className="w-[165.25px] h-6 justify-start items-center gap-[6px] inline-flex space-x-1 normal-case text-xl">
          <img src= '/logo.svg' alt="logo" className="w-[24.43px] h-6" /> <img src= '/educado.svg' alt="educado" className="h-6" />
        </Link>
      </div>
    </div>
  </nav>
  
  <body className="relative right-0 h-screen flex flex-col">
    <form className="relative right-0 w-full overflow-none h-screen flex flex-col items-center gap-5 z-50" onSubmit={handleSubmit(onSubmit)}>
      
      {/* Box fot text */}
      <div className="items-center p-10 pt-20">
        <h1 className="text-center text-cyan-800 text-[32px] font-bold font-['Montserrat']">
          Que bom que você quer fazer parte do Educado! {/* Glad you want to be part of Educado! */}
        </h1>
        <p className="text-center text-neutral-700 text-base font-normal font-['Montserrat']">
          {/* We need some information to approve your content creator access. We'll get back to you with an answer via e-mail. */}
          Precisamos de algumas informações para aprovar seu acesso de criador de conteúdo. Retornaremos com uma resposta via e-mail
        </p>
      </div>
    
      {/* Box for the Motivation */}
      <div className="w-[65%] justify-center items-center">
        <button type="button" className="relative text-left flex-auto w-[100%] h-[3.3rem] rounded-tl-lg rounded-tr-lg bg-cyan-800 text-white font-bold font-['Montserrat'] pl-6 z-50"
        onClick={() => setToggleMotivation(!toggleMotivation)}>
          <div className="flex items-start">
            {toggleMotivation ? (
              <Icon path={mdiChevronUp} size={1} color="#FFFFFF" />
            ) : (
              <Icon path={mdiChevronDown} size={1} color="#FFFFFF" />
            )}
            Motivações
          </div>
        </button>

        {toggleMotivation && (
          <div className="relative border border-[#166276] p-4 rounded-b-lg text-left bg-white z-50">
          <div className="flex flex-col">
            <label htmlFor="motivation">
              Queremos saber mais sobre você! Nos conte suas motivações para fazer parte do Educado
              {/* We want to know more about you! Tell us about your reasons for joining Educado */}
            </label>
            <textarea
              className="bg-sky-50 rounded-lg border-none"
              placeholder="Escreva aqui porque você quer fazer parte de projeto"
              maxLength={maxLength}
              value={motivation}
              {...register("motivation", { required: true })}
              onChange={handleMotivationChange}
            />
            <div className="text-right text-gray-500 text-sm font-normal font-['Montserrat']">
            {motivation.length}/{maxLength} caracteres
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Box for Academic Experiences */}
      <div className="w-[65%] justify-center items-center">
        <button type="button" className="relative text-left flex-auto w-[100%] h-[3.3rem] rounded-tl-lg rounded-tr-lg bg-cyan-800 text-white font-bold font-['Montserrat'] pl-6 z-50"
        onClick={() => setToggleAcademicExperiences(!toggleAcademicExperiences)}>
          <div className="flex items-start">
            {toggleAcademicExperiences ? (
              <Icon path={mdiChevronUp} size={1} color="#FFFFFF" />
            ) : (
              <Icon path={mdiChevronDown} size={1} color="#FFFFFF" />
            )}
            Experiências acadêmicas {/* Academic Experiences */}
          </div>
        </button>

        {toggleAcademicExperiences && (
          <div className="relative border flex-row border-[#166276] p-4 rounded-b-lg gap-10 text-left bg-white z-50">
            <div className="grid grid-cols-2 gap-10"> 
              <p>Formação</p> {/* Training */}
              <p>Status</p> {/* Status */}
            </div>
            <div className="relative flex gap-10">
              <select className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
              id="academicLevel"
              {...register("academicLevel", {required: true})}>
                <option value="Básico">Básico</option> {/* Basic */}
                <option value="Médio">Médio</option> {/* Medium */}
                <option value="Superior">Superior</option> {/* Superior */}
              </select>
          
              <select className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
              id="academicStatus"
              {...register("academicStatus", { required: true })}>
                <option value="Em andamento">Em andamento</option> {/* In progress*/}
                <option value="Concluída">Concluída</option> {/* Completed*/}
                <option value="Não finalizado">Não finalizado</option> {/* not finalised*/}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-10"> 
              <p>Curso</p> { /* Major*/ }
              <p>Instituição</p> { /* Institution*/ }
            </div>
            <div className="relative flex gap-10">
              <input
              type="text" id="major"
              className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
              placeholder="Curso"
              {...register("major", { required: true })}
              />
          
              <input
              type="text" id="institution"
              className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
              placeholder="Instituição"
              {...register("institution", { required: true })}
              />
            </div>
            <div className="grid grid-cols-2 gap-10"> 
              <p>Início</p> { /*Start Date*/ }
              <p>Fim</p> { /*End Date*/ }
            </div>
            <div className="relative flex gap-10">
              <input
              type="text" id="educationStartDate"
              className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
              placeholder="Mês / Ano"
              {...register("educationStartDate", { required: true })}
              />
          
              <input
              type="text" id="educationEndDate"
              className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
              placeholder="Mês / Ano"
              {...register("educationEndDate", { required: true })}
              />
            </div>
          </div>
        )}
      </div>

      {/* Box for Professional Experience */}
      <div className="w-[65%] justify-center items-center">
        <button type="button" className="relative text-left flex-auto w-[100%] h-[3.3rem] rounded-tl-lg rounded-tr-lg bg-cyan-800 text-white font-bold font-['Montserrat'] pl-6 z-50"
        onClick={() => setToggleProfessionalExperience(!toggleProfessionalExperience)}>
          <div className="flex items-start">
            {toggleProfessionalExperience ? (
              <Icon path={mdiChevronUp} size={1} color="#FFFFFF" />
            ) : (
              <Icon path={mdiChevronDown} size={1} color="#FFFFFF" />
            )}
            Experiências profissionais {/* Professional Experience */}
          </div>
        </button>

        {toggleProfessionalExperience && (
          <div className="relative border flex-row border-[#166276] p-4 rounded-b-lg gap-5 text-left bg-white z-50">
            <div className="grid grid-cols-2 gap-10"> 
              <p>Empresa</p> {/* company */}
              <p>Cargo</p> {/* position */}
            </div>
            <div className="relative flex gap-10">
              <input
              type="text" id="company"
              className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
              placeholder="Mobile Education"
              {...register("company", { required: true })}
              />
        
              <input
              type="text" id="position"
              className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
              placeholder="Product Designer"
              {...register("position", { required: true })}
              />
            </div>
            <div className="grid grid-cols-2 gap-10"> 
              <p>Início</p> {/* start */}
              <p>Fim</p> {/* end */}
            </div>
            <div className="relative flex gap-10">
              <input
              type="text" id="workStartDate"
              className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
              placeholder="Mês / Ano"
              {...register("workStartDate", { required: true })}
              />
        
              <input
              type="text" id="workEndDate"
              className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
              placeholder="Mês / Ano"
              {...register("workEndDate", { required: true })}
              />
            </div>
            <div className="grid grid-cols-1"> 
              <p>Descrição de atividades</p> {/* Description of activities */}
            </div>
            <div className="relative flex">
              <input
              type="text" id="workActivities"
              className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
              placeholder="Escreva aqui as suas responsabilidades"
              {...register("workActivities", { required: true })}
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-[65%] flex justify-end">
        <button type="submit" className="w-[238px] h-[52px] px-10 py-4 bg-cyan-800 hover:bg-cyan-900 rounded-lg justify-center items-start gap-2.5 inline-flex text-center text-white text-base font-bold font-['Montserrat']">
          Enviar para análise {/* Send for analysis */}
        </button>
      </div>
    </form>
  </body>
</main>
)    
}

export default Application