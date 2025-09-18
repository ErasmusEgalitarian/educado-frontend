import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mdiChevronLeft } from "@mdi/js";
import Icon from "@mdi/react";

import { postUserLogin } from "@common/api/auth-mutations";
import PasswordEye from "@common/components/PasswordEye";
import { useApi } from "@common/hooks/use-api";
import PasswordRecoveryModal from "@login/components/password-recovery-modal";

interface Inputs {
  email: string;
  password: string;
}

const LoginFormEmbedded = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<Inputs>();
  const { call: login, isLoading: submitLoading } = useApi(postUserLogin);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await login({
        isContentCreator: true,
        email: data.email,
        password: data.password,
      });
      if (res.status === 200) {
        const id = res.data.baseUser;
        navigate(`/application/${id}`);
      } else if (res.status === 202) {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("id", res.data.userInfo.id);
        navigate("/courses");
      }
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.error?.message || "Falha no login");
      setTimeout(() => { setErrorMessage(""); }, 4000);
    }
  };

  return (
    <div className="relative right-0 h-screen flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="relative py-8 px-10 w-full">
        <div className="self-stretch">
          <h1 className="mb-10 flex text-lg text-[#383838] font-normal font-['Montserrat'] underline">
            <button
              onClick={() =>
                { navigate({ pathname: "/welcome", search: "?view=landing" }); }
              }
            >
              <Icon path={mdiChevronLeft} size={1} color="#383838" />
            </button>
            <button
              onClick={() =>
                { navigate({ pathname: "/welcome", search: "?view=landing" }); }
              }
              className="text-lg text-[#383838] font-normal font-['Montserrat']"
            >
              {t("auth.login.actions.back")}
            </button>
          </h1>
        </div>

        <h1 className="text-[#383838] text-3xl font-bold font-['Lato'] leading-normal self-stretch mb-8">
          {t("auth.login.title")}
        </h1>

        {errorMessage && (
          <div
            className="bg-white shadow border-t-4 p-4 w-52 rounded text-center mb-4"
            role="alert"
          >
            <p className="font-bold text-lg">{t("common.error")}</p>
            <p className="text-lg">
              {errorMessage || t("auth.login.errors.generic")}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="stretch flex flex-col space-y-4"
        >
          <div>
            <label
              className="after:content-['*'] after:ml-0.5 after:text-red-500 text-[#383838] text-sm font-normal font-['Montserrat']"
              htmlFor="email-field"
            >
              {t("auth.login.email.label")}
            </label>
            <input
              type="email"
              id="email-field"
              className="w-full border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-sky-200 rounded-lg"
              placeholder={t("auth.login.email.placeholder")}
              {...register("email", { required: true })}
            />
          </div>

          <div className="relative">
            <label
              className="after:content-['*'] after:ml-0.5 after:text-red-500 text-[#383838] text-sm font-normal font-['Montserrat']"
              htmlFor="password-field"
            >
              {t("auth.login.password.label")}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password-field"
              className="w-full border-gray-300 py-3 px-4 bg-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-sky-200 rounded-lg"
              placeholder={t("auth.login.password.placeholder")}
              {...register("password", { required: true })}
            />
            <PasswordEye
              id="login-password-eye"
              passwordVisible={showPassword}
              togglePasswordVisibility={() => { setShowPassword((s) => !s); }}
            />
          </div>

          <div className="flex flex-col items-end gap-3">
            <button
              type="button"
              onClick={() => { setShowRecovery(true); }}
              className="text-[#383838] text-lg font-normal font-['Montserrat'] underline hover:text-blue-500"
            >
              {t("auth.login.forgot_password")}
            </button>
          </div>

          <button
            type="submit"
            className="disabled:opacity-20 flex-auto w-full h-[3.3rem] rounded-lg bg-[#166276] text-white transition duration-100 ease-in hover:bg-cyan-900 hover:text-gray-50 text-lg font-bold font-['Montserrat']"
            disabled={submitLoading}
          >
            {submitLoading ? (
              <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 border-t-transparent rounded-full mr-2" />
            ) : null}
            {t("auth.login.actions.submit")}
          </button>
        </form>
      </div>

      {showRecovery && (
        <PasswordRecoveryModal
          toggleModal={() => { setShowRecovery(false); }}
          setErrorMessage={(msg) => { setErrorMessage(msg); }}
        />
      )}
    </div>
  );
};

export default LoginFormEmbedded;
