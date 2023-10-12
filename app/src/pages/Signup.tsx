import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// services
import AuthServices from '../services/auth.services'

// Form input interface
interface ApplicationInputs {
  firstName: string
  lastName: string
  email: string
  motivation: string
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Your First Name is Required!'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Your Last Name is Required!'),
  email: Yup.string().email('Invalid email format').required('Required'),
  motivation: Yup.string()
    .min(20, 'Too Short!')
    .max(1000, 'Too Long!')
    .required('Required')
})

const Signup = () => {
  const navigate = useNavigate() // navigation hook

  // use-hook-form setup
  const { register, handleSubmit, formState: { errors } } = useForm<ApplicationInputs>({
    resolver: yupResolver(SignupSchema)
  })

  // onSubmit Handler
  const onSubmit = async (data: any) => {
    await AuthServices.postUserApplication({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      motivation: data.motivation
    })
    navigate('/login')
  }

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-tl from-sky-600 to-blue-600 text-gray-200">
      <h1 className="font-bold text-3xl">Content Creator Application</h1>
      <div className="bg-white rounded p-12 shadow-lg mt-12 min-w-min w-[500px]">
        <div className='flex flex-col divide text-gray-700'>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <label className="font-semibold text-xs" htmlFor="usernameField">First name</label>
            <input
              type="text"
              className="rounded border flex-1 appearance-none border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="First Name"
              {...register('firstName', { required: 'Please enter your first name.' })}
            />
            {errors.firstName?.message}

            <label className="font-semibold text-xs" htmlFor="usernameField">Last name</label>
            <input
              type="text"
              className="rounded border flex-1 appearance-none border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Last Name"
              {...register('lastName', { required: 'Please enter your last name.' })}
            />
            {errors.lastName?.message}

            <label className="font-semibold text-xs mt-3" htmlFor="usernameField">Email</label>
            <input
              type="text"
              className="rounded border flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Email"
              {...register('email', { required: 'Please enter your email.' })}
            />
            {errors.email?.message}

            <label className="font-semibold text-xs mt-3">Motivation box</label>
            <textarea
              className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              id="motivation"
              placeholder="What is your motivation for applying as a content creator?"
              rows={5}
              {...register('motivation', { required: 'Please enter a motivation.' })}
            ></textarea>
            <p>{errors.motivation?.message}</p>

            <button
              className="flex items-center justify-center h-12 px-6 w-full bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
              type='submit'
            >
              Submit
            </button>
          </form>
        </div>

        <div className="flex mt-6 justify-center text-xs">
          <a className="text-blue-400 hover:text-blue-500" href="#">Forgot Password</a>
          <span className="mx-2 text-gray-300">/</span>
          <Link to="/login" className="text-blue-400 hover:text-blue-500">Already have an account?</Link>
        </div>
      </div>
    </main>
  )
}

export default Signup
