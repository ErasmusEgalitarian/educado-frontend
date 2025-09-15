import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";

// Services

// Components
import Loading from "../components/general/Loading";
import Layout from "../components/Layout";
import { useNotifications } from "../components/notification/NotificationContext";
import AcademicExperience from "../components/SingleApplicantView/AcademicExperience";
import ApplicantDetails from "../components/SingleApplicantView/ApplicantDetails";
import WorkExperience from "../components/SingleApplicantView/WorkExperience";
import AuthServices from "../services/auth.services";

const SingleApplicantView = () => {
  // Get user id from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // State to manage the rejection modal and reason
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // State to manage loading states for accept and reject actions
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  //Get data from the relevant route
  const { data } = useSWR(id, AuthServices.GetSingleCCApplication);

  const { addNotification } = useNotifications();

  //Function to execute upon accepting an application
  //It will navigate to the applicaitons page, and display a toastify message notifying the user that the content creator was approved
  const handleAccept = async () => {
    setIsAccepting(true); // Set accepting state to true
    AuthServices.AcceptApplication(id!)
      .then((res) => {
        navigate("/educado-admin/applications");
        addNotification(
          data?.data.applicator.firstName +
            " " +
            data?.data.applicator.lastName +
            " aprovado",
        ); //CHANGE TO PORTUGUESE
      })
      .catch(() => {
        toast.error(`Falha ao Aprovar a Candidatura`);
        setIsAccepting(false); // Reset accepting state on error
      });
  };

  // Function to open the rejection modal
  const openRejectModal = () => {
    setShowRejectModal(true);
  };

  // Function to execute upon rejecting an application
  const handleReject = () => {
    if (!rejectionReason) {
      toast.error("Por favor, insira um motivo para a rejeição.");
      return;
    }

    setIsRejecting(true); // Set rejecting state to true

    AuthServices.RejectApplication(id!, rejectionReason)
      .then(() => {
        setShowRejectModal(false); // Close the modal after successful rejection
        navigate("/educado-admin/applications");
        setTimeout(() => {
          toast.success(
            `${data?.data.applicator.firstName} ${data?.data.applicator.lastName} rejeitado`,
            {
              hideProgressBar: true,
            },
          );
        }, 1);
      })
      .catch((error) => {
        console.error("Error rejecting application:", error);
        toast.error(`Falha ao Rejeitar a Candidatura`);
        setIsRejecting(false); // Reset rejecting state on error
      });
  };

  // If no data is found, or until the data is found, show loading page
  if (!data) return <Loading />;

  // When attempting to view an application that does not exist, user will be navigated back to the applications page
  if (data?.data.application == undefined) {
    navigate("/educado-admin/applications");
    setTimeout(() => {
      toast.error("Este usuário não tem candidatura", {
        hideProgressBar: true,
      });
    }, 1);
  }

  return (
    <Layout meta={`Applicant: ${id?.slice(0, 10)}...`}>
      <div className="grid place-items-center h-screen pt-20">
        <div className="bg-white shadow overflow-hidden rounded-xl">
          <div className="px-4 py-8 sm:px-10">
            <h3 className="leading-6 text-2xl font-bold text-gray-900">
              Candidato:{" "}
              <span className="text-blue-500">
                {data.data.applicator.email}
              </span>
            </h3>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              Detalhes e informações sobre o candidato.
            </p>
          </div>

          <div className="border-t mx-10 pb-1 pt-1 bg-grayLight">
            <ApplicantDetails data={data} />
            <AcademicExperience data={data} />
            <WorkExperience data={data} />
          </div>

          <div className="bg-gray-50 px-6 py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
            <button
              onClick={openRejectModal}
              id="reject-button"
              type="button"
              className="py-3 px-4 flex justify-center items-center bg-red-600 hover:bg-red-700 text-white w-full text-lg font-semibold shadow-md rounded"
              disabled={isAccepting} // Disable if accepting to prevent interaction during accept action
            >
              Negar
            </button>
            <button
              onClick={handleAccept}
              id="approve-button"
              type="button"
              className="py-3 px-4 flex justify-center items-center bg-green-600 hover:bg-green-700 text-white w-full text-lg font-semibold shadow-md rounded"
              disabled={isAccepting} // Disable while accepting
            >
              {isAccepting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    {/* Spinner icon */}
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Processando...
                </>
              ) : (
                "Aprovar"
              )}
            </button>
          </div>
        </div>

        {/* Rejection Modal */}
        {showRejectModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Motivo da Rejeição</h2>
                <textarea
                  className="w-full h-32 border rounded p-2"
                  value={rejectionReason}
                  onChange={(e) => {
                    setRejectionReason(e.target.value);
                  }}
                  placeholder="Digite o motivo da rejeição"
                />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setShowRejectModal(false);
                    }}
                    className="px-4 py-2 bg-gray-300 rounded mr-2"
                    disabled={isRejecting} // Disable if rejecting
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      handleReject();
                    }}
                    className={`px-4 py-2 text-white rounded ${
                      isRejecting ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                    }`}
                    disabled={isRejecting} // Disable while rejecting
                  >
                    {isRejecting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-3"
                          viewBox="0 0 24 24"
                        >
                          {/* Spinner icon */}
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Rejeitando...
                      </>
                    ) : (
                      "Confirmar Rejeição"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SingleApplicantView;
