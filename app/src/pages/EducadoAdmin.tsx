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

<<<<<<< HEAD
    const getStatusColor = (application: any) => {
        if (application.approved) return "green";
        if (application.rejected) return "red";
        return "black";
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    const filteredData = data?.data.data.filter((application: any) => {
        if (searchTerm === "") return application;
        if (application.firstName.toLowerCase().includes(searchTerm.toLowerCase())) return application;
        if (application.lastName.toLowerCase().includes(searchTerm.toLowerCase())) return application;
        if (application.email.toLowerCase().includes(searchTerm.toLowerCase())) return application;
    });

    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const startItem = (currentPage - 1) * rowsPerPage + 1;
    const endItem = Math.min(currentPage * rowsPerPage, filteredData.length);

    

    return (
        <Layout meta="Educado Admin">
            <div className="w-full flex flex-row space-x-2 px-12 py-10">
                <div className="inline-block min-w-full shadow overflow-hidden rounded-xl bg-white">
                    <div className='flex flex-row no-wrap'>
                    </div>

                    <div className="navbar justify-end md:w-full bg-none p-6 mt-4">
                        <div className="flex-none flex w-full">
                            <Link
                                className={`flex-shrink-0 w-1/2 px-12 py-3 text-base font-semibold border-b border-b-[#166276] font-['Montserrat'] ${selectedButton === 'users' ? 'bg-[#166276] text-white' : 'bg-white text-[#166276]'} font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-200 text-center`}
                                to="/educado-admin/new-user"
                                onClick={() => setSelectedButton('users')}
                            >
                                <button type="submit">Users</button>
                            </Link>
                            <Link
                                className={`flex-shrink-0 w-1/2 px-12 py-3 text-base font-semibold border-b border-b-[#166276] font-['Montserrat'] ${selectedButton === 'institutions' ? 'bg-[#166276] text-white' : 'bg-white text-[#166276]'} font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-200 text-center`}
                                to="/educado-admin/new-institution"
                                onClick={() => setSelectedButton('institutions')}
                            >
                                <button type="submit">Institutions</button>
                            </Link>
                        </div>
                    </div>

                    <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-full md:space-x-4 space-y-3 md:space-y-0 justify-end p-6 -mt-4">
                        <select className="block bg-white min-w-[175px] flex-grow-0 border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none hover:bg-white focus:border-sky-500 focus:ring-1 sm:text-sm">
                            <option value="option1">Mais recentes</option>
                        </select>
                        <div className="relative min-w-[225px] flex-grow-0">
                            <input
                                className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pr-3 shadow-sm focus:outline-none hover:bg-white focus:border-sky-500 focus:ring-1 sm:text-sm"
                                type="text"
                                id="search-term"
                                placeholder="Buscar usuário"
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                            <svg
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </form>

                    <table className="w-[96%] leading-normal mx-auto">
                        <thead>
                            <tr className="bg-white border-b-4 border-[#166276] text-[#166276] text-left text-base font-base font-['Lato']]">
                            <th scope="col" className="p-7" style={{ width: '5%' }}>Admin</th>
                            <th scope="col" className="p-5" style={{ width: '20%' }}>Nome</th>
                            <th scope="col" className="p-5" style={{ width: '25%' }}>Email</th>
                            <th scope="col" className="p-5" style={{ width: '20%' }}>Status</th>
                            <th scope="col" className="p-5" style={{ width: '30%' }}>Enviado em</th>
                            <th scope="col" className="p-5" style={{ width: '30%' }}></th>
=======
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
>>>>>>> dev
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