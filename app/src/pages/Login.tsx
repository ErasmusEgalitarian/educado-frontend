import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form";
import logo from "../assets/ecs-logo.png"

// Interfaces
import { LoginReponseError } from "../interfaces/LoginReponseError"

// Services
import AuthServices from '../services/auth.services';
import useAuthStore from '../contexts/useAuthStore';

// Interface
type Inputs = {
    email: String,
    password: String,
};



const Login = () => {
    
    // Location
    const [error, setError] = useState<LoginReponseError.RootObject | null>(null); // store http error objects TODO: get the error text from server instead of reponse code
    
    // states
    const setToken = useAuthStore(state => state.setToken);  // zustand store for key storage
    const setRefresh = useAuthStore(state => state.setRefresh); // zustand store for key storage
    const navigate = useNavigate(); // hooke for redirect

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

    // failure on submit handler FIXME: find out what this does
    const onError: SubmitHandler<Inputs> = error => console.log(error);


    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#c8e5ec] to-[white]">
            <nav className="navbar bg-base-100 border-b shadow fixed top-0 z-10">
                <div className="navbar-start">
                    <Link to="/" className="flex flex-shrink-0 items-center space-x-1 normal-case text-xl" >
                        <img src={logo} alt="ecs-logo" className='h-6' /><p className='font-semibold font-sans'>Educado Studio</p>
                    </Link>
                </div>
             </nav>
            
         <h1 className="w-[400px] text-neutral-700 text-[28px] text-center font-bold font-['Lato']">Bem-vindo de volta ao Educado!</h1>
            <div className= "flex-col justify-start items-center gap-10 inline-flex">
                <div className='flex flex-col divide text-gray-700'>
                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

                 {error &&
                    <div className="bg-red-200 border-red-600 text-red-600 border-t-4 p-4 w-64 mb-4 rounded" role="alert">
                         <p className="font-bold text-sm">{error.response.statusText}</p>
                         <p className='text-xs'>{error.response.data.msg}.</p>
                    </div>
                }

                {/* Username field */}
                    <label className="font-semibold text-xs mt-3" htmlFor="emailField">
                        Email <span className="ml-1 text-red-500 text-xs font-normal font-montserrat">*</span>
                    </label>
                <input
                    {...register("email", { required: true })}
                    className="auth-form-field  outline-none rounded border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="user@email.com"
                    type="email" id="emailField"
                        
                />

                 {/* Password field */}
                     <label className="font-semibold text-xs mt-3" htmlFor="passwordField">
                        Senha <span className="text-red-500 text-xs font-normal font-montserrat">*</span>
                    </label>

                    <input {...register("password", { required: true })} 
                    className="auth-form-field  outline-none rounded border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="**********" 
                    type="password" id="passwordField"
                />

                {/* "forgot password?" text */}
                <div className="w-[522px] text-right text-neutral-700 text-base font-normal font-['Montserrat'] underline">Esqueceu a senha?
            </div>


            <span className="h-5" /> {/* spacing */}
                <button type="submit" className= "w-[522px] h-[52px] px-10 py-4 opacity-30 bg-cyan-300 text-black rounded-lg justify-center items-start gap-2.5 inline-flex">
                    Entrar
                    </button>
                    <span className="h-5" /> {/* spacing */}
                </form>

            </div>
                <div className="text-center">
                <div className="w-[522px] text-center text-neutral-700 text-base font-normal font-['Montserrat']">
                    Ainda não tem conta?
                <span className="underline">
                    <Link to="/signup" className="text-blue-400 hover:text-blue-500"> Cadastre-se agora</Link>
                 </span>

                 </div>
            </div>

        </div>
    
     </main>
    )
}

export default Login