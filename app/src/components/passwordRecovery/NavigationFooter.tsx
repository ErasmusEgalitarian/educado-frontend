import { useContext } from "react";
import { ToggleModalContext } from "../../pages/Login";
import { HandleContinueContext } from "../PasswordRecoveryModal";

type propsType = {
  codeVerified: boolean;
}

/**
 * The navigation footer of the password recovery modal.
 * Contains the cancel and continue buttons.
 * @param props properties of the component:
 * - `codeVerified`: boolean that indicates if the code has been verified
 * @returns 
 */
export default function NavigationFooter(props: propsType) {
  const toggleModal = useContext(ToggleModalContext);
  const handleContinue = useContext(HandleContinueContext);

  return (
    <div className=''>
          <div className="flex items-center justify-between gap-4 w-full mt-8">
            <label onClick={toggleModal} className="underline hover:cursor-point">
              Cancelar {/** Cancel */}
            </label>
            <label>
              <button id="continue" onClick={handleContinue} className="py-2 px-7 bg-primary hover:bg-gray-100 border border-primary hover:text-primary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:ring-offset-2  rounded">
                {!props.codeVerified ? 'Continuar' : 'Redefinir senha'}
              </button>
            </label>
          </div>
        </div>
  )
}