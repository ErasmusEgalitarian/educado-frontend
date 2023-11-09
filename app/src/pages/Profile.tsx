import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'react-toastify';
import PopUpDelete from '../components/profile/PopUpDelete';

// Contexts
import useAuthStore from '../contexts/useAuthStore';

// Interfaces
import { LoginResponseError as ResponseError } from "../interfaces/LoginResponseError"

// Components
import Layout from "../components/Layout";
import { PageDescriptor } from '../components/PageDescriptor';
import AccountServices from '../services/account.services';

// Icons
import {
    InformationCircleIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/outline";
import useToken from '../hooks/useToken';

type ChangePasswordInputs = {
    oldPassword: string,
    newPassword: string
}

type ProfileInfoInputs = {
    firstName: string,
    lastName: string
}


const Profile = () => {
    //const token = useAuthStore(state => state.token);
    const token = useToken();

    // response errors
    const [changePasswordResponseError, setChangePasswordResponseError] = useState<ResponseError.RootObject | null>(null);

    // password show toggles
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    // use-form setup
    const { 
        register: profileInfoRegister, 
        handleSubmit: profileInfoHandleSubmit, 
        formState: { errors: profileInfoErrors }, 
        setValue 
    } = useForm<ProfileInfoInputs>();

    const { 
        register: changePasswordRegister, 
        handleSubmit: changePasswordHandleSubmit, 
        formState: { errors: changePasswordErrors, isSubmitSuccessful: changePasswordSubmitSuccessful },
        reset: resetChangePasswordForm
    } = useForm<ChangePasswordInputs>();
    
    // submit handlers
    const onProfileInfoSubmit: SubmitHandler<ProfileInfoInputs> = async (data) => {
        AccountServices.updateProfileInfo(data, token)
        .then(() => toast.success('Profile updated successfully'))
        .catch((err) => toast.error('Failed to update profile info. Try again or refresh page'))
    };
        
    const onChangePasswordSubmit: SubmitHandler<ChangePasswordInputs> = async (data) => {
        AccountServices.changePassword(data, token)
        .then(() => toast.success('Password has been changed'))
        .catch((err) => setChangePasswordResponseError(err.response.data))
    };
    
    
    useEffect(() => {
        if (changePasswordSubmitSuccessful)     resetChangePasswordForm()
        token && AccountServices.getProfileInfo(token)
            .then(response => {
                setValue('firstName', response.data.firstName)
                setValue('lastName', response.data.lastName)
            })
            .catch(error => console.log(error))
        
    }, [changePasswordSubmitSuccessful, token])
    
    
    
    return (
        <Layout meta='Profile'>

            {/** Page Descriptor */}
            <PageDescriptor
                title="Profile"
                desc="Here you can update your profile settings"
            />

            {/** Profile settings */}
            <div className='container mx-auto flex flex-col p-6'>
                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <form onSubmit={profileInfoHandleSubmit(onProfileInfoSubmit)}>
                                <div className="overflow-hidden shadow sm:rounded-md">
                                    <div className="bg-white px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                                                    First name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    {...profileInfoRegister("firstName", { required: true })}
                                                />
                                                {profileInfoErrors.firstName && <span>This field is required</span>}
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Last name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    {...profileInfoRegister("lastName", { required: true })}
                                                />
                                                {profileInfoErrors.lastName && <span>This field is required</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center btn btn-sm btn-primary"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200" />
                    </div>
                </div>


                {/** Account settings */}
                <div>
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Account</h3>
                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <form onSubmit={changePasswordHandleSubmit(onChangePasswordSubmit)}>
                                <div className="shadow sm:overflow-hidden sm:rounded-md">
                                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                        <h2>Change password</h2>

                                        {changePasswordResponseError &&
                                            <div className="bg-red-200 border-red-600 text-red-600 border-t-4 p-4 w-128 mb-4 rounded" role="alert">
                                                <p className='text-sm'>{changePasswordResponseError.message}.</p>
                                            </div>
                                        }

                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6">
                                                <label htmlFor="old-password" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Old password
                                                    <div className='flex space-x-2 pt-2'>
                                                        <InformationCircleIcon width={20} />
                                                        <p className='text-xs'>if you are changing your password for the first time then the old password is the one-time password that was sent to you by email</p>
                                                    </div>
                                                </label>
                                                <div className='flex flex-row'>
                                                    <input
                                                        type={showOldPassword ? 'text' : 'password'}
                                                        id="old-password"
                                                        autoComplete="old-password"
                                                        className="form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                        {...changePasswordRegister("oldPassword", { required: true })}
                                                    />
                                                    <button
                                                        type='button'
                                                        className='btn text-xs'
                                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                                    >
                                                        {showOldPassword ?
                                                            <EyeIcon width={20} /> :
                                                            <EyeSlashIcon width={20} />
                                                        }
                                                    </button>
                                                </div>
                                                {changePasswordErrors.oldPassword && <span className='text-sm text-red-600'>This field is required</span>}
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                                                    New password
                                                    <p className='pt-2 text-xs'>* password should be atleast 8 letters long and contain a capital letter</p>
                                                </label>
                                                <div className='flex flex-row'>
                                                    <input
                                                        type={showNewPassword ? 'text' : 'password'}
                                                        id="new-password"
                                                        autoComplete="new-password"
                                                        className="form-field focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                        {...changePasswordRegister("newPassword", { required: true })}
                                                    />
                                                    <button
                                                        type='button'
                                                        className='btn text-xs'
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                    >
                                                        {showNewPassword ?
                                                            <EyeIcon width={20} /> :
                                                            <EyeSlashIcon width={20} />
                                                        }
                                                    </button>
                                                </div>
                                                {changePasswordErrors.newPassword && <span className='text-sm text-red-600'>This field is required</span>}
                                            </div>
                                        </div>
                                    </div>


                                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center btn btn-sm btn-primary"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="inline-flex justify-center md:grid md:grid-cols-3 md:gap-6">
                                <a onClick={openModal} className='font-medium text-red-500 underline hover:text-red-600'
                                    >
                                    Deletar conta
                                    </a>
                                {isModalOpen && (
                                <PopUpDelete
                                    popupOpen={isModalOpen}
                                    onTogglePopup={() => setIsModalOpen(!isModalOpen)}
                                />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile;

