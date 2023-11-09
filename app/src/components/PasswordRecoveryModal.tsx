import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import * as Services from '../services/passwordRecovery.services';
import CodeVerification from "./passwordRecovery/CodeVerification";
import NewPasswordScreen from "./passwordRecovery/NewPasswordScreen";
import { ToggleModalContext } from "../pages/Login";
import NavigationFooter from "./passwordRecovery/NavigationFooter";

type propTypes = {
  setError: Dispatch<SetStateAction<any>>;
  setErrorMessage: (message: string) => void;
}

export const HandleContinueContext = createContext<() => void>(() => { });

/**
 * Modal that allows the user to reset their password.
 * @param {propTypes} props properties of the component:
 * - `setError`: function that sets the error message
 * - `setErrorMessage`: function that sets the error message
 * @returns {JSX.Element} the modal component
 */
const PasswordRecoveryModal = (props: propTypes) => {

  // States that control the flow of the modal
  const [emailSent, setEmailSent] = useState(false);
  const [codeEntered, setCodeEntered] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);

  // User input
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // Password validation
  const [passwordContainsLetter, setPasswordContainsLetter] = useState(false);
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);

  // Error messages
  const [emailError, setEmailError] = useState('');
  const [codeError, setCodeError] = useState('');  
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

  const toggleModal = useContext(ToggleModalContext);

  /**
   * Handles the continue button click. If the email has not been sent yet, validates the email and sends it.
   * If the code has not been verified yet, validates the code and verifies it.
   * If the code has been verified, validates the passwords and updates the password.
   */
  function handleContinue() {
    if (!emailSent && validateEmail(email)) {
      sendEmail(email);
      return;
    }
    if (codeEntered && !codeVerified) {
      verifyCode(email, code);
      return;
    }
    if (codeVerified) {
      if (validatePasswords()) {
        updatePassword();
      }
      return;
    }
  }

  /**
   * Updates the user's password. If an unexpected error occurs, sets error to the appropriate error message.
   */
  async function updatePassword() {
    Services.updatePassword(email, password, code)
      .then(() => {
        props.setError('Sucesso')
        props.setErrorMessage('Senha alterada com sucesso!') // Password changed successfully!
        setTimeout(() => {
          props.setError('');
          props.setErrorMessage('');
        }, 5000);
        toggleModal();
      })
      .catch((error) => {
        switch (error?.error?.code) {
          default:
            props.setError('Erro inesperado')
            props.setErrorMessage('Erro inesperado: Tente novamente mais tarde.') // Unexpected error, try again later
            setTimeout(() => {
              props.setError('');
              props.setErrorMessage('');
            }, 5000);
        }
      });
  }


  /**
   * Sends an email to the user with a verification code to reset the password. 
   * If the email is not registered, sets emailError to the appropriate error message. 
   * If an unexpected error occurs, sets error to the appropriate error message.
   * @param email the user's email
   */
  async function sendEmail(email: string) {
    Services.sendEmail(email)
      .then(() => {
        setEmailSent(true);
      })
      .catch((error) => {
        switch (error.error?.code) {
          case 'E0401':
            setEmailError('Email não cadastrado');
            break;
          case 'E0406':
            props.setError('Erro')
            props.setErrorMessage('Muitas tentativas de reenvio! Espere 5 minutos...')
            break;
          default:
            props.setError('Erro inesperado')
            props.setErrorMessage('Erro inesperado: Tente novamente mais tarde.') // Unexpected error, try again later
            setTimeout(() => {
              props.setError('');
              props.setErrorMessage('');
            }, 5000);
        }
      });
  }

  /**
   * Verifies the code entered by the user. If the code is valid, sets codeVerified to true. 
   * If the code is invalid, sets codeError to the appropriate error message.
   * @param email the user's email
   * @param code the verification code used to reset the password
   */
  async function verifyCode(email: string, code: string) {
    Services.verifyCode(email, code)
      .then(() => {
        setCodeVerified(true);
      })
      .catch((error) => {
        console.log(error.error?.code);
        switch (error?.error?.code) {
          case 'E0404':
            setCodeError('Código expirado');
            break;
          case 'E0405':
            setCodeError('Código inválido');
            break;
          default:
            props.setError('Erro inesperado')
            props.setErrorMessage('Erro inesperado: Tente novamente mais tarde.') // Unexpected error, try again later
            setTimeout(() => {
              props.setError('');
              props.setErrorMessage('');
            }, 5000);
        }
      })

  }

  /**
   * Checks if the email is valid. If it is not, sets emailError to the appropriate error message.
   * @param email the email to be validated
   * @returns true if the email is valid, false otherwise
   */
  function validateEmail(email: string) {
    if (email.length > 0) {
      if (!(/^[a-z0-9!'#$%&*+\/=?^_`{|}~-]+(?:\.[a-z0-9!'#$%&*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-zA-Z]{2,}$/i).test(email)) {
        setEmailError('Email inválido');
        return false;
      }

      setEmailError('');
      return true;
    }
    setEmailError('Email requerido');
    return false;
  }

  /**
   * Validates the passwords. If a password contains no letter, is shorter than 
   * 8 characters or the password and password confirmation do not match, sets 
   * the appropriate error message.
   * @returns true if the passwords are valid, false otherwise
   */
  function validatePasswords() {
    if (!passwordContainsLetter) {
      setPasswordError('A senha precisa conter pelo menos uma letra')
      return false;
    }
    if (!passwordLengthValid) {
      setPasswordError('A senha precisa ter no mínimo 8 caracteres');
      return false;
    }
    if (password !== passwordConfirmation) {
      setPasswordConfirmationError('Os campos de senha precisam ser iguais');
      return false;
    }
    return true;
  }


  useEffect(() => { // Resets errors upon changes
    setEmailError('');
    setCodeError('');
  }, [email, code]);

  return (
    <div className='absolute grid place-items-center bg-darkBG inset-0'>
      <HandleContinueContext.Provider value={handleContinue}>
        <div className="modal-box bg-gradient-to-b p-10 from-primaryLight rounded-xl w-11/12 xl:max-w-[35%] lg:max-w-[40%] md:max-w-[50%] sm:max-w-[60%] max-w-[80%] max-h-[70%] lg:max-h-[55%]">
          <h3 className="font-bold text-xl mb-4">Redefinção de senha</h3> {/** Password reset */}

          {!codeVerified ?
            <CodeVerification
              email={email}
              setEmail={setEmail}
              setCode={setCode}
              codeError={codeError}
              emailError={emailError}
              emailSent={emailSent}
              setCodeEntered={setCodeEntered}
            /> :
            <NewPasswordScreen
              password={password}
              setPassword={setPassword}
              passwordError={passwordError}
              passwordConfirmation={passwordConfirmation}
              setPasswordConfirmation={setPasswordConfirmation}
              passwordConfirmationError={passwordConfirmationError}
              passwordContainsLetter={passwordContainsLetter}
              passwordLengthValid={passwordLengthValid}
              setPasswordContainsLetter={setPasswordContainsLetter}
              setPasswordLengthValid={setPasswordLengthValid}
            />
          }
          <NavigationFooter codeVerified={true} />
        </div>
      </HandleContinueContext.Provider>
    </div>
  )
}

export default PasswordRecoveryModal;