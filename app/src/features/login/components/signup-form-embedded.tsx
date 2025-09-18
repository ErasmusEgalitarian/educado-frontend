import { mdiChevronLeft } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { postUserSignup } from "@common/api/auth-mutations";
import { useApi } from "@common/hooks/use-api";
import { CreateUserPayload } from "@login/types/login-types";

interface SignupInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupFormEmbedded = () => {
  const { register, handleSubmit, watch } = useForm<SignupInputs>();
  const { call: signup, isLoading: submitLoading } = useApi(postUserSignup);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = async (data: SignupInputs) => {
    try {
      const payload: CreateUserPayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: "user",
        token: null,
      };
      const res = await signup(payload);
      if (
        res.status === 200 ||
        res.data?.message?.includes("Verification email")
      ) {
        // noop: parent can show modal if needed
      }
    } catch (err: unknown) {
      setErrorMessage(
        err?.response?.data?.error?.message ?? t("auth.signup.errors.generic")
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };

  const password = watch("password");

  return (
    <div className="relative right-0 h-screen flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="relative py-8 px-10 w-full">
        <div className="self-stretch">
          <h1 className="mb-4 flex text-lg text-[#383838] font-normal font-['Montserrat'] underline">
            <button
              onClick={() => {
                navigate({ pathname: "/welcome", search: "?view=landing" });
              }}
            >
              <Icon path={mdiChevronLeft} size={1} color="#383838" />
            </button>
            <button
              onClick={() => {
                navigate({ pathname: "/welcome", search: "?view=landing" });
              }}
              className="text-lg text-[#383838] font-normal font-['Montserrat']"
            >
              {t("auth.signup.actions.back")}
            </button>
          </h1>
        </div>

        <h1 className="text-[#383838] text-3xl font-bold font-['Lato'] leading-normal self-stretch mb-8">
          {t("auth.signup.title")}
        </h1>

        {Boolean(errorMessage) && (
          <div
            className="bg-white shadow border-t-4 p-4 w-52 rounded text-center mb-4"
            role="alert"
          >
            <p className="font-bold text-lg">{t("common.error")}</p>
            <p className="text-lg">
              {Boolean(errorMessage) || t("auth.signup.errors.generic")}
            </p>
          </div>
        )}

        <form
          onSubmit={() => handleSubmit(onSubmit)}
          className="stretch flex flex-col space-y-4"
          noValidate
        >
          <div className="flex gap-4">
            <input
              {...register("firstName", { required: true })}
              type="text"
              placeholder={t("auth.signup.firstName.placeholder")}
              aria-label={t("auth.signup.firstName.label")}
              className="w-1/2 border-gray-300 py-3 px-4 bg-white text-lg rounded-lg"
            />
            <input
              {...register("lastName", { required: true })}
              type="text"
              placeholder={t("auth.signup.lastName.placeholder")}
              aria-label={t("auth.signup.lastName.label")}
              className="w-1/2 border-gray-300 py-3 px-4 bg-white text-lg rounded-lg"
            />
          </div>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder={t("auth.signup.email.placeholder")}
            aria-label={t("auth.signup.email.label")}
            className="w-full border-gray-300 py-3 px-4 bg-white text-lg rounded-lg"
          />
          <input
            {...register("password", { required: true, minLength: 8 })}
            type="password"
            placeholder={t("auth.signup.password.placeholder")}
            aria-label={t("auth.signup.password.label")}
            className="w-full border-gray-300 py-3 px-4 bg-white text-lg rounded-lg"
          />
          <input
            {...register("confirmPassword", {
              required: true,
              validate: (v) => v === password,
            })}
            type="password"
            placeholder={t("auth.signup.confirmPassword.placeholder")}
            aria-label={t("auth.signup.confirmPassword.label")}
            className="w-full border-gray-300 py-3 px-4 bg-white text-lg rounded-lg"
          />

          <button
            type="submit"
            className="disabled:opacity-20 flex-auto w-full h-[3.3rem] rounded-lg bg-[#166276] text-white transition duration-100 ease-in hover:bg-cyan-900 hover:text-gray-50 text-lg font-['Montserrat']"
            disabled={submitLoading}
          >
            {t("auth.signup.actions.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupFormEmbedded;
