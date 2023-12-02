import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import ProtectedRoute from "./services/auth.guard";
import { NonProtectedRoute } from "./services/auth.guard";

// Non-auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import Application from "./pages/Application";

// Auth Pages
import Courses from "./pages/Courses";
import CourseManager from "./pages/CourseManager";

import Profile from "./pages/Profile";

// Educado Admin
import EducadoAdmin from "./pages/EducadoAdmin";
import SingleApplicantView from "./pages/SingleApplicantView";
import Certificates from "./pages/Certificates";
import NewInstitution from "./pages/NewInstitution";



// Delete user request for app
import DataDeletionRequest from "./pages/DataDeletionRequest";
import AccountDeletionRequest from "./pages/AccountDeletionRequest";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  // router
  const router = createBrowserRouter([
    { // Homepage is left unused
      path: "/",
      element: <Navigate to={"/welcome"} />,
      errorElement: <NotFound />
    },
    {
      path: "/courses",
      element: <ProtectedRoute><Courses /></ProtectedRoute>,
      errorElement: <NotFound />,
    },
    {
      path: "/courses/manager/:id/:tick",
      element: <ProtectedRoute><CourseManager /></ProtectedRoute>,
      errorElement: <NotFound />,
    },
		{
			path: "/certificates",
			element: <ProtectedRoute><Certificates /></ProtectedRoute>,
		},
    {
      path: "/settings",
      element: <p>settings</p>
    },
    {
      path: "/profile",
      element: <ProtectedRoute><Profile /></ProtectedRoute>
    },
    {
      path: "/login",
      element: <NonProtectedRoute><Login /></NonProtectedRoute>,
      errorElement: <NotFound />
    },
    {
      path: "/signup",
      element: <NonProtectedRoute><Signup /></NonProtectedRoute>,
      errorElement: <NotFound />
    },
    {
      path: "/application/:id",
      element: <NonProtectedRoute><Application /></NonProtectedRoute>,
      errorElement: <NotFound />
    },
    {
      path: "/educado-admin",
      element: <ProtectedRoute><EducadoAdmin /></ProtectedRoute>,
    },
    {
      path: "/educado-admin/new-institution",
      element: <ProtectedRoute><NewInstitution /></ProtectedRoute>
    },
    {
      path: "/educado-admin/applications",
      element: <ProtectedRoute><EducadoAdmin /></ProtectedRoute>
    },
    {
      path: "/educado-admin/applications/:id",
      element: <ProtectedRoute><SingleApplicantView /></ProtectedRoute>,
    },
    {
      path: "/welcome",
      element: <NonProtectedRoute><Welcome /></NonProtectedRoute>,
    },
    {
      path: "/data_deletion_request",
      element: <NonProtectedRoute><DataDeletionRequest /></NonProtectedRoute>,
    },
    {
      path: "/account_deletion_request",
      element: <NonProtectedRoute><AccountDeletionRequest /></NonProtectedRoute>,
    },
    {
      path: "/privacy_policy",
      element: <NonProtectedRoute><PrivacyPolicy /></NonProtectedRoute>,
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]
)
  return <RouterProvider router={router} />;
}

export default App