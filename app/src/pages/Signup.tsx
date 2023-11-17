import { useForm } from "react-hook-form";
import { useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react';
import * as Yup from 'yup';
import {Icon} from '@mdi/react';
import { mdiEyeOffOutline, mdiEyeOutline, mdiChevronLeft, mdiCheckBold, mdiAlertCircleOutline } from '@mdi/js';
import Carousel from "../components/archive/Carousel";

// Static assets
import background from "../assets/background.jpg"


// interfaces
import { LoginResponseError } from "../interfaces/LoginResponseError"

// services
import AuthServices from '../services/auth.services'

// Form input interface
interface ApplicationInputs {
  firstName: String,
  lastName: String,
  email: String, 
  password: String,
  confirmPassword: String,
}

// Yup schema for fields
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Seu primeiro nome é obrigatório!"), /*Your first name is Required*/ 

  lastName: Yup.string()
    .required("Seu sobrenome é obrigatório!"), /*Your last name is Required*/ 

  password: Yup.string()
    .min(8, 'Muito curto!') /*Too Short!*/ 
    .required("A senha não é longa o suficiente"), /*Password is not long enough*/ 
  confirmPassword:  Yup.string().oneOf([Yup.ref('password'), null], "Ss senhas não coincidem"),
  
  email: Yup.string()
    .email('Formato de email inválido').required('Required'), /*Invalid email format*/ 
  });


const Signup = () => {

  const [error, setError] = useState<LoginResponseError.RootObject | null>(null);

  // Navigation hook
  let navigate = useNavigate();

  // Use-form setup
  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationInputs>({
    resolver: yupResolver(SignupSchema)
  });

  //Variable determining the error message
  const [errorMessage, newErrorMessage] = useState('');
  let setErrorMessage = (errMessage: string) => {
    newErrorMessage(errMessage);
  };

  //Variable determining the error message for both fields.
  const [emailExistsError, setEmailExistError] = useState(null);
  const [emailExistsErrorMessage,  setErrorExistMessage] = useState('');
  
  const [passwordMismatchError, setPasswordMismatchError] = useState(null);
  const [passwordMismatchErrorMessage, setPasswordMismatchErrorMessage] = useState('');

  
  /**
    * OnSubmit function for Signup.
    * Takes the submitted data from the form and sends it to the backend through a service.
    *
    * @param {JSON} data Which includes the following fields:
    * @param {String} data.name Name of the Content Creator
    * @param {String} data.email Email of the Content Creator
    * @param {String} data.password Password of the Content Creator (Will be encrypted)
    */
  const onSubmit = async (data: any) => {
    setIsFormValid(Object.keys(errors).length === 0);
    await AuthServices.postUserSignup({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    }).then((res) => {
      const id = res.data.contentCreatorProfile.baseUser;
      navigate(`/application/${id}`)
    })
    .catch(err => { setError(err); console.log(err)
      if (!err.response.data){setErrorMessage("Database Connection Failed"); console.log(err)}
      switch (err.response.data.error.code){
        case "E0201": //User with the provided email already exists
            setEmailExistError(err);
            setErrorExistMessage("Já existe um usuário com o email fornecido") //User with the provided email already exists
            setPasswordMismatchError(null);
            setPasswordMismatchErrorMessage('');
            break;

        case "E0105": // If the passwords do not match, return an error message
            setPasswordMismatchError(err);
            setPasswordMismatchErrorMessage("As senhas não combinam") //the passwords do not match
            setEmailExistError(null);
            setErrorExistMessage('');
            break;
          default: console.log(error);
        }
      });

  };

  const [isFormValid, setIsFormValid] = useState(false);

  // Variables determining whether or not the password is visible
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }
  const [passwordVisibleRepeat, setPasswordVisibleRepeat] = useState(false);
  const togglePasswordVisibilityRepeat = () => {
    setPasswordVisibleRepeat(!passwordVisibleRepeat)
  }

  //Variables and functions for checking and setting password checks
  const [passwordCheck1, setPasswordCheck1] = useState(false);
  const [passwordCheck2, setPasswordCheck2] = useState(false);

  const handlePasswordChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const password = e.target.value;

    const isCheck1Fulfilled = password.length >= 8;
    setPasswordCheck1(isCheck1Fulfilled);

    const isCheck2Fulfilled = /.*\p{L}.*$/u.test(password);
    setPasswordCheck2(isCheck2Fulfilled);
  };

  // Function for validating that all fields are filled in
  function areFieldsFilled() {
    const inputSignupFirstName = document.getElementById('firstNameField') as HTMLInputElement;
    const inputSignupLastName = document.getElementById('lastNameField') as HTMLInputElement;
    const inputSignupEmail = document.getElementById('emailField') as HTMLInputElement;
    const inputSignupPass = document.getElementById('passwordField') as HTMLInputElement;
    const inputSignupRedoPass = document.getElementById('passwordFieldRepeat') as HTMLInputElement;
    const submitSignupButton = document.getElementById('submitSignupButton') as HTMLButtonElement;
   
    if(inputSignupFirstName.value.trim() && inputSignupLastName.value.trim() && inputSignupEmail.value.trim() && inputSignupPass.value.trim() && inputSignupRedoPass.value.trim() !== '') {
      submitSignupButton.removeAttribute('disabled');
      submitSignupButton.classList.remove('opacity-20');
    } 
    else {
      submitSignupButton.setAttribute('disabled', 'true');
      submitSignupButton.classList.add('opacity-20');
    }
    // function to clear error messages once fields are empty 
    setPasswordMismatchError(null);
    setPasswordMismatchErrorMessage('');
    setEmailExistError(null);
    setErrorExistMessage('');
  };


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

  { /*Container for the pages contents, + Back button*/ }  
  <div className='relative py-8 px-10 w-full'>
  <div className='self-stretch'>
    <h1 className="mb-4 flex text-lg text-[#383838] font-normal font-['Montserrat'] underline"> 
      <Link to="/welcome">
        <Icon path={mdiChevronLeft} size={1} color="#383838" />
      </Link>
      <Link to="/welcome" className="text-lg text-[#383838] font-normal font-['Montserrat']">
        Voltar {/*Back*/}
      </Link>
    </h1>
  </div>

            {/*Title*/}
            <h1 className="text-[#383838] text-3xl font-bold font-['Lato'] leading-normal self-stretch ">
              Crie a sua conta gratuitamente! {/*Create your account for free!*/}
            </h1>

            { /*Submit form, i.e. fields to write name, email, and password*/}
            <form onSubmit={handleSubmit(onSubmit)} className="stretch flex flex-col">

    <div className="flex">

      { /*FirstName Field*/ }
      <div className="relative flex-1">
      <label className="flex flex-start text-[#383838] text-sm font-normal gap-1 font-['Montserrat'] mt-5 after:content-['*'] after:ml-0.5 after:text-red-500 "htmlFor="firstNameField"> 
          Nome {/*Name*/}
      </label>
      <input onInput={areFieldsFilled}
        type="text" id="firstNameField"
        className="w-[95%] flex border-gray-300  py-3 px-4 bg-white placeholder-gray-400 text-lg text-[#383838]  focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
        placeholder="Nome"
        {...register("firstName", { required: "digite seu nome primeiro nome." })}/> { /*enter your first name*/ }
      </div>
      
      { /*Last Name Field*/ }
      <div className="relative flex-1 ml-2">
      <label className="flex flex-start text-[#383838] text-sm font-normal gap-1 font-['Montserrat'] mt-5 after:content-['*'] after:ml-0.5 after:text-red-500 "htmlFor="lastNameField"> 
      Sobrenome {/*Last Name*/}
      </label>
      <input onInput={areFieldsFilled}
        type="text" id="lastNameField"
        className="w-[100%] flex border-gray-300  py-3 px-4 bg-white placeholder-gray-400 text-lg text-[#383838] focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
        placeholder="Sobrenome"
        {...register("lastName", { required: "digite seu nome, sobrenome." })}/> { /*enter your last name*/ }
      </div>

    </div>

      { /*Email Field*/ }
      <div className="relative">
      <label className=" flex flex-start text-[#383838] text-sm font-normal gap-1 font-['Montserrat'] mt-5 after:content-['*'] after:ml-0.5 after:text-red-500 " htmlFor="usernameField">
        Email 
      </label>
      <input onInput={areFieldsFilled}
        type="email" id="emailField"
        className="w-[100%]  flex border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
        placeholder="usuario@gmail.com"
        {...register("email", { required: " introduza o seu e-mail." })}/>

        {emailExistsError && (
        <div className="flex items-center font-normal font-['Montserrat']" role="alert">
          <Icon path={mdiAlertCircleOutline} size={0.6} color="red"/> 
          <p className='mt-1 ml-1 text-red-500 text-sm'>{emailExistsErrorMessage}</p>
        </div>
       )}
      </div>

      { /*Password Field*/ }
      <div className="relative">
      <label className=" flex flex-start text-[#383838] text-sm font-normal gap-1 font-['Montserrat'] mt-5 after:content-['*'] after:ml-0.5 after:text-red-500 " htmlFor="passwordField">
        Senha {/*Password*/}
      </label>
      <input onInput={areFieldsFilled}
          type={passwordVisible ? "text" : "password"} id="passwordField"
          className="w-[100%] hflex border-gray-300  py-3 px-4 bg-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
          placeholder="**********"
          {...register("password", { required: "insira a senha." })} onChange={handlePasswordChange}/>
      <button type="button" className="absolute right-3 bottom-3" onClick={togglePasswordVisibility} id="hidePasswordIcon">
        <Icon path={passwordVisible ? mdiEyeOutline : mdiEyeOffOutline} size={1} color="#A1ACB2" />
      </button>
      </div>


      { /*Password Checks*/ }
      <div className="px-3">
        <div className="items-stretch text-[#A1ACB2] text-sm font-normal font-['Montserrat'] mt-2">
          {passwordCheck1 ? (
            <Icon className=" left-20 float-left" path={mdiCheckBold} size={0.55} color=" green" />
          ) : null}
          &bull; Mínimo 8 caracteres {/*Minimum 8 characters*/}
        </div >

        <div className="text-[#A1ACB2] text-sm font-normal font-['Montserrat'] items-stretch">
          {passwordCheck2 ? (
            <Icon className="left-20 float-left" path={mdiCheckBold} size={0.55} color="green" />
          ) : null}
          &bull; Conter pelo menos uma letra {/*Contain at least one letter*/}
        </div>
      </div>


      { /*Confirm Password Field */ }
      <div className="relative">
      <label className=" flex flex-start text-[#383838] text-sm font-normal gap-1 font-['Montserrat'] mt-6 after:content-['*'] after:ml-0.5 after:text-red-500 " htmlFor="passwordFieldRepeat">
        Confirmar Senha {/*Confirm Password*/}
      </label>
      <input onInput={areFieldsFilled}
        type={passwordVisibleRepeat ? "text" : "password"} id="passwordFieldRepeat"
        placeholder="********** "
        className="w-[100%] flex border-gray-300 gap-2.5 py-3 px-4 bg-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2  focus:border-transparent focus:ring-sky-200 rounded-lg"
        {...register("confirmPassword", { required: "insira a senha." })}/>
      <button type="button" className="absolute right-3 bottom-3" onClick={togglePasswordVisibilityRepeat}>
        <Icon path={passwordVisibleRepeat ? mdiEyeOutline : mdiEyeOffOutline} size={1} color="#A1ACB2" />
      </button>
      </div>
      {passwordMismatchError && (
        <div className="flex items-center font-normal font-['Montserrat']" role="alert">
          <Icon path={mdiAlertCircleOutline} size={0.6} color="red"/> 
          <p className='mt-1 ml-1 text-red-500 text-sm'>{passwordMismatchErrorMessage}</p>
        </div>
       )}
      
        
      <span className="h-10" /> {/* spacing */}  
      
        { /*Enter button*/ }
        <button type="submit" id="submitSignupButton" className="disabled:opacity-20 disabled:bg-slate-600 flex-auto w-[100%] h-[3.3rem]  rounded-lg bg-[#166276] text-[#FFF] transition duration-100 ease-in hover:bg-cyan-900 hover:text-gray-50 text-lg font-bold font-['Montserrat']"
        disabled>
            Cadastrar {/*Register*/} 
        </button>

      <span className="h-2" /> {/* spacing */}  
      
        { /*Link to Login page*/ }
        <div className="flex justify-center space-x-1"> 
          <span className= "text-[#A1ACB2] text-lg font-normal font-['Montserrat']">Já possui conta? {/*Already have an account?*/}  </span> 
          <Link to="/login" className="text-[#383838] text-lg font-normal font-['Montserrat'] underline hover:text-blue-500 gap-6">Entre agora {/*Get in now*/} </Link>
        </div>
      </form>
    </div>
  </div>
</div>

    </main>
  )
};

export default Signup;