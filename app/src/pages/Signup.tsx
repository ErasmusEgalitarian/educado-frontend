import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import logo from "../assets/ecs-logo.png"


// services
import AuthServices from '../services/auth.services'

// Form input interface
interface ApplicationInputs {
  name: String,
  password: String,
  email: String
}

const SignupSchema = Yup.object().shape({
  
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required("Your full name is Required!"),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required("Password is not long enough"),
  email: Yup.string().email('Invalid email format').required('Required'),
});

const Signup = () => {
  let navigate = useNavigate(); // navigation hook

  // use-hook-form setup
  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationInputs>({
    resolver: yupResolver(SignupSchema)
  });

  // onSubmit Handler
  const onSubmit = async (data: any) => {
    await AuthServices.postUserSignup({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    navigate('/login')
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#c8e5ec] to-[white]">
      <nav className="navbar bg-base-100 border-b shadow fixed top-0 z-10">
                <div className="navbar-start">
                    <Link to="/" className="flex flex-shrink-0 items-center space-x-1 normal-case text-xl" >
                      <img src={logo} alt="ecs-logo" className='h-6' /><p className='font-semibold font-sans'>Educado Studio</p>
                    </Link>
                </div>
             </nav>
      
      <h1 className="w-[400px] text-[28px] text-center font-bold font-['Lato']">Crie a sua conta gratuitamente!</h1>
        <div className='flex flex-col divide text-gray-700'>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <label className="font-semibold text-xs mt-3" htmlFor="nameField"> 
            Nome <span className="ml-1 text-red-500 text-xs font-normal font-montserrat">*</span>
             </label>
            <input
              type="text" id="nameField"
              className="rounded border flex-1 appearance-none border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Nome Sobrenome"
              {...register("name", { required: "digite seu nome completo." })}
            />
            {errors.name?.message}

            <label className="font-semibold text-xs mt-3" htmlFor="emailField">
              Email <span className="ml-1 text-red-500 text-xs font-normal font-montserrat">*</span>
              </label>
            <input
              type="text" id="emailField"
              className="rounded flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="user@email.com"
              {...register("email", { required: " introduza o seu e-mail." })}
            />
            {errors.email?.message}

            <label className="font-semibold text-xs mt-3" htmlFor="passwordField">
              Senha <span className="ml-1 text-red-500 text-xs font-normal font-montserrat">*</span>
            </label>
            <input
              type="password" id="passwordField"
              className="rounded border flex-1 appearance-none border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="********** "
              {...register("password", { required: "insira a senha." })}
            />
            {errors.password?.message}
              <button type="submit" className= "w-[522px] h-[52px] px-10 py-4 opacity-30 bg-cyan-300 text-black rounded-lg justify-center items-start gap-2.5 inline-flex">
                Entrar
              </button>
              <span className="h-2" /> {/* spacing */}
          </form>
        </div>

        <div className="text-center">
          <a className="text-blue-400 hover:text-blue-500" href="#">Esqueceu sua senha</a>
          <span className="mx-2 text-gray-300">/</span>
          <Link to="/login" className="text-blue-400 hover:text-blue-500">Já possui conta?</Link>
        </div>
    </main>
  )
}

export default Signup