import { useState } from "react";
import useSWR from "swr";
import { useNavigate, Link, useLocation } from 'react-router-dom';

// Services
import AuthServices from "../services/auth.services";

// Interfaces
import { CCApp } from '../interfaces/CCApp'

// Components
import Loading from "./Loading";
import Layout from "../components/Layout";
import { PageDescriptor } from "../components/PageDescriptor";

import {BACKEND_URL} from "../helpers/environment"



const EducadoAdmin = () => {
    const [searchTerm, setSearchTerm] = useState('')

    // Used to navigate to the detailed view for the single applicant
    let navigate = useNavigate();
    let location = useLocation();

    const { data, error } = useSWR(
        `${BACKEND_URL}/api/applications?approved=false`,
        AuthServices.GetCCApplications
    );

    if (error) { <>Error...</>; }
    if (!data) return <Loading/>

    return (
        <Layout meta="Educado Admin">
            <PageDescriptor
                title="Educado Admin"
                desc="Here you can find all Content Creator Applications"
            />

            <div className="">
                {/** Component Header bar */}
                <div className="navbar justify-end bg-none p-6">
                    <div className="flex-none">
                        <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                            <div className=" relative ">
                                <input
                                    type="text"
                                    className=" rounded border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    placeholder="Looking for an Application?"
                                    onChange={(event) => {
                                        setSearchTerm(event.target.value);
                                    }}
                                />
                            </div>
                            <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200" type="submit">
                                Filter
                            </button>
                        </form>
                    </div>
                </div>

                {/** Component Main */}
                <div className="w-full flex flex-row space-x-4 px-6">
                    <div className="inline-block min-w-full shadow rounded overflow-hidden">
                        <table className="min-w-full leading-normal">
                            {/** Table Header */}
                            <thead>
                                <tr className="bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                    <th scope="col" className="p-5">
                                        Name
                                    </th>
                                    <th scope="col" className="p-5">
                                        email
                                    </th>
                                    <th scope="col" className="p-5">
                                        Applied at
                                    </th>
                                    <th scope="col" className="p-5"></th>
                                </tr>
                            </thead>

                            {/** Table Body */}
                            <tbody>
                                {data?.data.data.filter((application) => {
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
                                }).map((application: CCApp.Datum, key: number) => {
                                    let date = new Date(application.createdAt); // TODO: Format Time
                                    // let dateString = new Intl.DateTimeFormat('en-US').format(date);
                                    return (
                                        <tr key={key} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <td>
                                                <div className="flex items-center">
                                                    <div className="ml-3">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {application.firstName} {application.lastName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {application.email}
                                                </p>
                                            </td>
                                            <td>
                                                <p className="text-indigo-600 hover:text-indigo-900">
                                                    {date.toString()}
                                                </p>
                                            </td>
                                            <td className="flex items-center p-4">
                                                <Link to={`${location.pathname}/${application.id}`} className="flex items-center justify-center p-2 w-full bg-blue-600 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">
                                                    See Details
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/** Navbar */}
                        <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
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
                                    className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 "
                                >
                                    1
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                                >
                                    2
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100"
                                >
                                    3
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                                >
                                    4
                                </button>
                                <button
                                    type="button"
                                    className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
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
            </div>
        </Layout>
    );
}
export default EducadoAdmin;
