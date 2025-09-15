import axios from "axios";

// Backend URL from enviroment
import { CreatorPopulatedCourse, Course, NewCourse } from "@interfaces/Course";

import { BACKEND_URL } from "../helpers/environment";
import { getUserInfo, getUserToken } from "../helpers/userInfo";

//interfaces

/**
 * IN ALL METHODS THE TOKEN HAS BEEN COMMENTED OUT, SINCE WE DON'T HAVE A TOKEN YET
 */

const createCourse = async (data: NewCourse, token: string) => {
  return await axios.put<Course>(
    `${BACKEND_URL}/api/courses`,
    {
      title: data.title,
      description: data.description,
      category: data.category,
      difficulty: data.difficulty,
      creator: data.creator,
      status: data.status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        token: localStorage.getItem("token") || "",
      },
    },
  );
};

/**
 * Get all courses from specific creator
 * @param token The token of the user
 * @returns A list of all courses for the creator
 */
const getAllCreatorCourses = async (token: string) => {
  const { id } = getUserInfo();

  const res = await axios.get<Course[]>(
    `${BACKEND_URL}/api/courses/creator/${id}`,
    {
      headers: { Authorization: `Bearer ${token}`, token: token },
    },
  );

  // Convert dates in course data to Date objects
  res.data.forEach((course) => {
    if (course.dateCreated) course.dateCreated = new Date(course.dateCreated);
    if (course.dateUpdated) course.dateUpdated = new Date(course.dateUpdated);
  });

  return res.data;
};

/**
 * Get all courses
 * @returns A list of all courses
 */
const getAllCourses = async () => {
  const token = getUserToken();
  const res = await axios.get<CreatorPopulatedCourse[]>(
    `${BACKEND_URL}/api/courses/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  // Convert dates in course data to Date objects
  res.data.forEach((course) => {
    if (course.dateCreated) course.dateCreated = new Date(course.dateCreated);
    if (course.dateUpdated) course.dateUpdated = new Date(course.dateUpdated);
  });

  return res.data;
};

/**
 * Get course detail
 * @param url The route to get the course detail
 * @returns The course detail
 */
const getCourseDetail = async (url: string, token: string) => {
  const res = await axios.get<Course>(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// Get course categories - FROM LAST YEAR, NOT IMPLEMENTED, CATEGORIES ARE HARDCODED RN
const getCourseCategories = async (url: string, token: string) => {
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

/**
 * Update a specific course
 * @param data the data of the course to be updated
 * @param id The id of the course
 * @param token The token of the user
 * @returns Confirmation of the update
 */
const updateCourseDetail = async (
  data: Partial<Course>,
  id: string | undefined,
  token: string,
) => {
  const res = await axios.patch(`${BACKEND_URL}/api/courses/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

const updateCourseSectionOrder = async (
  sections: string[],
  id: string | undefined,
  token: string,
) => {
  const res = await axios.patch(
    `${BACKEND_URL}/api/courses/${id}/sections`,
    { sections },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return res.data;
};

const updateCourseStatus = async (
  course_id: string | undefined,
  status: string,
  token: string,
) => {
  const res = await axios.patch(
    `${BACKEND_URL}/api/courses/${course_id}/updateStatus`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return res.data;
};

/**
 * Delete a specific course
 * @param id the id of the course that will be deleted
 * @param token token of the user
 * @returns Delete data
 */
const deleteCourse = async (id: string | undefined, token: string) => {
  return await axios.delete(`${BACKEND_URL}/api/courses/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Export all methods
const CourseServices = Object.freeze({
  createCourse,
  getAllCreatorCourses,
  getAllCourses,
  getCourseDetail,
  getCourseCategories,
  updateCourseDetail,
  updateCourseStatus,
  updateCourseSectionOrder,
  deleteCourse,
});

export default CourseServices;
