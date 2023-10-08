import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form";
import logo from "../assets/logo.png"
import educado from "../assets/educado.png"
import background from "../assets/background.jpg"
import Icon from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';
import { mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js';
import Carousel from '../components/archive/Carousel';


// Interfaces
import { LoginReponseError } from "../interfaces/LoginReponseError"

// Services
import AuthServices from '../services/auth.services';
import useAuthStore from '../contexts/useAuthStore';

// Interface
type Inputs = {
    email: string,
    password: string,
};

const Login = () => {
    // Location
    const [error, setError] = useState<LoginReponseError.RootObject | null>(null); // store http error objects TODO: get the error text from server instead of reponse code
    
    // states
    const setToken = useAuthStore(state => state.setToken);  // zustand store for key storage
    const setRefresh = useAuthStore(state => state.setRefresh); // zustand store for key storage
    const navigate = useNavigate(); // hooke for redirect

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInputFilled, setIsInputFilled] = useState(false);

    // use-form setup
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    // success on submit handler
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        AuthServices.postUserLogin({
            email: data.email,
            password: data.password,})
            .then((res) => {
                if(res.status == 200){
                    localStorage.setItem("token", res.data.token);
                    navigate("/profile");
                    
                    //setRefresh(res.data.data.refreshToken);
                }
                
            })
            .catch(err => { setError(err); console.log(err)});
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsInputFilled(newEmail.length > 0 && password.length > 0);
    };
    
      
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setIsInputFilled(email.length > 0 && newPassword.length > 0);
    };

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);

    };

    // failure on submit handler FIXME: find out what this does
    const onError: SubmitHandler<Inputs> = error => console.log(error);
    


  return (
  <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#c8e5ec] to-[white]">
    <nav className="navbar bg-base-100 border-b shadow fixed top-0 z-10">

        <div className="navbar-start">
          <Link to="/" className="w-[165.25px] h-6 justify-start items-center  inline-flex space-x-1 normal-case text-xl">
            <img src={logo} alt="logo" className="w-[24.43px] h-6" /> <img src={educado} alt="educado" className="h-6" />
          </Link>
        </div>
    </nav>
      
      <div className="w-screen h-screen overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-2 m-auto h-screen sm:max-w-956">
            <div className='relative w-full h-screen overflow-hidden'>
                <img src={background} alt="w-[42.375rem]" className='object-cover w-full h-full' />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Carousel/>
                </div>
            </div>
  
          <div className="self-stretch flex-col py-5 px-0">
            <div className="self-stretch flex flex-col justify-center flex-1 mt-[4rem]">
              <div className="flex text-center text-base text-gray-500 font-normal font-Montserrat underline m-6">
                <Link to="/welcome">
                  <Icon path={mdiChevronLeft} size={1} color="gray" />
                </Link>
                <Link to="/welcome" className="flex flex-col justify-between self-stretch text-base text-gray-500 font-normal font-Montserrat underline">
                Voltar
                </Link>
              </div>
            </div>
            </div>
      
          <div className="w-screen h-screen overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-2 m-auto h-screen sm:max-w-956">
              <div className="w-full h-screen overflow-hidden">
                <img src={background} alt="w-[42.375rem] h-[59.5rem]" className="w-full h-full" />
              </div>
      
              <div className="self-stretch flex flex-col items-start justify-between py-5 px-0">
                <div className="self-stretch flex flex-col justify-center flex-1 mt-8 p-6">
                  <div className="flex text-center text-base text-gray-500 font-normal font-Montserrat underline m-6">
                    <Link to="/welcome">
                      <Icon path={mdiChevronLeft} size={1} color="gray" />
                    </Link>
                    <Link to="/welcome" className="flex flex-col justify-between self-stretch text-base text-gray-500 font-normal font-Montserrat underline">
                    Voltar
                    </Link>
                  </div>
                </div>
      
                <div className="fixed right-0 top-[4rem]">
                {error && (
                    <div className="bg-white shadow border-t-4 p-4 w-52 rounded text-center animate-bounce-short" role="alert">
                    <p className="font-bold text-lg">Error:</p>
                    <p className='text-base'>{error.response.data.msg}</p>
                    </div>
                )}
            </div>

            <div className="w-120rem self-stretch flex flex-col items-start justify-center flex-1 py-[4rem] px-[4rem]">
                <h1 className=" text-neutral-700 text-[2rem] font-bold font-['Lato'] leading-normal">
                    Bem-vindo de volta ao Educado!
                </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="stretch flex flex-col space-y-2">

                    {/* Email field */}
                    
                    <div className=" self-stretch flex flex-col item-end">
                      <label className="stretch flex flex-start text-neutral-700 text-x font-normal gap-[4] font-['Montserrat'] mt-6" htmlFor="usernameField">
                        Email <span className="text-red-500 text-xs font-normal font-montserrat">*</span>
                      </label>
                      <input
                        {...register("email", { required: true })}
                        className="auth-form-field w-[38rem] h-[3rem] rounded border flex border-gray-300 gap-2.5 py-3 px-4 bg-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent"
                        placeholder="user@email.com"
                        type="email"
                        onChange={handleEmailChange}
                      />
      
                      {/* Password field */}
                    <div className='relative'>
                        <label className="stretch flex flex-start text-neutral-700 text-x font-normal gap-[4] font-['Montserrat'] mt-6" htmlFor="passwordField">
                          Senha <span className="text-red-500 text-xs font-normal font-montserrat">*</span>
                        </label>
                        <input
                          {...register("password", { required: true })}
                          className="auth-form-field w-[38rem] h-[3rem] rounded border flex border-gray-300 gap-2.5 py-3 px-4 bg-white placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent"
                          placeholder="**********"
                          type={passwordVisible ? "text" : "password"}
                          onChange={handlePasswordChange}
                        />
                        <button
                          type="button"
                          className="absolute right-3 bottom-3"
                          onClick={togglePasswordVisibility}
                        >
                          <Icon path={passwordVisible ? mdiEyeOutline : mdiEyeOffOutline} size={0.9} color="gray" />
                        </button>
                        {/* Hide and show password button */}
                        </div>
                        
                        
            <div className="self-stretch flex flex-col items-end text-right gap-3 mt-1">
             <span className="text-neutral-700 text-base font-normal font-Montserrat"></span>{" "}
            <Link to="/forgotpassword" className="text-neutral-700 text-base font-normal font-Montserrat underline hover:text-blue-500">Esqueceu sua senha?</Link>
        </div>
    </div>
    
    <span className="h-5" /> {/* spacing */}    
        <button
         type="submit"
            className={`px-10 py-4 self-stretch flex rounded-lg justify-center items-start gap-5 mt-8 ${
              isInputFilled ? 'bg-cyan-300 text-white opacity-100 transition duration-100 ease-in hover:bg-cyan-500 hover:text-gray-50 ' : 'bg-cyan-300 text-white opacity-30 '
                 }`}
            >Entrar
        </button>
        
    <span className="h-5" /> {/* spacing */}
        </form>
        <div className="self-stretch justify-center items-start text-center flex"> 
            <div className="text-center">
                <span className=" text-gray-400 text-center text-base font-normal font-Montserrat gap-6">Ainda não tem conta? </span> {" "}
                <Link to="/signup" className="text-neutral-700 text-base font-normal font-Montserrat underline hover:text-blue-500 gap-6">Cadastre-se agora</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
</div>
</div>
</main> )
}

export default Login