import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../contexts/useAuthStore'

// static

import Logo from "../assets/educado.png"
import LogoBlack from "../assets/educado-logo-black.svg"
import LogoWhite from "../assets/educado-logo-white.svg"


// icons
import {
    BookOpenIcon,
    ShieldCheckIcon
} from "@heroicons/react/24/outline";

export const Navbar = () => {
    const navigate = useNavigate();

    //logout handler
    const clearToken = useAuthStore(state => state.clearToken);
    const logout = () => {
        clearToken();
        localStorage.removeItem('token');
    }

    // List to generete dropdown li's 
    const links = [
        { path: "/profile", desc: "Settings" },
				{ path: "/certificates", desc: "Certificates", id: "certificates-button" },
    ]

    return (
        <div className="navbar bg-base-100 border-b">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link to={"/courses"} className="flex">
                                <BookOpenIcon width={20} /><span>Courses</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/educado_admin/applications"} className="flex">
                                <ShieldCheckIcon width={20} /><span>Admin</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <Link to="/" className="flex flex-shrink-0 items-center space-x-3 normal-case text-xl" >
                    <img src={LogoBlack} alt="ecs-logo" className='h-6'/>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li>
                        <Link to={"/courses"} className="flex tooltip tooltip-hover tooltip-bottom" data-tip="see your courses">
                            <BookOpenIcon width={20} /><span>Courses</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/educado_admin/applications"} className="flex tooltip tooltip-hover tooltip-bottom" data-tip="Check Applications">
                            <ShieldCheckIcon width={20} /><span>Admin</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <button className="relative ml-auto text-sm focus:outline-none group" id='profile-dropdown'>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost hover:bg-transparent">
                            <div className="flex items-center justify-between w-10 h-10 rounded">
                                <div className="block relative">
                                    <div className="avatar placeholder">
                                        <div className="bg-blue-500 text-white rounded-full hover:rounded w-10">
                                            <span className="text-md">
                                                JD
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            {links.map((route, key) => <li key={key}><Link id={route.id ?? ''} to={route.path}>{route.desc}</Link></li>)}
                            <li>
                                <Link to={"/login"} onClick={logout} className="w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white">Sign out</Link>
                            </li>
                        </ul>
                    </div>
                </button>
            </div>
        </div>
    )
}
