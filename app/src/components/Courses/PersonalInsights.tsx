// Interfaces
import { Course } from '../../interfaces/Course';

// Components
import StarRating from "../general/StarRating";

// Helper functions
import { getUserInfo } from '../../helpers/userInfo';
import statuses from "../../helpers/courseStatuses";
import { getCourseCountWithStatus, getNumberOfCourses, getTotalSubscriberCount, getAverageRating } from '../../helpers/courses';

type PersonalInsightsProps = {
  courses: Course[];
}

const userInfo = getUserInfo();

/**
 * @param props 
 * @param props.courses
 * @returns HTML Element
 * 
 * This component displays personal insights about the user.
 * (Right side of the Courses page at the time of writing)
 */
const PersonalInsights = (props: PersonalInsightsProps) => {
  const courses = props.courses ?? [];

  

  // TODO: Implement functionality for user info fields
  return (
    <div className='w-full h-full'>
      {/* Welcome message */}
      <h2 className='text-xl font-bold'>Olá {userInfo.name}</h2>
      {/* Progress section (stats) */}
      <div className='border-y-[1px] border-grayMedium my-4 py-4'>
        <div className='grid grid-cols-4 lg:grid-cols-1 gap-y-4'>
          {/* Show stats if the user has > 0 courses */}
          {courses.length ? <>
            <div>
              {['published', 'draft', 'hidden'].map((status, key) => {
                return <div key={key} className='flex flex-row gap-2'>
                  <div className={'w-3 h-3 rounded-full my-auto ' + (statuses[status].color ?? statuses.default.color)} />
                  <p>{statuses[status].br ?? statuses.default.br} cursos:</p>
                  <p className='font-bold'>{getCourseCountWithStatus(courses, status)}</p>
                </div>
              })}
              {/* Total courses */}
              <div className='flex flex-row gap-2 ml-5'>
                <p>Total cursos:</p>
                <p className='font-bold' id='courseAmount'>{getNumberOfCourses(courses)}</p>
              </div>
            </div>
            <div>
              {/* Total students */}
              <p>Total alunos</p>
              <p className='font-bold' id='subscribers'>{getTotalSubscriberCount(courses)}</p>
            </div>
            <div>
              {/* Rating */}
              <p>Avaliação</p>
              <div className='w-[12rem] max-w-full'>
                <StarRating testId={'averageRating'} rating={getAverageRating(courses)} className='text-2xl font-bold' />
              </div>
            </div>
            {/* If the user has 0 courses */}
          </> : <p className='italic' id='noCourses'>Não há dados suficiente</p> /* There's not enough data */}
        </div>
      </div>
      {/* Activities section */}
      <div>
        <p className='font-bold'>Atividades</p> {/* */}
        <div className='grid grid-cols-4 lg:grid-cols-1 gap-y-2'>
          {/* Show activities if the user has > 0 courses */}
          {courses.length ? <>

            {/* If the user has 0 courses */}
          </> : <p className='italic'>Nenhuma atividade</p> /* No activities */}
        </div>
      </div>
    </div>
  );
}

export default PersonalInsights;
