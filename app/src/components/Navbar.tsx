import {Icon} from '@mdi/react';
import { mdiBellOutline, mdiAccount, mdiLogoutVariant, mdiCertificate, mdiNotebookOutline, mdiAccountCog } from '@mdi/js';
import { Link } from 'react-router-dom'
import useAuthStore from '../contexts/useAuthStore'
import { getUserToken } from '../helpers/userInfo';

import decode from 'jwt-decode';

// icons
const Navbar = () => {

    //logout handler
    const clearToken = useAuthStore(state => state.clearToken);
    const logout = () => {
        clearToken();
    }
    /*
    const token = useAuthStore(state => state.token);
    const decodedToken = token ? decode(token) : null;
    
    const firstName = token ? decodedToken?.firstName: "Firstname";
    const lastName = token ? decodedToken?.lastName: "Lastname";
    const email = token ? decodedToken?.email: "mail@mail.com";
    */
    const token = getUserToken();
    const decodedToken = token ? decode(token) : null;
    
    const firstName = token ? decodedToken?.firstName: "Firstname";
    const lastName = token ? decodedToken?.lastName: "Lastname";
    const email = token ? decodedToken?.email: "mail@mail.com";
    
    //navbar for home, profile 
    return (
        <main className="relative min-h-screen bg-gradient-to-br from-[#c8e5ec] to-[white] overflow-hidden">
            {/* Navigation Bar */}
            <nav className="flex fixed w-full items-center justify-between py-3 px-6"
                style={{
                    background: 'var(--secondary, #F1F9FB)',
                    boxShadow: '0px 4px 4px 0px rgba(35, 100, 130, 0.25)'
                }}>

                {/* Logos for navbar */}
                <div className="w-[165.25px] h-6 justify-start items-center gap-[7.52px] flex py-6 px-8">
                    <div className="navbar-start">
                        <Link to="/" className="w-[165.25px] h-6 justify-start items-center gap-[6px] inline-flex space-x-1 normal-case text-xl">
                            <img src='/logo.svg' alt="logo" className="w-[24.43px] h-6" /> <img src='/educado.svg' alt="educado" className="h-6" />
                        </Link>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li>
                        <Link to={"/courses"} className="flex tooltip tooltip-hover tooltip-bottom text-lg font-['Montserrat'] active:bg-[#166276]" data-tip="Veja seus cursos"> {/* see your courses */}
                        <Icon path={mdiNotebookOutline} size={1} color="#A1ACB2" /> <span>Cursos</span> {/*courses*/}
                        </Link>
                    </li>
                    <li>
                        <Link to={"/educado_admin/applications"} className="flex tooltip tooltip-hover text-lg tooltip-bottom font-['Montserrat'] active:bg-[#166276]" data-tip="Verifique os aplicativos"> {/* Check Applications */}
                        <Icon path={mdiAccount} size={1} color="#A1ACB2" /><span>Admin</span> {/*admin*/}
                        </Link>
                    </li>
                </ul>
            </div>

                {/* Notification bell and User information */}
                <div className="relative w-133px h-10 flex items-center gap-6 pr-12">
                    <span className='hidden sm:block container overflow-hidden'>
                     <Icon
                        path={mdiBellOutline} size={1} color={'#A1ACB2'} />
                    </span>


                    <div className="flex flex-col items-start">
                        <span className="hidden sm:block container overflow-hidden text-[#A1ACB2] text-base font-bold font-['Montserrat']">{firstName+" "+lastName}</span>
                        <span className="hidden sm:block container overflow-hidden text-[#A1ACB2] text-sm font-normal font-['Montserrat']">{email}</span>
                    </div>

                    {/* Dropdown for User Actions */}
                    <button className="relative flex flex-col items-start gap-6">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost hover:bg-transparent">
                                <div className="avatar placeholder">
                                    <div className="bg-[#166276] text-white rounded-full hover:rounded w-11">
                                        <span className="text-md">
                                            {firstName.charAt(0)+lastName.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                            </label>

                            {/* Dropdown Content */}
                            <ul tabIndex={0} className="menu dropdown-content flex flex-col items-start p-2 absolute w-[245px] mt-2 bg-[#FFFFFF] rounded-lg"
                                style={{
                                    background: 'var(--secondary, #FFFFFF)',
                                    boxShadow: '0px 2px 4px 0px #B3B3B3'
                                }}>

                                {/* Edit Profile/settings */}
                                <li className="w-full"> {/*class to make the list item fill the width */}
                                    <Link to={"/profile"} className="text-[#383838] text-lg font-normal font-['Montserrat'] hover:bg-[#E4E4E4]">
                                        <span><Icon path={mdiAccountCog} size={1} color="#A1ACB2" /></span>
                                        <span>Editar perfil</span>
                                    </Link>
                                </li>
                                <hr className="relative w-full h-[1px] border-[#E4E4E4] mt-3 mb-3" />

                                {/* My Certificates */}
                                <li className="w-full"> {/*class to make the list item fill the width */}
                                    <Link to={"/courses"} className="text-[#383838] text-lg font-normal font-['Montserrat'] hover:bg-[#E4E4E4]">
                                        <span><Icon path={mdiCertificate} size={1} color="#A1ACB2" /></span>
                                        <span>Meus certificados</span>
                                    </Link>
                                </li>

                                <hr className="relative w-full h-[1px] border-[#E4E4E4] mt-3 mb-3" />

                                {/* Logout */}
                                <li className="w-full"> {/* class to make the list item fill the width */}
                                    <Link to={"/welcome"} onClick={logout} className=" text-[#FF4949] text-lg font-bold font-['Montserrat'] hover:bg-[#E4E4E4]">
                                        <span><Icon path={mdiLogoutVariant} size={1} color="#FF4949" /></span>
                                        <span>Sair</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </button>
                </div>
            </nav>
        </main>
    );
};

export default Navbar