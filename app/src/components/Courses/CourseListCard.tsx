import { Link } from "react-router-dom";

// interfaces
import { Course } from "../../interfaces/Course"

export const CourseListCard = ({ course }: { course: Course }) => {
  return (
    <div className="overflow-hidden shadow rounded h-90 w-full cursor-pointer m-auto">
      <Link to={`/courses/edit/${course.id}`} className="w-full block h-full">
        {course.coverImg == "" ?
          <div className='h-40 max-h-40 w-full oceanic-gradient'></div> :
          <img src={course.coverImg} alt="blog photo" className=" h-40 max-h-40 w-full object-cover bg-white border-b" />
        }
        <div className="bg-white w-full">
          <div className='p-4'>
            <h3 className="text-blue-500 text-md font-medium">{course.category ? <>{course.category.name}</> : <>Course</>}</h3>

            {course.title.length > 25 ?
              <h2 className="text-gray-800 text-xl font-medium mb-2">{course.title.slice(0, 25)}</h2> :
              <h2 className="text-gray-800 text-xl font-medium mb-2">{course.title}</h2>
            }

            <div className='h-14 overflow-hidden'>
              {course.description.length != 0 ?
                <p className="text-gray-400 font-light text-md">
                  {course.description.length > 80 ?
                    course.description.slice(0, 80) + "..." :
                    course.description}
                </p> :
                <p className="text-gray-400 font-light text-md">No description</p>
              }
            </div>
          </div>

          {/* The showing of author on each course, but since author is not working, it's commented out.
          <div className="flex items-center border-t border-gray-100 p-2">
            <span className="block relative">
              <div className="avatar placeholder">
                <div className="bg-blue-500 text-white rounded w-8">
                  <span className="text-md">
                    {course.author.firstName ? course.author.firstName.charAt(0) : "?"}
                    {course.author.firstName ? course.author.lastName.charAt(0) : "?"}
                  </span>
                </div>
              </div>
            </span>
            <div className="flex flex-col justify-between ml-4 text-sm">
              <p className="text-gray-800">{`${course.author.firstName} ${course.author.lastName && course.author.lastName}`}</p>
              <p className="text-gray-400">{"AAU"}</p>
            </div>
            </div>*/}
        </div>
      </Link>
    </div>
  )
}
