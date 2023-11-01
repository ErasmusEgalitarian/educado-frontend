import axios from "axios";

// Backend URL from enviroment
import { BACKEND_URL } from '../helpers/environment';
import { getUserInfo, getUserToken } from "../helpers/userInfo";

// Interface for posting course content
export interface CourseInterface {
  title: string;
  category: string;
  difficulty: number;
  description: string;
  estimatedHours: number;
  creator: string;
}

const client = axios.create({
  baseURL: 'http://localhost:8888/api/courses',
  headers: {
    "Content-Type": "application/json",
    token: getUserToken(),
  },
});

/**
 * IN ALL METHODS THE TOKEN HAS BEEN COMMENTED OUT, SINCE WE DON'T HAVE A TOKEN YET
 */

// Create a new course
const createCourse = async ({ title, category, difficulty, estimatedHours, description, creator }: CourseInterface, token: string) => {
  return await axios.put(
    `${BACKEND_URL}/api/courses`,
    {
      title: title,
      description: description,
      category: category,
      difficulty: difficulty,
      estimatedHours: estimatedHours,
      creator: creator,
    },
    { headers: { Authorization: `Bearer ${token}`, token: localStorage.getItem('token') || '' } }
  );
};

// TODO: Foundation for updating coverimage. Implement next PR. Possibly merge with updateCourseDetail
// Create a new section for a course
/* 
const updateCoverImage = async ( id: any, token: string) => {
 
  return await axios.patch(
    `${BACKEND_URL}/api/course/coverImage/${id}`,
      
    { 
      headers: { Authorization: `Bearer ${token}` }
      
    }
  ).then(res => res.data);
}*/

/**
 * Get all courses
 * @param token The token of the user
 * @returns A list of all courses
 */
const getAllCourses = async ( token: string) => {
  const { id } = getUserInfo();

  return await axios.get(`${BACKEND_URL}/api/courses/creator/${id}`, { headers: { Authorization: `Bearer ${token}`, token: token } })

    .then(res => {
      // Convert dates in course data to Date objects
      res.data.forEach((course: any) => {
        course.createdAt = new Date(course.createdAt);
        course.modifiedAt = new Date(course.modifiedAt);
      });
      return res.data;
    });
};

/**
 * Get course detail
 * @param url The route to get the course detail
 * @returns The course detail
 */
const getCourseDetail = async (url: string/*, token: string*/) => {
  return await axios.get(url/*, { headers: { Authorization: `Bearer ${token}` } }*/)
    .then((res) => res.data);
};

// Get course categories - FROM LAST YEAR, NOT IMPLEMENTED, CATEGORIES ARE HARDCODED RN
const getCourseCategories = (url: string/*, token: string*/) => {
  return axios.get(url/*, { headers: { Authorization: `Bearer ${token}` } }*/)
    .then(res => res.data);
}

/**
 * Update a specific course
 * @param data the data of the course to be updated 
 * @param id The id of the course
 * @returns Confirmation of the update
 */
const updateCourseDetail = async (data: any, id: any/*, token: string*/) => {
  return await axios.patch(
    `${BACKEND_URL}/api/courses/${id}`,
    data/*,
    { headers: { Authorization: `Bearer ${token}` } }*/
  ).then(res => res.data);
}


/**
 * Delete a specific course 
 * @param id the id of the course that will be deleted
 * @param token token of the user 
 * @returns Delete data
 */
const deleteCourse = async (id: any, token: string) => {
  return await axios.delete(
      `${BACKEND_URL}/api/courses/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
  );
  
}

// Export all methods
const CourseServices = Object.freeze({
  createCourse,
  getAllCourses,
  getCourseDetail,
  getCourseCategories,
  updateCourseDetail,
  /*updateCoverImage,*/
  deleteCourse
});

export default CourseServices;
