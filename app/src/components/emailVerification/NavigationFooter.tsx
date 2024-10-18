import { useContext, useState } from "react";
import { FormDataContext } from "../../pages/Signup"; // Import the context
import AuthServices from '../../services/auth.services';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { LoginResponseError } from "../../interfaces/LoginResponseError";
import { ToggleModalContext } from "../../pages/Signup";
import { setUserInfo } from '../../helpers/userInfo';
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

  const resendEmail = async () => {
    if (!formData) {
      console.error("Form data is not available");
      return;
    }
    console.log('Submitting formData from NavigationFooter:', formData);

    // Show the email verification modal
    await AuthServices.postUserSignup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      token: token
    })
  };

  /**
  * OnSubmit function for Login.
  * Takes the submitted data from the form and sends it to the backend through a service.
  * Upon receiving a success response, the token recieved from the backend will be set in the local storage.
  *
  * @param {JSON} data Which includes the following fields:
  * @param {String} data.email Email of the Content Creator
  * @param {String} data.password Password of the Content Creator (Will be encrypted)
  */  

  const onSubmit1 = async () => {
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
      .then(() => {
        AuthServices.postUserLogin({
          isContentCreator: true,
          email: formData.email,
          password: formData.password,})
          .then((res) => {
              if(res.status == 200){
              const id = res.data.baseUser;
              navigate(`/application/${id}`);         
              }
              if(res.status == 202){
                localStorage.setItem("token", res.data.accessToken);
                localStorage.setItem("id", res.data.userInfo.id);
                setUserInfo(res.data.userInfo);
                navigate("/courses");
              }
             
          // error messages for email and password  
          })
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
      <label>
        <button
          id="continue"
          onClick={onSubmit1} // Call onSubmit when clicked
          className="py-2 px-7 mt-8 bg-primary hover:bg-gray-100 border border-primary hover:text-primary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:ring-offset-2  rounded"
        >
          {!props.codeVerified ? 'Continuar' : 'Redefinir senha'} {/* Continue or reset password */}
        </button>
      </label>
  
      <label className="flex justify-center w-full mt-4">
  <div className="flex items-center gap-2">
    <p>O código não chegou?</p>
    <button
      id="resend-email"
      onClick={resendEmail} // Call onSubmit when clicked
      className="underline hover:cursor-pointer"
    >
      Reenviar código
    </button>
  </div>
</label>

    </div>
  );
}


/*<label id="cancel-button" onClick={toggleModal} className="underline hover:cursor-pointer">
          Cancelar
        </label> */
