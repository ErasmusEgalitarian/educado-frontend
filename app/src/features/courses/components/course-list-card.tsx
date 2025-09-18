// interfaces
import { mdiPencil, mdiAccount } from "@mdi/js";
import { Icon } from "@mdi/react";
import { useEffect, useState } from "react";

import imageNotFoundImage from "@assets/image-not-found.png";
import StorageServices from "@common/api/storage.services";
import { Course } from "@courses/types/Course";
import categories from "../utilities/course-categories";
import statuses from "../utilities/course-statuses";
import { LastEdited } from "./last-edited";
import StarRating from "@common/components/StarRating";
import { getAverageRatingOfCourse } from "@courses/api/course-queries";

const CourseListCardLoading = () => {
  return (
    <div className="overflow-hidden shadow-lg rounded h-90 w-full cursor-pointer m-auto">
      <div className="bg-gray-200 h-48  rounded-t-xl p-3 overflow-hidden animate-pulse" />
      <div className="bg-white w-full p-4 space-y-2">
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />

        <div className="flex items-center mt-4">
          <span className="block relative">
            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
          </span>
          <div className="flex flex-col justify-between ml-4 text-sm space-y-2">
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Displays a course in a card format
 *
 * @param {Course} course The course to be displayed
 * @returns HTML Element
 */
export const CourseListCard = ({ course }: { course: Course }) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const maxTitleLength = 20;
  //Only load the picture, when the picture is loaded
  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (course.coverImg == "" || course.coverImg == undefined) {
          throw new Error("coverImg is empty or undefined");
        }
        const fileSrc = await StorageServices.getMedia(course.coverImg);

        setImageSrc(fileSrc);
      } catch (error) {
        setImageSrc(imageNotFoundImage);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchRating = async () => {
      try {
        const rating = await getAverageRatingOfCourse(course._id);
        console.log("card" + rating);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRating();
    fetchImage();
  }, [course.coverImg, course.title]);
  return (
    <div className="overflow-hidden shadow rounded h-full w-full cursor-pointer m-auto hover:shadow-lg duration-200">
      <label
        onClick={() =>
          (window.location.href = `/courses/manager/${course._id}/0`)
        }
        className="w-full block h-full relative group"
      >
        {/* Hover overlay */}
        <div className="absolute inset-0 grid place-content-center">
          {/* Edit button */}
          <div className="z-10 bg-primary opacity-0 rounded-full p-8 group-hover:animate-slidePopIn duration-200 group-hover:opacity-100">
            <Icon path={mdiPencil} className="w-12 text-white" />
          </div>
          <div className="z-0 absolute inset-0 bg-white opacity-0 group-hover:opacity-30 duration-200" />
        </div>

        {/* Card image */}
        {isLoading ? (
          <div className="h-40 w-full bg-gray-200 animate-pulse" />
        ) : (
          <img
            src={imageSrc}
            className="h-40 w-full object-cover bg-white border-b"
          />
        )}

        {/* Card content */}
        <div className="bg-white w-full">
          <div className="p-4">
            {/* Card title */}
            <h2 className="text-gray-800 text-xl font-medium mb-2">
              {course.title.slice(0, maxTitleLength) +
                (course.title.length > maxTitleLength ? "..." : "")}
            </h2>

            <div className="flex flex-row justify-between">
              {/* Course rating */}
              <div className="w-[8rem]">
                <StarRating rating={course.rating ? course.rating : 0} />
              </div>
              {/* Subsriber count */}
              <div className="flex flex-row">
                <Icon
                  path={mdiAccount}
                  className="w-5 mr-1 inline-block mr-1"
                />
                <p className="text-grayMedium">{course.numOfSubscriptions}</p>
              </div>
            </div>

            {/* Card info */}
            <div className="h-20 flex flex-col justify-between">
              {/* Course category */}
              <div className="flex flex-row">
                <Icon
                  path={
                    course.category
                      ? categories[course.category]?.icon
                      : categories.default.icon
                  }
                  className="w-4 mr-1"
                />
                <p>{categories[course.category]?.br ?? course.category}</p>
              </div>

              <div className="flex flex-row justify-between">
                {/* Course last modified */}
                <div>
                  <LastEdited course={course} />
                </div>

                {/* Course status */}
                <div className="flex flex-row">
                  <div
                    className={
                      "w-3 h-3 mx-2 rounded-full m-auto " +
                      (course.status
                        ? statuses[course.status].color
                        : statuses.default.color)
                    }
                  />
                  <p className="italic">
                    {course.status
                      ? statuses[course.status].br
                      : statuses.default.br}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};
