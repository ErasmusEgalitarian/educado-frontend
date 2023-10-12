import { useForm, type SubmitHandler } from 'react-hook-form'

// Hooks
import useToken from '../../hooks/useToken'

// Services
import SectionServices from '../../services/section.services'

// Icons
import { PlusIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'

// Interfaces
interface Inputs {
  title: string
}

/**
 * SectionForm component
 *
 * @param {string} id - The id of the board
 * @returns {React.FC} - React component
 */
export const SectionForm = () => {
  // Query Params
  const token = 'dummyToken'
  // const token = useToken();
  const { id } = useParams()
  // const token = useAuthStore(state => state.token);

  /**
 * React useForm setup
 * The register function is used to register input/select Ref and validation rules into the hook.
 * The handleSubmit function is called when the form is submitted.
 */
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    SectionServices.createSection(data, id, token)
      .then(res => { console.log(res) })
      .catch(err => { console.log(err) })
  }

  return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center border rounded p-1">
                <div >
                    <button type="submit" className='btn btn-ghost'>
                        <PlusIcon width={24} />
                    </button>
                </div>

                <div className='flex justify-between w-full space-x-2 ml-2'>
                    <label htmlFor='title' className='hidden'>Adicionar novo</label>
                    <input type="text" placeholder='Adicionar novo'
                        className="form-field focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent border-0 w-full shadow-none"
                        {...register('title', { required: true })}
                    />
                </div>
            </div>
        </form>
  )
}
