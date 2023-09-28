import axios from "axios";

// Backend URL from enviroment
const backend_route = import.meta.env.VITE_BACKEND_URL;

// Interface for posting course content
export interface CourseInterface {
  title: string;
  category: string;
  level: string;
  coverImageId: number;
  description: string;
}

// Create a new course
const createCourse = async ({ title, category, level, coverImageId, description }: CourseInterface, token: string) => {
  return await axios.post(
    `${backend_route}/api/courses`,
    {
      title: title,
      category: category,
      level: level,
      coverImageId: coverImageId,
      description: description,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// Get all courses
const getAllCourses = (url: string, token: string) => {
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data);
};

// Get course detail
const getCourseDetail = (url: string, token: string) => {
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data);
};

// Get course categories
const getCourseCategories = (url: string, token: string) => {
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data);
}

// Updating a specific course
const updateCourseDetail = (data: any, id: any, token: string) => {
  return axios.put(
    `${import.meta.env.VITE_BACKEND_URL}api/courses/${id}`, // TODO: change backend url to not include final /
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  ).then(res => res.data);
}

// Create a new section for a course FIXME: should this be in section.services ??
const createSection = async (data: any, id: any, token: string) => {
  return await axios.post(
    `${backend_route}/api/courses/${id}/sections`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

const CourseServices = Object.freeze({
  createCourse,
  getAllCourses,
  getCourseDetail,
  getCourseCategories,
  updateCourseDetail,
  createSection
});

export default CourseServices;
