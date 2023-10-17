import axios from 'axios'

// Backend URL from enviroment
const backendUrl = import.meta.env.VITE_BACKEND_URL

// Interface for posting course content
export interface CourseInterface {
  title: string
  category: string
  level: string
  estimatedHours: number
  description: string
}

/**
 * IN ALL METHODS THE TOKEN HAS BEEN COMMENTED OUT, SINCE WE DON'T HAVE A TOKEN YET
 */

// Create a new course
const createCourse = async ({ title, category, level, estimatedHours, description }: CourseInterface, token: string) => {
  return await axios.post(
    `${backendUrl}/api/courses`,
    {
      title,
      category,
      level,
      estimatedHours,
      description
    }/*,
    { headers: { Authorization: `Bearer ${token}` } } */
  )
}

// Get all courses
const getAllCourses = async (url: string/*, token: string */) => {
  return await axios.get(url/*, { headers: { Authorization: `Bearer ${token}` } } */)
    .then(res => res.data)
}

// Get course detail
const getCourseDetail = async (url: string/*, token: string */) => {
  return await axios.get(url/*, { headers: { Authorization: `Bearer ${token}` } } */)
    .then((res) => res.data)
}

// Get course categories
const getCourseCategories = async (url: string/*, token: string */) => {
  return await axios.get(url/*, { headers: { Authorization: `Bearer ${token}` } } */)
    .then(res => res.data)
}

// Updating a specific course
const updateCourseDetail = async (data: any, id: any/*, token: string */) => {
  console.log(`${backendUrl}api/courses/update/${id}`)
  return await axios.post(
    `${backendUrl}/api/courses/update/${id}`, // TODO: change backend url to not include final /
    data/*,
    { headers: { Authorization: `Bearer ${token}` } } */
  ).then(res => res.data)
}

// Create a new section for a course FIXME: should this be in section.services ??
const createSection = async (data: any, id: any, token: string) => {
  return await axios.post(
    `${backendUrl}/api/sections/create/${id}`,
    data/*,
    { headers: { Authorization: `Bearer ${token}` }} */
  )
}

// Create a new section for a course FIXME: should this be in section.services ??
const updateCoverImage = async ( id: any, token: string) => {
 
  return await axios.post(
    `${backend_route}/api/course/update/coverImage/${id}`,
      
    { 
      headers: { Authorization: `Bearer ${token}` }
      
    }
  ).then(res => res.data);
}

const CourseServices = Object.freeze({
  createCourse,
  getAllCourses,
  getCourseDetail,
  getCourseCategories,
  updateCourseDetail,
  updateCoverImage,
  createSection
})

export default CourseServices
