import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

// Non-auth pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'

// Auth Pages
import Courses from './pages/Courses'
import CourseEdit from './pages/CourseEdit'
import SectionEdit from './pages/SectionEdit'
import Profile from './pages/Profile'

// Educado Admin
import EducadoAdmin from './pages/EducadoAdmin'
import SingleApplicantView from './pages/SingleApplicantView'

function App () {
  // router
  const router = createBrowserRouter([
    { // Homepage is left unused
      path: '/',
      element: <Navigate to={'/courses'} />,
      errorElement: <NotFound />
    },
    {
      path: '/courses',
      element: <Courses />,
      errorElement: <NotFound />
    },
    {
      path: '/courses/edit/:id',
      element: <CourseEdit />
    },
    {
      path: '/courses/edit/:cid/sections/:sid',
      element: <SectionEdit />
    },
    {
      path: '/settings',
      element: <p>settings</p>
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/login',
      element: <Login />,
      errorElement: <NotFound />
    },
    {
      path: '/signup',
      element: <Signup />,
      errorElement: <NotFound />
    },
    {
      path: '/educado_admin',
      element: <EducadoAdmin />
    },
    {
      path: '/educado_admin/applications',
      element: <EducadoAdmin />
    },
    {
      path: '/educado_admin/applications/:id',
      element: <SingleApplicantView />
    }
  ])

  return <RouterProvider router={router} />
}

export default App
