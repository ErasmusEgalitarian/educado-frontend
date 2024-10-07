import PinField from "react-pin-field";
import TextInput from "../general/TextInput";

type propsType = {
  codeError: string;
  setCode: (code: string) => void;
  setCodeEntered: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Screen that allows the user to verify their email and insert the code sent to it.
 * @param {propsType} props properties of the component:
 * - `email`: the email hook
 * - `setEmail`: the function that sets the email hook
 * - `emailError`: the email error hook
 * - `emailSent`: boolean that indicates if the email has been sent
 * - `codeError`: the code error hook
 * - `setCode`: the function that sets the code hook
 * - `setCodeEntered`: the function that sets the code entered hook
 * @returns {JSX.Element} the screen component
 */
export default function CodeVerification(props: propsType) : JSX.Element {
  return (
    <div className="flex h-full flex-col justify-between space-y-4">   
            <div>
              <PinField
                id="pin-field"
                length={4}
                className="flex-4 flex-row mx-3 w-10 rounded-md text-center pin-field"
                validate='0123456789'
                inputMode="numeric"
                onChange={props.setCode}
                onComplete={() => {
                  props.setCodeEntered(true);
                }}
              />
              <p id="pin-error" className="text-warning h-5">{props.codeError}</p>
            </div>     

          </div>
      
  )
}