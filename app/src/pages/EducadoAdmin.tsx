//Hooks
import { useState } from "react";
import useSWR from "swr";
import { Link, useLocation } from 'react-router-dom';

// Services
import AuthServices from "../services/auth.services";

// Components
import Loading from "../components/general/Loading";
import Layout from "../components/Layout";




const EducadoAdmin = () => {
    //Variable to detect and determine the search term used to filter applications
    const [searchTerm, setSearchTerm] = useState('')
    
    //Location and navigation 
    const location = useLocation();

    //Get data from the relevant route
    const { data } = useSWR(
        'api/applications',
        AuthServices.GetCCApplications
    );

    //If no data is found, or until the data is found, show loading page
    if (!data) return <Loading/>
    
return (
<Layout meta="Educado Admin">
    
    <div className="w-full flex flex-row space-x-2 px-6 py-10">
        <div className="inline-block min-w-full shadow overflow-hidden rounded-xl bg-white">
            <div className='flex flex-row no-wrap'>
        <h1 className='text-3xl font-bold flex-1 mx-6 mt-6'>Solicitações de acesso de criação de conteúdo.</h1>  
    </div>

    {/* Component Header bar */}
    <div className="navbar justify-end md:w-full bg-none p-6">
        <div className="flex-none">
        <Link className="flex-shrink-0 px-12 py-3 text-lg font-semiboldborder font-['Montserrat'] hover:bg-cyan-900 hover:text-gray-50 border-[#166276] bg-[#166276] rounded font-semibold text-white shadow-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-200"
            to="/educado-admin/new-institution"> 
            <button 
                type="submit"
                >Add institution
            </button>
        </Link>
            <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-full md:space-x-3 space-y-3 md:space-y-0 justify-center ">
            
                {/* Input for searchterm */}
                <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-8 pr-3 shadow-sm focus:outline-none hover:bg-white focus:border-sky-500 focus:ring-1 sm:text-sm"
                    type="text" id="search-term"
                    placeholder="Procure um aplicativo..." //Look for an Application
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                    }}
                />
            </form>
        </div>
    </div>

    {/* Component Main */}
    <div className='h-4 my-2 mx-4 bg-grayLight'> </div>
            {/* Table */}
            <table className="min-w-full leading-normal">
                {/* Table Header */}
                <thead>
                    <tr className="bg-white border-b border-gray-200 text-gray-800  text-left text-lg uppercase font-base font-['Lato']">
                        <th scope="col" className="p-5"> 
                            Nome {/* name */}
                        </th>
                        <th scope="col" className="p-5">
                            Email 
                        </th>
                        <th scope="col" className="p-5">
                        Enviado em {/* applied at */}
                        </th>
                        <th scope="col" className="p-5"></th>
                    </tr>
                </thead>

                {/* Table Body: generates the table based on the curren search term. Default is empty */}
                <tbody>
                    {data?.data.data.filter((application: any) => {
                        if (searchTerm == "") {
                            return application;
                        } else if (
                            application.firstName.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return application;
                        }
                        else if (
                            application.lastName.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return application;
                        }
                        else if (
                            application.email.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return application;
                        }
                    }).map((application: any, key: number) => {
                        const date = new Date(application.joinedAt); 
                        return (
                            <tr key={key} className="px-5 py-5 border-b border-gray-200 bg-white text-lg font-['Montserrat']">
                                <td>
                                    <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap" id="name">
                                                {application.firstName} {application.lastName}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className="text-gray-900 whitespace-no-wrap" id="email">
                                        Mail {/* {application.email} */}
                                    </p>
                                </td>
                                <td>
                                    <p className="text-indigo-700 hover:text-indigo-900" id="date">
                                        {date.toString()}
                                    </p>
                                </td>
                                <td className="flex items-center p-4">
                                    <Link to={`${location.pathname}/${application._id}`} id="viewDetails" className="flex items-center justify-center p-2 w-full bg-[#166276] rounded font-semibold text-lg text-white">
                                    Ver detalhes {/** see details */}
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Bottom navbar, currently not in use. Will update when new design is ready */}
            <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                <div className="flex items-center">
                    <button
                        type="button"
                        className="w-full p-4 border text-lg rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
                    >
                        <svg
                            width="9"
                            fill="currentColor"
                            height="8"
                            className=""
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                        </svg>
                    </button>
                    <button
                        type="button"
                        className="w-full px-4 py-2 border-t border-b text-lg text-indigo-500 bg-white hover:bg-gray-100 "
                    >
                        1
                    </button>
                    <button
                        type="button"
                        className="w-full px-4 py-2 border text-lg text-gray-600 bg-white hover:bg-gray-100"
                    >
                        2
                    </button>
                    <button
                        type="button"
                        className="w-full px-4 py-2 border-t border-b text-lg text-gray-600 bg-white hover:bg-gray-100"
                    >
                        3
                    </button>
                    <button
                        type="button"
                        className="w-full px-4 py-2 border text-lg text-gray-600 bg-white hover:bg-gray-100"
                    >
                        4
                    </button>
                    <button
                        type="button"
                        className="w-full p-4 border-t border-b border-r text-lg  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
                    >
                        <svg
                            width="9"
                            fill="currentColor"
                            height="8"
                            className=""
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</Layout>
);
}
export default EducadoAdmin;