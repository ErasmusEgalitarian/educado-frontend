import {Icon} from '@mdi/react';
import { mdiBellOutline, mdiAccount, mdiLogoutVariant, mdiCertificate, mdiNotebookOutline, mdiAccountCog } from '@mdi/js';
import { Link } from 'react-router-dom'
import useAuthStore from '../contexts/useAuthStore'
import { getUserInfo } from '../helpers/userInfo';

// icons
export const Navbar = () => {

    //logout handler
    const clearToken = useAuthStore(state => state.clearToken);
    const logout = () => {
        clearToken();
        localStorage.removeItem('token');
    }

    const userInfo: any = getUserInfo();

    let firstName;
    userInfo.firstName ? firstName = userInfo.firstName : firstName = "Firstname";
    
    let lastName = "Lastname"
    userInfo.lastName ? lastName = userInfo.lastName : lastName = "Lastname";

    let email = "email";
    userInfo.email ? email = userInfo.email : email = "Email";
    

    
//navbar for home, profile 
return (
<main>
    {/* Navigation Bar */}
    <nav className="navbar fixed items-center justify-between py-3.5 px-6 bg-white shadow-md">

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
                <Link to={"/courses"} className="flex tooltip tooltip-hover tooltip-bottom text-lg font-['Montserrat']" data-tip="Veja seus cursos"> {/* see your courses */}
                <Icon path={mdiNotebookOutline} size={1} color="grayMedium" /> <span>Cursos</span> {/*courses*/}
                </Link>
            </li>
            <li>
                <Link to={"/educado-admin/applications"} className="flex tooltip tooltip-hover text-lg tooltip-bottom font-['Montserrat']" data-tip="Verifique os aplicativos"> {/* Check Applications */}
                <Icon path={mdiAccount} size={1} color="grayMedium" /><span>Admin</span> {/*admin*/}
                </Link>
            </li>
        </ul>
    </div>

        {/* Notification bell and User information */}
        <div className="relative w-133px h-10 flex items-center gap-6 pr-12">

            {/* Notification Bell */}
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost hover:bg-transparent">
                    <Icon path={mdiBellOutline} size={1} color={'grayMedium'}/>
                </label>
                <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-white rounded-box w-52">
                    {/*Placeholders for notifications*/}
                    <li><Link to="/notifications">Notification 1</Link></li>
                    <li><Link to="/notifications">Notification 2</Link></li>
                    <li><Link to="/notifications">Notification 3</Link></li>
                </ul>
            </div>

            <div className="flex flex-col items-start">
                <span className="hidden sm:block container overflow-hidden text-grayMedium text-lg font-bold font-['Montserrat']">{firstName + " " + lastName}</span>
                <span className="hidden sm:block container overflow-hidden text-grayMedium text-sm font-normal font-['Montserrat']">{email}</span>
            </div>

            {/* Dropdown for User Actions */}
            <button className="relative flex flex-col items-start gap-6">
                <div className="dropdown dropdown-end bg-white">
                    <label tabIndex={0} className="btn btn-ghost hover:bg-transparent ">
                        <div className="avatar placeholder">
                            <div className="bg-[#166276] text-white rounded-full hover:rounded w-11">
                                <span className="text-md">
                                    {firstName.charAt(0) + lastName.charAt(0)}
                                </span>
                            </div>
                        </div>
                    </label>

                    {/* Dropdown Content */}
                    <ul tabIndex={0}
                        className="menu dropdown-content flex flex-col items-start p-2 absolute w-[245px] mt-2 bg-white rounded-lg shadow-md">

                        {/* Edit Profile/settings */}
                        <li className="w-full"> {/*class to make the list item fill the width */}
                            <Link to={"/profile"}
                                  className="text-grayDark text-lg font-normal font-['Montserrat'] hover:bg-grayLight">
                                <span><Icon path={mdiAccountCog} size={1} color="grayMedium"/></span>
                                <span>Editar perfil</span>
                            </Link>
                        </li>
                        <hr className="relative w-full h-[1px] border-grayLight mt-3 mb-3"/>

                        {/* My Certificates */}
                        <li className="w-full"> {/*class to make the list item fill the width */}
                            <Link to={"/certificates"}
                                  className="text-grayDark text-lg font-normal font-['Montserrat'] hover:bg-grayLight">
                                <span><Icon path={mdiCertificate} size={1} color="grayMedium"/></span>
                                <span>Meus certificados</span>
                            </Link>
                        </li>

                        <hr className="relative w-full h-[1px] border-grayLight mt-3 mb-3"/>

                        {/* Logout */}
                        <li className="w-full"> {/* class to make the list item fill the width */}
                            <Link to={"/welcome"} onClick={logout}
                                  className=" text-warning text-lg font-bold font-['Montserrat'] hover:bg-grayLight">
                                <span><Icon path={mdiLogoutVariant} size={1} color="warning"/></span>
                                <span>Sair</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </button>
        </div>
    </nav>
    {/* gap between navbar and other pages */}
    <div className="h-20"/>
</main>
);
};