import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSWR from 'swr';

// Services
import AuthServices from '../services/auth.services';
import {BACKEND_URL} from '../helpers/environment';

// Components
import Loading from '../components/general/Loading';
import Layout from '../components/Layout';

function SingleApplicantView() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch Application Details
    const { data, error } = useSWR(
        [`${BACKEND_URL}/api/applications/${id}`],
        AuthServices.GetSingleUserApplication
    );

    // TODO: Not finished
    const handleAccept = () => {
        AuthServices.PostAcceptContentCreator(id!)
            .then(res => { console.log(res) })
            .catch(_ => toast.error(`Failed to Approve: ${id}`));
    }

    // TODO: Not finished
    const handleReject = () => {
        AuthServices.PostDelcineContentCreator(id!)
            .then(_ => {
                toast.success(`Rejected: ${id}`);
                navigate("/educado_admin");
            })
            .catch(_ => toast.error(`Failed to Reject: ${id}`));
    }

    if (error) { <>Error...</>; }
    if (!data) return <Loading />

    return (
        <Layout meta={`Applicant: ${id?.slice(0, 10)}...`}>
            <div className="grid place-items-center h-screen">
                <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded">
                    <div className=" px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Applicant: <span className="text-blue-500">{data?.email}</span>
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Details and informations about the applicant.
                        </p>
                    </div>

                    <div className="border-t border-gray-200">

                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data?.firstName}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Email address
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {data?.email}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Applied at:
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <>{data?.dateCreated}</> {/** FIXME: Date object is not a valid child of HTML element */}
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <button onClick={handleReject} type="button" className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Decline
                        </button>
                        <button onClick={handleAccept} type="button" className=" py-2 px-4 flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded  ">
                            Approve
                        </button>
                    </div>
                </div >
            </div>
        </Layout>
    );
}

export default SingleApplicantView;



