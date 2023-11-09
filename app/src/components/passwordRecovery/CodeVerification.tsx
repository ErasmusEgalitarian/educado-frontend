import PinField from "react-pin-field";
import TextInput from "../general/TextInput";

type propsType = {
  email: string;
  setEmail: (email: string) => void;
  emailError: string;
  emailSent: boolean;
  codeError: string;
  setCode: (code: string) => void;
  setCodeEntered: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 
 * @param {propsType} props properties of the component:
 * - `email`: the email hook
 * - `setEmail`: the function that sets the email hook
 * - `emailError`: the email error hook
 * - `emailSent`: boolean that indicates if the email has been sent
 * - `codeError`: the code error hook
 * - `setCode`: the function that sets the code hook
 * - `setCodeEntered`: the function that sets the code entered hook
 * @returns 
 */
export default function CodeVerification(props: propsType) {
  return (
    <div className="flex h-full flex-col justify-between space-y-4">
      <div className="-mb-1">
        <TextInput id='email-field' className='' placeholder="Insira sua Email" label="Email" value={props.email} onChange={props.setEmail} />
        <p className="text-warning h-5">{props.emailError}</p>
      </div>
      {props.emailSent &&
        <div className="flex-row w-full justify-items-center">
          <p className="py-4">Enviamos para o seu email um código de redefinição de senha. Insira o código abaixo.</p> {/** We sent a code to your email to reset your password, please insert it below */}
          <div className="grid grid-cols-1 gap-2 place-items-center">
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
              <p className="text-warning h-5">{props.codeError}</p>
            </div>

          </div>
        </div>}
    </div>

  )
}