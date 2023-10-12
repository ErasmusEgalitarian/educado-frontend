import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'

// Interfaces
import { type LoginReponseError } from '../interfaces/LoginReponseError'

// Services
import AuthServices from '../services/auth.services'
import useAuthStore from '../contexts/useAuthStore'

// Interface
interface Inputs {
  email: string
  password: string
}

const Login = () => {
  // Location
  const [error, setError] = useState<LoginReponseError.RootObject | null>(null) // store http error objects TODO: get the error text from server instead of reponse code

  // states
  const setToken = useAuthStore(state => state.setToken) // zustand store for key storage
  const setRefresh = useAuthStore(state => state.setRefresh) // zustand store for key storage
  const navigate = useNavigate() // hooke for redirect

  // use-form setup
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  // success on submit handler
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    AuthServices.postUserLogin(data)
      .then((res) => {
        setToken(res.data.data.accessToken)
        setRefresh(res.data.data.refreshToken)
        navigate('/')
      })
      .catch(err => { setError(err); console.log(err) })
  }

  // failure on submit handler FIXME: find out what this does
  const onError: SubmitHandler<Inputs> = error => { console.log(error) }

  return (
        <main className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-tl from-sky-600 to-blue-600 text-gray-200">
            <h1 className="font-bold text-3xl">Welcome Back 👋</h1>
            <div className="bg-white rounded p-12 shadow-lg mt-12">
                <div className='flex flex-col divide text-gray-700'>
                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

                        {error &&
                            <div className="bg-red-200 border-red-600 text-red-600 border-t-4 p-4 w-64 mb-4 rounded" role="alert">
                                <p className="font-bold text-sm">{error.response.statusText}</p>
                                <p className='text-xs'>{error.response.data.msg}.</p>
                            </div>
                        }

                        {/* Username field */}
                        <label className="font-semibold text-xs" htmlFor="usernameField">Email</label>
                        <input {...register('email', { required: true })} className="auth-form-field" type="email" />

                        {/* Password field */}
                        <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
                        <input {...register('password', { required: true })} className="auth-form-field" type="password" />

                        <button type="submit" className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">
                            Login
                        </button>
                    </form>

                    <Link to="/">
                        <button className="flex items-center justify-center h-12 px-6 w-64 mt-4 rounded font-semibold text-sm bg-white border border-blue-500 shadow-md hover:border-blue-700">
                            <img alt="google icon" src="https://developers.google.com/identity/sign-in/g-normal.png" className='mr-2 h-8 w-8' />
                            Sign in with Google
                        </button>
                    </Link>
                </div>

                <div className="flex mt-6 justify-center text-xs">
                    <a className="text-blue-400 hover:text-blue-500" href="#">Forgot Password</a>
                    <span className="mx-2 text-gray-300">/</span>
                    <Link to="/signup" className="text-blue-400 hover:text-blue-500">Apply for Account</Link>
                </div>
            </div>

        </main>
  )
}

export default Login
