//import yup
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//import Hooks
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

//import services
import ProfileServices from "../services/profile.services";

//import icons
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";

//import components
import Layout from "../components/Layout";

//import profileForms child components
import PersonalInformationForm from "../components/ProfileForms/PersonalInformation";
import AcademicExperienceForm from "../components/ProfileForms/AcademicExperience";
import ProfessionalExperienceForm from "../components/ProfileForms/ProfessionalExperience";

//import utilities
import dynamicForms from "../utilities/dynamicForms";
import staticForm from "../utilities/staticForm";

//import helpers
import { tempObjects } from "../helpers/formStates";

//Yup Schema
const profileSchema = Yup.object().shape({
  UserName: Yup.string(),
  UserEmail: Yup.string().email("You need a suitable email to submit"),
  linkedin: Yup.lazy((value) => {
    if (value) {
      return Yup.string().matches(
        /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
        "Invalid LinkedIn URL"
      );
    }
    return Yup.string();
  }),
});

const Profile = () => {
  const {
    handleFileChange,
    handleCharCountBio,
    formData,
    handleInputChange,
    fetchuser,
    fetchStaticData,
  } = staticForm();
  const { emptyAcademicObject, emptyProfessionalObject } = tempObjects();
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    dynamicInputsFilled,
    userID,
    educationErrorState,
    experienceErrorState,
    experienceErrors,
    educationErrors,
    handleExperienceInputChange,
    handleCountExperience,
    handleExperienceDelete,
    addNewExperienceForm,
    handleEducationDelete,
    addNewEducationForm,
    SubmitValidation,
    submitError,
    handleEducationInputChange,
    experienceformData,
    educationformData,
    fetchDynamicData,
    handleCheckboxChange,
  } = dynamicForms();

  //Image click
  const myRef = useRef<HTMLInputElement>(null);
  const imageClick = () => {
    myRef.current?.click();
  };

  //useform setup for yup for static form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(profileSchema),
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);
  //Form submit, sends data to backend, upon user interaction
  const handleUpdateSubmit = async (index: any, data: any) => {
    //if fields are filled & errors do not occour submit form
    if (hasSubmitted) {
      return;
    }
    setIsDisabled(true);
    console.log("triggered top comment");

    if (
      !educationErrorState &&
      !experienceErrorState &&
      dynamicInputsFilled("education") &&
      dynamicInputsFilled("experience")
    ) {
      //Fields of personalinformation will be updated using - through a put request
      const formDataToSend = {
        userID: userID,
        userName: formData.UserName,
        userBio: formData.bio,
        userLinkedInLink: formData.linkedin,
        userEmail: formData.UserEmail,
        userPhoto: formData.photo,
      };

      try {
        console.log("triggered");

        const response = await ProfileServices.putFormOne(formDataToSend);
        if (response.status === 200) {
        }
        //Fields of academic experience will be looped through and updated using the relevant endpoints
        await Promise.all(
          educationformData.map(async (item, index) => {
            const data = {
              ...item,
              userID: userID,
            };

            await ProfileServices.putFormTwo(data);
            if (item._id) {
              await ProfileServices.deleteEducationForm(item._id);
            }
          })
        );

        //Fields of professional experience will be looped through and updated using the relevant endpoints
        await Promise.all(
          experienceformData.map(async (item, index) => {
            const data = {
              ...item,
              userID: userID,
            };

            await ProfileServices.putFormThree(data);

            if (item._id) {
              await ProfileServices.deleteExperienceForm(item._id);
            }
          })
        );
        if (userID) {
          fetchDynamicData();
          fetchStaticData();
        }
      } catch (error) {
      } finally {
        setIsDisabled(false);
        setHasSubmitted(true);
      }
    }
  };

  useEffect(() => {
    setHasSubmitted(false);
  }, [educationformData, experienceformData, formData]);

  //Drop down menues && lists
  const [toggleMenu1, setToggleMenu1] = useState(false);
  const [toggleMenu2, setToggleMenu2] = useState(false);
  const [toggleMenu3, setToggleMenu3] = useState(false);

  //render and fetch signup userdetails
  useEffect(() => {
    fetchuser();
  }, []);

  //render and fetch userData
  useEffect(() => {
    if (userID) {
      fetchDynamicData();
      fetchStaticData();
    }
  }, [userID]);

  return (
    <Layout meta="Profile">
      <main className="flex-grow overflow-x-hidden bg-[#E4F2F5] h-screen">
        <form
          onSubmit={handleSubmit(handleUpdateSubmit)}
          className="text-center relative py-8 px-10 w-full"
        >
          <div className="inline-block ">
            <div className="text-left mt-16 mb-20 text-neutral-700 text-[32px] font-bold font-['Montserrat']">
              Editar perfil
            </div>
            {/* Menu-1-personal-information drop down*/}
            <>
              <div className="Menu-1-personal-information">
                <button
                  type="button"
                  className={`second_form_open w-[1000px] h-[72px] p-6 shadow-xl flex-col justify-start items-start gap-20 inline-flex font-bold font-montserrat pl-6 relative ${
                    toggleMenu1
                      ? "rounded-tl-lg rounded-tr-lg bg-[#166276] text-[#FFFFFF]"
                      : "rounded-lg bg-white text-neutral-700 text-[#383838]"
                  }`}
                  onClick={() => setToggleMenu1(!toggleMenu1)}
                >
                  <div className="flex items-start">
                    {toggleMenu1 ? (
                      <Icon path={mdiChevronUp} size={1} color="#FFFFFF" />
                    ) : (
                      <Icon path={mdiChevronDown} size={1} color="#383838" />
                    )}
                    Informações pessoais
                  </div>
                </button>
              </div>

              {/* Personal infomration form */}
              <PersonalInformationForm
                formData={formData}
                errors={errors}
                handleCharCountBio={handleCharCountBio}
                toggleMenu1={toggleMenu1}
                imageClick={imageClick}
                handleFileChange={handleFileChange}
                myRef={myRef}
                register={register}
                handleInputChange={handleInputChange}
              />
            </>
            {/* Menu for academic experience */}
            <>
              <div className="Menu-2-academic-experience ">
                <button
                  type="button"
                  className={`second_form_open w-[1000px] h-[72px] p-6 shadow-xl flex-col justify-start items-start gap-20 inline-flex font-bold font-montserrat pl-6 relative ${
                    toggleMenu2
                      ? "rounded-tl-lg rounded-tr-lg bg-[#166276] text-[#FFFFFF]"
                      : "rounded-lg bg-white text-neutral-700 text-[#383838]"
                  }`}
                  onClick={() => setToggleMenu2(!toggleMenu2)}
                >
                  <div className="flex items-start">
                    {toggleMenu2 ? (
                      <Icon path={mdiChevronUp} size={1} color="#FFFFFF" />
                    ) : (
                      <Icon path={mdiChevronDown} size={1} color="#383838" />
                    )}
                    Experiências acadêmicas
                  </div>
                </button>
              </div>

              {/* Academic experience form */}
              {/* Conditional rendering empty form when database is empty */}
              {toggleMenu2 ? (
                educationformData.length === 0 ? (
                  <AcademicExperienceForm
                    key={0}
                    index={0}
                    educationformData={emptyAcademicObject}
                    handleEducationInputChange={handleEducationInputChange}
                    educationErrors={educationErrors}
                    addNewEducationForm={addNewEducationForm}
                    handleEducationDelete={handleEducationDelete}
                  />
                ) : (
                  educationformData.map((form, index) => (
                    // Retrieve child compononent
                    <AcademicExperienceForm
                      key={index}
                      index={index}
                      educationformData={educationformData}
                      handleEducationInputChange={handleEducationInputChange}
                      educationErrors={educationErrors}
                      addNewEducationForm={addNewEducationForm}
                      handleEducationDelete={handleEducationDelete}
                    />
                  ))
                )
              ) : (
                <></>
              )}

              <div className="hidden sm:block" aria-hidden="true">
                <div className="py-3"></div>
              </div>
            </>
            {/* Menu for professional experience */}
            <>
              <div className="Menu-3-professional-experience ">
                <button
                  type="button"
                  className={`third_form_open w-[1000px] h-[72px] p-6 shadow-xl flex-col justify-start items-start gap-20 inline-flex font-bold font-montserrat pl-6 relative ${
                    toggleMenu3
                      ? "rounded-tl-lg rounded-tr-lg bg-[#166276] text-[#FFFFFF]"
                      : "rounded-lg bg-white text-neutral-700 text-[#383838]"
                  }`}
                  onClick={() => setToggleMenu3(!toggleMenu3)}
                >
                  <div className="flex items-start">
                    {toggleMenu3 ? (
                      <Icon path={mdiChevronUp} size={1} color="#FFFFFF" />
                    ) : (
                      <Icon path={mdiChevronDown} size={1} color="#383838" />
                    )}
                    Experiências profisisonais
                  </div>
                </button>
              </div>

              {/* Professional experience form */}
              {/* Conditional rendering empty form when database is empty */}
              {toggleMenu3 ? (
                experienceformData.length === 0 ? (
                  <ProfessionalExperienceForm
                    key={0}
                    index={0}
                    experienceformData={emptyProfessionalObject}
                    handleExperienceInputChange={handleExperienceInputChange}
                    experienceErrors={experienceErrors}
                    addNewExperienceForm={addNewExperienceForm}
                    handleExperienceDelete={handleExperienceDelete}
                    handleCountExperience={handleCountExperience}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                ) : (
                  experienceformData.map((form, index) => (
                    <ProfessionalExperienceForm
                      key={index}
                      index={index}
                      experienceformData={experienceformData}
                      handleExperienceInputChange={handleExperienceInputChange}
                      experienceErrors={experienceErrors}
                      addNewExperienceForm={addNewExperienceForm}
                      handleExperienceDelete={handleExperienceDelete}
                      handleCountExperience={handleCountExperience}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  ))
                )
              ) : (
                <></>
              )}
            </>
            <div>
              {submitError && (
                <span className=" ml-28 ">
                  Alguns campos não estão preenchidos
                </span>
              )}
            </div>

            {/* Page buttons */}
            <div className="w-[1000px] h-[52px] justify-between items-center inline-flex gap-4 mt-16">
              <button
                type="button"
                className="text-center text-red-500 text-base font-bold font-['Montserrat'] underline"
              >
                Deletar conta
              </button>
              <div className="flex-grow text-right ml-auto">
                <button
                  type="button"
                  className=" text-cyan-800 font-bold font-['Montserrat'] underline"
                >
                  Cancelar edições
                </button>
              </div>
              <div className="px-10 py-4 bg-cyan-800 rounded-lg justify-center items-start gap-2.5 flex">
                <button
                  disabled={isDisabled}
                  onClick={SubmitValidation}
                  type="submit"
                  className="text-center text-white text-base font-bold font-['Montserrat'] text-right"
                >
                  Salvar edições
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default Profile;
