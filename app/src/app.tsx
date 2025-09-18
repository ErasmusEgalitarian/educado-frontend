import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import NotFound from "./common/layout/not-found";
import EducadoAdmin from "@admin/pages/admin-page";
import Application from "@application/application";
import SingleApplicantView from "@application/SingleApplicantView";
import Certificates from "@certificates/components/certificates";
import CourseManager from "@courses/pages/course-manager";
import Courses from "@courses/pages/courses";
import {
  AdminProtectedRoute,
  ProtectedRoute,
  NonProtectedRoute,
} from "@login/auth.guard";
import Signup from "@login/components/signup";
import Login from "@login/pages/login-page";
import Welcome from "@login/pages/welcome";
import AccountDeletionRequest from "@user/components/AccountDeletionRequest";
import Profile from "@user/components/profile";
import Feedback from "./features/exercises/components/feedback";
import DataDeletionRequest from "@common/components/data-deletion";
import PrivacyPolicy from "@common/components/privacy-policy";

const App = () => {
  // router
  const router = createBrowserRouter([
    {
      // Homepage is left unused
      path: "/",
      element: <Navigate to="/welcome" />,
      errorElement: <NotFound />,
    },
    {
      path: "/courses",
      element: (
        <ProtectedRoute>
          <Courses />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/courses/manager/:id/:tick",
      element: (
        <ProtectedRoute>
          <CourseManager />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/certificates",
      element: (
        <ProtectedRoute>
          <Certificates />
        </ProtectedRoute>
      ),
    },
    {
      path: "/feedback",
      element: (
        <ProtectedRoute>
          <Feedback />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: <p>settings</p>,
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <NonProtectedRoute>
          <Login />
        </NonProtectedRoute>
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/signup",
      element: (
        <NonProtectedRoute>
          <Signup />
        </NonProtectedRoute>
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/application/:id",
      element: (
        <NonProtectedRoute>
          <Application />
        </NonProtectedRoute>
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/educado-admin",
      element: (
        <ProtectedRoute>
          <EducadoAdmin />
        </ProtectedRoute>
      ),
    },
    {
      path: "/educado-admin/applications",
      element: (
        <AdminProtectedRoute requiredRole="admin">
          <EducadoAdmin />
        </AdminProtectedRoute>
      ),
    },
    {
      path: "/educado-admin/applications/:id",
      element: (
        <ProtectedRoute>
          <SingleApplicantView />
        </ProtectedRoute>
      ),
    },
    {
      path: "/welcome",
      element: (
        <NonProtectedRoute>
          <Welcome />
        </NonProtectedRoute>
      ),
    },
    {
      path: "/data_deletion_request",
      element: (
        <NonProtectedRoute>
          <DataDeletionRequest />
        </NonProtectedRoute>
      ),
    },
    {
      path: "/account_deletion_request",
      element: (
        <ProtectedRoute>
          <AccountDeletionRequest />
        </ProtectedRoute>
      ),
    },
    {
      path: "/privacy_policy",
      element: (
        <NonProtectedRoute>
          <PrivacyPolicy />
        </NonProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
