import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSWR from 'swr';

// Services
import AuthServices from '../services/auth.services';

// Components
import Loading from '../components/general/Loading';
import Layout from '../components/Layout';
import ApplicantDetails from '../components/SingleApplicantView/ApplicantDetails';
import AcademicExperience from '../components/SingleApplicantView/AcademicExperience';
import WorkExperience from '../components/SingleApplicantView/WorkExperience';


function SingleApplicantView() {

    //Get user id from URL
    const { id } = useParams();
    const navigate = useNavigate();
    //Get data from the relevant route
    const { data } = useSWR(
        id,
        AuthServices.GetSingleCCApplication
    );
    
    //Function to execute upon accepting an application
    //It will navigate to the applicaitons page, and display a toastify message notifying the user that the content creator was approved
    const handleAccept = async () => {
        AuthServices.AcceptApplication(id!)
            .then((res) => { 
                console.log(res)
                navigate("/educado-admin/applications"); 
                setTimeout(() => {
                toast.success((data?.data.applicator.firstName+" "+data?.data.applicator.lastName+" aprovado"), { hideProgressBar: true, 
                        });
                }, 1);
            })
            .catch(() => toast.error(`Falha ao Aprovar a Candidatura`));
            
    }

    //Function to execute upon rejecting an application
    //It will navigate to the applicaitons page, and display a toastify message notifying the user that the content creator was rejected
    const handleReject = () => {
        AuthServices.RejectApplication(id!)
            .then(() => {
                navigate("/educado-admin/applications");
                setTimeout(() => {
                    toast.error((data?.data.applicator.firstName+" "+data?.data.applicator.lastName+" rejeitado"), { hideProgressBar: true, 
                            });
                    }, 1);
            })
            .catch(() => toast.error(`Falha ao Rejeitar a Candidatura`)); //Failed to reject application
    }

    //If no data is found, or until the data is found, show loading page
    if (!data) return <Loading />
    //When attempting to view an application that does not exist, user will be navigated back to the applicaitons page, and be notified of the error
    if (data?.data.application == undefined){
        navigate("/educado-admin/applications");
        setTimeout(() => {
            toast.error(("Este usuário não tem candidatura"), { hideProgressBar: true, 
                    });
            }, 1);
    }
    
    
return (
<Layout meta={`Applicant: ${id?.slice(0, 10)}...`}>
    <div className="grid place-items-center h-screen pt-20">

        {/*Container for the contents of the page*/}
        <div className="bg-white shadow overflow-hidden rounded-xl">
            <div className=" px-4 py-8 sm:px-10">
                <h3 className=" leading-6 text-2xl font-bold font-['Montserrat'] text-gray-900 ">
                Candidato: <span className="text-blue-500">{data.data.applicator.email}</span> {/* Applicant's mail*/}
                </h3>
                <p className="mt-3 max-w-3xl text-lg font-['Montserrat'] text-gray-500">
                Detalhes e informações sobre o candidato. {/**  Details and informations about the applicant*/}
                </p>
            </div>

            
            <div className="border-t mx-10 pb-1 pt-1 bg-grayLight">
                <ApplicantDetails data={data} />
                <AcademicExperience data={data} />
                <WorkExperience data={data} />      
            </div>
            
            <div className="bg-gray-50 px-6 py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">   
                <button onClick={handleReject} id="reject-button" type="button" className="py-3 px-4 flex justify-center items-center font-['Montserrat']  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded ">
                Negar {/* Decline */}
                </button>
                <button onClick={handleAccept} id="approve-button" type="button" className=" py-3 px-4 flex justify-center items-center font-['Montserrat'] bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded">
                Aprovar {/* Approve*/}
                </button>
            </div> 
        </div> 
    </div>
</Layout>
);
}

export default SingleApplicantView;