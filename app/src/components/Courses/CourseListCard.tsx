// interfaces
import { Course } from "../../interfaces/Course"

// Components
import { Link } from "react-router-dom";
import StarRating from "../general/StarRating";
import Icon from '@mdi/react';
import { mdiPencil, mdiAccount } from '@mdi/js';
import { LastEdited } from "./LastEdited";

// Helpers
import categories from "../../helpers/courseCategories";
import statuses from "../../helpers/courseStatuses";

// Images
import imageNotFoundImage from '../../assets/image-not-found.png'

/**
 * Displays a course in a card format
 * 
 * @param {Course} course The course to be displayed
 * @returns HTML Element
 */
export const CourseListCard = ({ course }: { course: Course }) => {
  const maxTitleLength = 20;

  return (
    <div className="overflow-hidden shadow rounded h-full w-full cursor-pointer m-auto hover:shadow-lg duration-200">
      <Link
        to={`/courses/edit/${course._id}`}
        className="w-full block h-full relative group"
      >

        {/* Hover overlay */}
        <div className='absolute inset-0 grid place-content-center'>
          {/* Edit button */}
          <div className='z-10 bg-primary opacity-0 rounded-full p-8 group-hover:animate-slidePopIn duration-200 group-hover:opacity-100'>
            <Icon path={mdiPencil} className='w-12 text-white' />
          </div>
          <div className='z-0 absolute inset-0 bg-white opacity-0 group-hover:opacity-30 duration-200' />
        </div>

        {/* Card image */}
        <img
          src={course.coverImg ?? imageNotFoundImage}
          alt="Course cover image"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = imageNotFoundImage;
          }}
          className="h-40 w-full object-cover bg-white border-b"
        />

        {/* Card content */}
        <div className="bg-white w-full">
          <div className='p-4'>
            {/* Card title */}
            <h2 className="text-gray-800 text-xl font-medium mb-2">
              {course.title.slice(0, maxTitleLength) + (course.title.length > maxTitleLength ? '...' : '')}
            </h2>

            <div className="flex flex-row justify-between">
              {/* Course rating */}
              <div className='w-[8rem]'>
                <StarRating rating={course.rating} />
              </div>
              {/* Subsriber count */}
              <div className='flex flex-row'>
                <Icon path={mdiAccount} className='w-5 mr-1 inline-block mr-1' />
                <p className='text-grayMedium'>{course.numOfSubscriptions}</p>
              </div>
            </div>

            {/* Card info */}
            <div className='h-20 flex flex-col justify-between'>
              {/* Course category */}
              <div className='flex flex-row'>
                <Icon
                  path={categories[course.category]?.icon ?? categories.default.icon}
                  className='w-4 mr-1'
                />
                <p>{categories[course.category]?.br ?? course.category}</p>
              </div>

              <div className='flex flex-row justify-between'>
                {/* Course last modified */}
                <div>
                  <LastEdited course={course} />
                </div>

                {/* Course status */}
                <div className='flex flex-row'>
                  <div className={'w-3 h-3 mx-2 rounded-full m-auto '+(statuses[course.status].color ?? statuses.default.color)} />
                  <p className='italic'>
                    {statuses[course.status].br ?? statuses.default.br}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}