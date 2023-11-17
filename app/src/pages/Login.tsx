import { createContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form";
import background from "../assets/background.jpg"
import {Icon} from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';
import { mdiEyeOffOutline, mdiEyeOutline, mdiAlertCircleOutline,  } from '@mdi/js';
import Carousel from '../components/archive/Carousel';


// Interfaces
import { LoginResponseError } from "../interfaces/LoginResponseError"

// Services
import AuthServices from '../services/auth.services';

// Helper functions
import { setUserInfo } from '../helpers/userInfo';
import useAuthStore from '../contexts/useAuthStore';

// Interface
type Inputs = {
  email: string,
  password: string,
};

const Login = () => {
    // Location (OLD CODE)
    const [error, setError] = useState<LoginResponseError.RootObject | null>(null); // store http error objects TODO: get the error text from server instead of reponse code
    
    // Token states
    const setToken = useAuthStore(state => state.setToken); // zustand store for key storage
    const getToken = useAuthStore(state => state.getToken); // zustand get for key storage

    // Navigation hook
    const navigate = useNavigate(); 

  // Use-form setup
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  
  //Variable determining the error message for both fields.
    const [emailError, setEmailError] = useState(null);
    const [emailErrorMessage,  setEmailErrorMessage] = useState('');
  
    const [passwordError, setPasswordError] = useState(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    /**
    * OnSubmit function for Login.
    * Takes the submitted data from the form and sends it to the backend through a service.
    * Upon receiving a success response, the token recieved from the backend will be set in the local storage.
    *
    * @param {JSON} data Which includes the following fields:
    * @param {String} data.email Email of the Content Creator
    * @param {String} data.password Password of the Content Creator (Will be encrypted)
    */
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      AuthServices.postUserLogin({
          email: data.email,
          password: data.password,})
          .then((res) => {
              if(res.status == 202){
                  setToken(res.data.accessToken);
                  localStorage.setItem("token", res.data.accessToken)
                  setUserInfo(res.data.userInfo);
                  
                  navigate("/courses");
              }
             
          // error messages for email and password  
          })
          .catch(err => { setError(err); console.log(err)
            switch (err.response.data.error.code){
              case "E0004": //Invalid Email 
                setEmailError(err);
                setEmailErrorMessage("O email fornecido não está associado a uma conta.");
                setPasswordError(null);
                setPasswordErrorMessage('');
              break;
        
              case "E1001": //User Not Approved
                setEmailError(err);
                setEmailErrorMessage("A conta associada a este e-mail não foi aprovada.");
                setPasswordError(null);
                setPasswordErrorMessage('');  
              break;

              case "E1002": //User Rejected
                setEmailError(err); 
                setEmailErrorMessage("A conta associada a este e-mail foi rejeitada.");
                setPasswordError(null);
                setPasswordErrorMessage('');
              break;

              case "E0105": //Invalid Password
              setEmailError(null);
              setEmailErrorMessage('');
              setPasswordError(err);
              setPasswordErrorMessage("Senha Incorreta.");
              break;
              
              default: console.log(error);
          }});
    };
    
    // Variable determining whether or not the password is visible
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
    
    
    function areFieldsFilled() {
      const inputloginEmail = document.getElementById('emailField') as HTMLInputElement;
      const inputloginPass = document.getElementById('passwordField') as HTMLInputElement;
      
      const submitloginButton = document.getElementById('submitLoginButton') as HTMLButtonElement;
     
      if(inputloginEmail.value.trim() && inputloginPass.value.trim() !== '') {
        submitloginButton.removeAttribute('disabled');
        submitloginButton.classList.remove('opacity-20', 'bg-cyan-500');
      } 
      else {
        submitloginButton.setAttribute('disabled', 'true');
        submitloginButton.classList.add('opacity-20', 'bg-cyan-500');
      }

       // function to clear error messages once fields are empty 
      setEmailError(null);
      setEmailErrorMessage('');
      setPasswordError(null);
      setPasswordErrorMessage('');
    };
    // failure on submit handler FIXME: find out what this does (OLD CODE)
    //const onError: SubmitHandler<Inputs> = error => console.log(error);

  return (
    <main className="bg-gradient-to-br from-[#C9E5EC] 0% to-[#FFF] 100%" >

      { /*Navbar*/}
      <nav className="flex fixed w-full items-center justify-between bg-secondary box-shadow-md bg-fixed top-0 left-0 right-0 z-10" style={{ background: 'var(--secondary, #F1F9FB)', boxShadow: '0px 4px 4px 0px rgba(35, 100, 130, 0.25)' }}>
        <div className="w-[165.25px] h-6 justify-start items-center gap-[7.52px] flex py-6 px-12">
          <div className="navbar-start">
            <Link to="/" className="w-[165.25px] h-6 justify-start items-center gap-[6px] inline-flex space-x-1 normal-case text-xl">
              <img src='/logo.svg' alt="logo" className="w-[24.43px] h-6" /> <img src='/educado.svg' alt="educado" className="h-6" />
            </Link>
          </div>
        </div>
      </nav>

      { /*Container for entire page*/}
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto w-full h-screen">

        { /*Container for left half of the page*/}
        <div className='relative w-full h-screen hidden md:block container overflow-hidden'>
          <img src={background} alt="w-[42.375rem]" className='object-cover w-full h-full' />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Carousel /> { /*Carousel integration*/}
          </div>
        </div>


    { /*Container for right side of the page - frame 2332*/ }
    <div className='relative right-0 h-screen flex flex-col justify-center items-center'>
            
      { /*Container for the page's contents, + Back button*/ }
      <div className='relative py-8 px-10 w-full'>
        <div className=''>
          <h1 className="mb-10 flex text-lg text-[#383838] font-normal font-['Montserrat'] underline"> 
            <Link to="/welcome">
              <Icon path={mdiChevronLeft} size={1} color="#383838" />
            </Link>
            <Link to="/welcome" className="text-lg text-[#383838] font-normal font-['Montserrat']">
              Voltar {/*Back*/}
            </Link>
          </h1>
        </div>

        { /*Title*/ }
        <h1 className="text-[#383838] text-3xl font-bold font-['Lato'] leading-normal self-stretch mb-10 ">
          Bem-vindo de volta ao Educado! {/*Welcome back to Educado!*/}
        </h1>

            { /*Submit form, i.e. fields to write email and password*/}
            <form onSubmit={handleSubmit(onSubmit)} className="stretch flex flex-col space-y-2">

          {/* Email field */}
          <div>
            <div className="relative">
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 text-[#383838] text-sm font-normal font-['Montserrat'] mt-6" htmlFor="emailField">
              Email
            </label>
            <input onInput={areFieldsFilled} 
              type="email" id="emailField"
              className="flex border-gray-300 w-[100%] py-3 px-4 bg-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
              placeholder="usuario@gmail.com"
              {...register("email", { required: true })}/>

            {emailError && (
            <div className="flex items-center font-normal font-['Montserrat']" role="alert">
              <Icon path={mdiAlertCircleOutline} size={0.6} color="red"/> 
            <p className='mt-1 ml-1 text-red-500 text-sm'>{emailErrorMessage}</p>
            </div>
          )}
          </div>
        </div>

          {/* Password field */}
        <div>
          <div className="relative">
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 text-[#383838] text-sm font-normal font-['Montserrat'] mt-6" htmlFor="passwordField">
              Senha {/*Password*/}
          </label>
        <input
          onInput={areFieldsFilled}
          type={passwordVisible ? "text" : "password"}
          id="passwordField"
          className="w-[100%] flex border-gray-300 gap-2.5 py-3 px-4 bg-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
          placeholder="**********"
        {...register("password", { required: true })}
        />

      {/* Hide and show password button */}
        <button type="button" className="absolute right-3 bottom-3" onClick={togglePasswordVisibility} id="hidePasswordIcon">
          <Icon path={passwordVisible ? mdiEyeOutline : mdiEyeOffOutline} size={1} color="#A1ACB2" />
       </button>
      </div>

      {passwordError && (
        <div className="flex items-center font-normal font-['Montserrat']" role="alert">
          <Icon path={mdiAlertCircleOutline} size={0.6} color="red"/> 
          <p className='mt-1 ml-1 text-red-500 text-sm'>{passwordErrorMessage}</p>
        </div>
       )}
      </div>

            
    { /*Forgot password button*/ }
      <div className=" flex flex-col items-end text-right gap-3">
       <span className="text-neutral-700 text-lg font-normal font-['Montserrat']"></span>{" "}
          <Link to="/forgotpassword" className="text-[#383838] text-lg font-normal font-['Montserrat'] underline hover:text-blue-500">Esqueceu sua senha? {/**/}</Link>
        </div>
          
        <span className="h-12" /> {/* spacing */}  
          
      { /*Enter button*/ }
        <button type="submit" id="submitLoginButton" className="disabled:opacity-20 disabled:bg-slate-600 flex-auto w-[100%] h-[3.3rem] rounded-lg bg-[#166276] text-white transition duration-100 ease-in hover:bg-cyan-900 hover:text-gray-50 text-lg font-bold font-['Montserrat']"
          disabled>
            Entrar {/*Enter*/}
          </button>

              <span className="h-4" /> {/* spacing */}

          { /*Link to Signup page*/ }
          <div className="flex justify-center space-x-1"> 
            <span className= "text-[#A1ACB2] text-lg font-normal font-['Montserrat']">Ainda não tem conta? {/*Don't have an account yet?*/}</span> 
            <Link to="/signup" className="text-[#383838] text-lg font-normal font-['Montserrat'] underline hover:text-blue-500 gap-6">Cadastre-se agora {/*Register now*/}</Link> 
          </div>
        </form>
      </div>
    </div>
  </div>
</main>
)};

export default Login