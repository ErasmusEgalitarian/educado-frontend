import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';

// Hooks 
import useToken from '../hooks/useToken';

// Services
import CourseServices from '../services/course.services';

// Components
import Layout from '../components/Layout'
import Loading from './Loading';
import { CourseListCard } from '../components/Courses/CourseListCard'
import { CreateCourseModal } from '../components/Courses/CreateCourseModal';
import { PageDescriptor } from '../components/PageDescriptor';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';

const Courses = () => {
  // States and Hooks
  const navigate = useNavigate();
  const token = useToken();

  // Fetch all courses
  const { data, error } = useSWR(
    token ? ["http://127.0.0.1:8888/api/course/eml/getall", token] : null,
    CourseServices.getAllCourses
  );
  
  console.log(token);

  // useSWR built in loaders
if (error) return navigate("/login");
if (!data) return <Loading/>;

  return (
    <Layout meta="Course overview" >
      <main className="h-full bg-gradient-to-br from-[#c8e5ec] to-[white]">

      {/** Page Descriptor */}
      <PageDescriptor
        title="Courses"
        desc="All courses are verified and validated by experts or an Educado Admin."
      />

      {/** Page Navbar */}
      <div className="navbar bg-none p-6">
        <div className="flex-1">
          {/** Create new courses */}
          <CreateCourseModal />
        </div>
      </div>

      {/** Page content real data from backend */}
      
      {/*we changed data.length from data.data.length, don't know why it had double data.*/}
      {data.length ? //Some of This needs to be commented out, if there are no data.
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-6">
          {data.map((course: any, key: number) => <CourseListCard course={course} key={key} />)}
        </div> :
        <div className='flex flex-col space-y-8 justify-center items-center p-6'>
          <CubeTransparentIcon width={44} className="lg:mt-24 text-primary"/>
          <div className='flex flex-col text-center space-y-4'>
            <h2 className='text-2xl'>Seems like you haven't created a course yet</h2>
            <h2 className='text-sm'>You can use the 'CREATE NEW COURSE' button to get started</h2>
          </div>
        </div>
      }
      </main>
    </Layout>
  )
}

export default Courses

