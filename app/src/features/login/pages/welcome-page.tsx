import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import background from "@assets/background.jpg";
import NavbarSimple from "@common/layout/navbar-simple";

import Carousel from "../components/login-carousel";
import LoginFormEmbedded from "../components/login-form-embedded";
import SignupFormEmbedded from "../components/signup-form-embedded";

type ViewType = "landing" | "login" | "signup";

const WelcomePage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const initialView = useMemo(
    () => new URLSearchParams(location.search).get("view") ?? "landing",
    [location.search]
  );
  const [view, setView] = useState<ViewType>(initialView as ViewType);

  useEffect(() => {
    const v = new URLSearchParams(location.search).get("view") as
      | "landing"
      | "login"
      | "signup"
      | null;
    if (v && v !== view) setView(v);
  }, [location.search, view]);

  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    qs.set("view", view);
    navigate(
      { pathname: location.pathname, search: `?${qs.toString()}` },
      { replace: true }
    );
  }, [location.pathname, location.search, navigate, view]);

  return (
    //background for frame 2332
    <main className="self-stretch flex flex-col items-center justify-center gap-20 overflow-hidden flex-1 rounded-sm bg-gradient-to-br from-[#C9E5EC] 0% to-[#FFF] 100%">
      {/* Mini navbar */}
      <NavbarSimple />

      {/*Containers for the overall page*/}
      <div className="w-full h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-screen sm:max-w-956">
          <div className="relative w-full h-screen hidden md:block container overflow-hidden">
            <img
              src={background}
              alt="w-[42.375rem]"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Carousel />
            </div>
          </div>

          {/*Container for right side of the page*/}
          <div className="relative right-0 h-screen flex flex-col justify-center items-center px-10">
            {view === "landing" && (
              <div className="w-full flex flex-col items-center">
                <h1 className="relative text-4xl font-['Lato'] text-[#383838] text-center mb-6 mt-4 font-black px-10">
                  {t("welcome.title")}
                </h1>
                <h2 className="relative text-2xl font-['Montserrat'] text-[#A1ACB2] text-center mb-6 mt-4 px-20">
                  {t("welcome.subtitle")}
                </h2>
                {/*Container for the buttons*/}
                <div className="relative flex gap-4 px-[5rem] flex-row items-center justify-center w-full mt-10">
                  {/*Button for routing to the Login page*/}
                  <button
                    className="flex-auto w-[18rem] h-[3.3rem] items-center justify-center rounded-lg text-lg font-bold font-['Montserrat'] bg-[#166276] inline-flex text-white transition duration-100 ease-in hover:bg-cyan-900"
                    onClick={() => {
                      setView("login");
                    }}
                  >
                    {t("welcome.loginButton")}
                  </button>

                  {/*Button for routing to the Signup page*/}
                  <button
                    className="flex-auto w-[18rem] h-[3.3rem] items-center justify-center rounded-lg text-lg font-bold font-['Montserrat'] bg-[#166276] inline-flex text-white transition duration-100 ease-in hover:bg-cyan-900"
                    onClick={() => {
                      setView("signup");
                    }}
                  >
                    {t("welcome.signupButton")}
                  </button>
                </div>
              </div>
            )}
            {view === "login" && <LoginFormEmbedded />}
            {view === "signup" && <SignupFormEmbedded />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default WelcomePage;
