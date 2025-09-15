// Hooks
import {
  InformationCircleIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";

import CourseServices from "@services/course.services";

import noCoursesImage from "../assets/no-courses.png";
import { CourseListCard } from "../components/Courses/CourseListCard";
import CourseGuideButton from "../components/Courses/GuideToCreatingCourse";

// Services

// Components
import PersonalInsights from "../components/Courses/PersonalInsights";
import Loading from "../components/general/Loading";
import Layout from "../components/Layout";

// toasts

// Images
import { getUserToken } from "../helpers/userInfo";

/**
 * @returns HTML Element
 *
 * This page displays all courses created by the user\
 * as well as some personal insights about the user.
 */
const Courses = () => {
  // States and Hooks
  const navigate = useNavigate();
  const token = getUserToken();
  // Fetch all courses

  // TODO: Implement proper backend call once backend is ready

  const CourseManager = () => {
    navigate("/courses/manager/0/0");
  };

  const [showTutorial, setShowTutorial] = useState(false);

  const handleShowTutorial = () => {
    setShowTutorial(true);
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
  };

  const { data, error } = useSWR(
    token ? [token] : null,
    CourseServices.getAllCreatorCourses,
  );

  if (error && error.response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
    return null;
  }

  if (!data)
    return (
      <Layout meta="course overview">
        <Loading />
      </Layout>
    );

  return (
    <Layout meta="Course overview">
      <div className="grid lg:grid-cols-[3fr_1fr] h-full font-personalInsights">
        {/* Left side displaying courses, filtering for these and create new button */}
        <div className="m-8 p-8 pb-0 bg-white rounded-xl overflow-hidden flex flex-col">
          {data.length ? (
            <>
              {/* Header and create course button */}
              <div className="flex flex-row no-wrap">
                <h1 className="text-3xl font-bold flex-1">
                  Confira seus cursos
                </h1>
                <div className="flex flex-row gap-5">
                  <label
                    htmlFor="course-create"
                    onClick={CourseManager}
                    className="std-button flex modal-button space-x-2 cursor-pointer"
                  >
                    <PencilSquareIcon className="w-8 h-8" />
                    <p className="font-normal ">Criar novo curso</p>{" "}
                    {/** Create new course */}
                  </label>
                  {/* Course guide button shows a tutorial*/}
                  <CourseGuideButton />
                </div>
              </div>
              {/* Card/compact view toggle and filters */}
              <div className="h-10 my-8 bg-grayLight">
                {/* TODO: Implement card/compact view toggle */}

                {/* TODO: Implement filters */}
              </div>
              <div className="overflow-y-scroll no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6 pb-4">
                  {data.map((course: any, key: number) => (
                    <CourseListCard course={course} key={key} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            // If the user has no courses, display this 'empty state'
            <div className="grid place-content-center w-full h-full text-center">
              <div className="md:mx-40 xl:mx-64">
                <img src={noCoursesImage} className="w-full" />
                <h1 className="text-xl font-bold my-4">Comece agora</h1>
                {/* You haven't created any courses yet.
              Click the button below and follow the
              step-by-step instructions to develop your first course. */}
                <p>
                  Você ainda não criou nenhum curso. Clique no botão abaixo e
                  siga o passo a passo para desenolver o seu primeiro curso.
                </p>
                {/* Create course button */}
                <label
                  htmlFor="course-create"
                  onClick={CourseManager}
                  className="std-button flex modal-button  space-x-2"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                  <p className="font-normal ">Criar novo curso</p>{" "}
                  {/** Create new course */}
                </label>
              </div>
            </div>
          )}
        </div>
        {/* Right side displaying personal insights */}
        <div className="m-8 hidden lg:block">
          <PersonalInsights courses={data} />
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
