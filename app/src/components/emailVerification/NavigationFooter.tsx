import { useContext, useState } from "react";
import { FormDataContext } from "../../pages/Signup"; // Import the context
import AuthServices from '../../services/auth.services';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { LoginResponseError } from "../../interfaces/LoginResponseError";
import { ToggleModalContext } from "../../pages/Signup";
type propsType = {
  codeVerified: boolean;
  token: string; // Add the token (code) prop
};

export default function NavigationFooter(props: propsType): JSX.Element {
  const { token, codeVerified } = props; // Destructure token from props
  const toggleModal = useContext(ToggleModalContext);
  const formData = useContext(FormDataContext); // Access form data from context
  const navigate = useNavigate();
  const [error, setError] = useState<LoginResponseError.RootObject | null>(null);


  const onSubmit = async () => {
    if (!formData) {
      console.error("Form data is not available");
      return;
    }
    console.log('Submitting formData from NavigationFooter:', formData);

    // Show the email verification modal
    await AuthServices.postUserVerification({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      token: token
    })
      .then((res) => {
        if (res.data.contentCreatorProfile.approved === true) {
          navigate("/login");
          setTimeout(() => {
            toast.success(
              `Aprovado como parte de ${res.data.institution.institutionName}`,
              { hideProgressBar: true }
            );
          }, 1);
        } else {
          const id = res.data.contentCreatorProfile.baseUser;
          navigate(`/application/${id}`);
        }
      })
      .catch((err) => {
        setError(err);
        if (!err.response?.data) {
          console.log(err);
        } else {
          switch (err.response.data.error.code) {
            case "E0201": // Email already exists
              break;
            case "E0105": // Password mismatch
              break;
            default:
              console.log(error);
          }
        }
      });
  };

  return (
    <div className=''>
      <div className="flex items-center justify-between gap-4 w-full mt-8">
        <label id="cancel-button" onClick={toggleModal} className="underline hover:cursor-pointer">
          Cancelar {/* Cancel */}
        </label>
        <label>
          <button
            id="continue"
            onClick={onSubmit} // Call onSubmit when clicked
            className="py-2 px-7 bg-primary hover:bg-gray-100 border border-primary hover:text-primary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:ring-offset-2  rounded"
          >
            {!props.codeVerified ? 'Continuar' : 'Redefinir senha'} {/* Continue or reset password */}
          </button>
        </label>
      </div>
    </div>
  );
}
