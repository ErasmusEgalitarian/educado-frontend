import { createContext, useEffect, useState } from "react";
import * as Services from '../../services/emailVerification.services';
import CodeVerification from "./CodeVerification";
import NavigationFooter from "./NavigationFooter";
import { validateEmail } from "../../utilities/validation";

type propTypes = {
  toggleModal: () => void;
  setErrorMessage: (message: string, error?: string) => void;
}

export const HandleContinueContext = createContext<() => void>(() => { });

/**
 * Modal that allows the user to reset their password.
 * @param {propTypes} props properties of the component:
 * - `setError`: function that sets the error message
 * - `setErrorMessage`: function that sets the error message
 * @returns {JSX.Element} the modal component
 */
const EmailVerificationModal = (props: propTypes) : JSX.Element => {

  // States that control the flow of the modal
  const [emailSent, setEmailSent] = useState(false);
  const [codeEntered, setCodeEntered] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);

  // User input
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');


  // Error messages
  const [emailError, setEmailError] = useState('');
  const [codeError, setCodeError] = useState('');  

  /**
   * Handles the continue button click. If the email has not been sent yet, validates the email and sends it.
   * If the code has not been verified yet, validates the code and verifies it.
   * If the code has been verified, validates the passwords and updates the password.
   */

  /**
   * Sends an email to the user with a verification code to reset the password. 
   * If the email is not registered, sets emailError to the appropriate error message. 
   * If an unexpected error occurs, sets error to the appropriate error message.
   * @param email the user's email
   */


  /**
   * Verifies the code entered by the user. If the code is valid, sets codeVerified to true. 
   * If the code is invalid, sets codeError to the appropriate error message.
   * @param email the user's email
   * @param code the verification code used to reset the password
   */
  

  useEffect(() => { // Resets errors upon changes
    setCodeError('');
  }, [email, code]);

  return (
    <div id="password-reset-modal" className='absolute grid place-items-center bg-darkBG inset-0'>
        <div className="bg-gradient-to-b p-10 rounded-xl w-11/12 xl:max-w-[35%] overflow-scroll lg:max-w-[40%] md:max-w-[50%] sm:max-w-[60%] max-w-[80%] max-h-[100%]">
          <h3 className="font-bold text-xl mb-4">Verificar e-mail</h3> {/** Reset password */}

          {!codeVerified ?
            <CodeVerification
              setCode={setCode}
              codeError={codeError}
              setCodeEntered={setCodeEntered}
            /> : null}
          <NavigationFooter codeVerified={codeVerified} token={code} />
        </div>
    </div>
  )
}

export default EmailVerificationModal;