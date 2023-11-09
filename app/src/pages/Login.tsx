import { createContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useForm, SubmitHandler, set } from "react-hook-form";
import background from "../assets/background.jpg"
import { Icon } from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';
import { mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js';
import Carousel from '../components/archive/Carousel';


// Interfaces
import { LoginResponseError } from "../interfaces/LoginResponseError"

// Services
import AuthServices from '../services/auth.services';

// Helper functions
import { setUserInfo } from '../helpers/userInfo';
import PasswordRecoveryModal from '../components/PasswordRecoveryModal';

//import useAuthStore from '../contexts/useAuthStore';

// Contexts
export const ToggleModalContext = createContext(() => { });

// Interface
type Inputs = {
  email: string,
  password: string,
};

const Login = () => {
  // Location (OLD CODE)
  const [error, setError] = useState<LoginResponseError.RootObject | null>(null); // store http error objects TODO: get the error text from server instead of reponse code
  const [showModal, setShowModal] = useState(false)

  // states  (OLD CODE, MIGHT USE LATER)
  //const setToken = useAuthStore(state => state.setToken);  // zustand store for key storage
  //const setRefresh = useAuthStore(state => state.setRefresh); // zustand store for key storage

  // Navigation hook
  const navigate = useNavigate();


  // Use-form setup
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  //Variable determining the error message
  const [errorMessage, newErrorMessage] = useState('');
  let setErrorMessage = (errMessage: string) => {
    newErrorMessage(errMessage);
  };

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
      password: data.password,
    })
      .then((res) => {
        if (res.status == 202) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("id", res.data.userInfo.id);
          setUserInfo(res.data.userInfo);
          navigate("/courses");

          //setRefresh(res.data.data.refreshToken); (OLD CODE, MIGHT USE LATER)
        }

      })
      .catch(err => {
        setError(err); console.log(err)
        if (!err.response.data) { setErrorMessage("Database Connection Failed"); }
        switch (err.response.data.error.code) {
          case "E0004":
            setErrorMessage('Não existe nenhum usuário com este email!') // User not found
          case "E0101": //Invalid Email 
            setErrorMessage("O email fornecido não está associado a uma conta") //The provided email is not associated with an account
            break;

          case "E0105": //Invalid Password
            setErrorMessage("Senha Incorreta") //Wrong Password
            break;
          default: console.log(error);
        }

        setTimeout(() => {
          setError(null);
        }, 5000);
      });
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

    if (inputloginEmail.value.trim() && inputloginPass.value.trim() !== '') {
      submitloginButton.removeAttribute('disabled');
      submitloginButton.classList.remove('opacity-20', 'bg-cyan-500');
    }
    else {
      submitloginButton.setAttribute('disabled', 'true');
      submitloginButton.classList.add('opacity-20', 'bg-cyan-500');
    }
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


        { /*Container for right side of the page - frame 2332*/}
        <div className='relative right-0 h-screen flex flex-col justify-center items-center'>

          { /*Error message for when email or password is incorrect*/}
          <div className="fixed right-0 top-[4rem] z-10">
            {error && (
              <div className="bg-white shadow border-t-4 p-4 w-52 rounded text-center animate-bounce-short" role="alert">
                <p className="font-bold text-lg">Error</p>
                <p id='error-message' className='text-base'>{errorMessage}</p>
              </div>
            )}
          </div>

          { /*Container for the page's contents, + Back button*/}
          <div className='relative py-8 px-10 w-full'>
            <div className=''>
              <h1 className="mb-10 flex text-base text-[#383838] font-normal font-['Montserrat'] underline">
                <Link to="/welcome">
                  <Icon path={mdiChevronLeft} size={1} color="#383838" />
                </Link>
                <Link to="/welcome" className="text-base text-[#383838] font-normal font-['Montserrat']">
                  Voltar {/*Back*/}
                </Link>
              </h1>
            </div>

            { /*Title*/}
            <h1 className="text-[#383838] text-3xl font-bold font-['Lato'] leading-normal self-stretch ">
              Bem-vindo de volta ao Educado! {/*Welcome back to Educado!*/}
            </h1>

            { /*Submit form, i.e. fields to write email and password*/}
            <form onSubmit={handleSubmit(onSubmit)} className="stretch flex flex-col space-y-2">

              {/* Email field */}
              <div className="relative">
                <label className=" text-[#383838] text-xs font-normal font-['Montserrat'] mt-6" htmlFor="emailField">
                  Email
                  <span className="text-[#FF4949] text-xs font-normal font-['Montserrat']">*</span>
                </label>
                <input onInput={areFieldsFilled}
                  type="email" id="emailField"
                  className="flex border-gray-300 w-[100%] py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
                  placeholder="user@email.com"
                  {...register("email", { required: true })} />
              </div>

              {/* Password field */}
              <div className="relative">
                <label className=" text-[#383838] text-xs font-normal font-['Montserrat'] mt-6" htmlFor="passwordField">
                  Senha {/*Password*/}
                  <span className="text-[#FF4949] text-xs font-normal font-['Montserrat']">*</span>
                </label>
                <input onInput={areFieldsFilled}
                  type={passwordVisible ? "text" : "password"} id="passwordField"
                  className="w-[100%] flex border-gray-300 gap-2.5 py-3 px-4 bg-white placeholder-gray-400 text-base focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
                  placeholder="**********"
                  {...register("password", { required: true })} />
                {/* Hide and show password button */}
                <button type="button" className="absolute right-3 bottom-3" onClick={togglePasswordVisibility} id="hidePasswordIcon">
                  <Icon path={passwordVisible ? mdiEyeOutline : mdiEyeOffOutline} size={1} color="#A1ACB2" />
                </button>
              </div>

              { /*Forgot password button*/}
              <div className=" flex flex-col items-end gap-3">
                <span className="text-neutral-700 text-right text-base font-normal font-['Montserrat']"></span>{" "}
                <label id='modalToggle' onClick={() => setShowModal(true)} className="text-[#383838] text-base font-normal font-['Montserrat'] underline hover:text-blue-500">Esqueceu sua senha? {/**/}</label>
              </div>



              <span className="h-12" /> {/* spacing */}

              { /*Enter button*/}
              <button type="submit" id="submitLoginButton" className="disabled:opacity-20 disabled:bg-cyan-500 flex-auto w-[100%] h-[3.3rem] rounded-lg bg-[#5ECCE9] text-white transition duration-100 ease-in hover:bg-cyan-500 hover:text-gray-50 text-base font-bold font-['Montserrat']"
                disabled>
                Entrar {/*Enter*/}
              </button>

              <span className="h-4" /> {/* spacing */}

              { /*Link to Signup page*/}
              <div className="flex justify-center">
                <span className="text-[#A1ACB2] text-base font-normal font-['Montserrat']">Ainda não tem conta? {/*Don't have an account yet?*/}</span>
                <Link to="/signup" className="text-[#383838] text-base font-normal font-['Montserrat'] underline hover:text-blue-500 gap-6">Cadastre-se agora {/*Register now*/}</Link>
              </div>
            </form>


          </div>
        </div>
      </div>
      {showModal &&
        <ToggleModalContext.Provider value={() => setShowModal(!showModal)}>
          <PasswordRecoveryModal setError={setError} setErrorMessage={setErrorMessage} />
        </ToggleModalContext.Provider>}
    </main>
  )
};

export default Login