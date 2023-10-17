import axios from 'axios'

// Intefaces
//import { Section } from '../interfaces/CourseDetail'

const backendUrl = import.meta.env.VITE_BACKEND_URL

/**
 * Get section detail
 *
 * @param url url of the section
 * @param token token of the user, currently ignored
 * @returns respons from the backend get request
 */
export const getSectionDetail = async (url: string, token: string) => {
  return await axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.data)
}

/**
 * Save a section
 *
 * @param data Input data, should be a Section interface
 * @param id id of the section
 * @param token token of the user, currently ignored
 * @returns respons from the backend post request
 */
export const saveSection = async (data: any, id: any/*, token: string*/) => {
    // Send the info to caller
    console.log(`${backendUrl}/api/section/update/${id}`);
    return axios.post(
        `${backendUrl}/api/section/update/${id}`,
        data/*,
    { headers: { Authorization: `Bearer ${token}` } } */
  )
}

/**
 * Create a new section for a course
 *
 * @param data Input data, should be a Section interface
 * @param id id of the section
 * @param token token of the user, currently ignored
 * @returns respons from the backend post request
 */
const createSection = async (data: any, id: any, token: string) => {
  return await axios.post(
      `${backendUrl}/api/sections/create/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
}

const deleteSection = async (id: any, token: string) => {
    console.log("Deleted section with id: " + id)
    return await axios.delete(
        `${backendUrl}/api/sections/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
}

const SectionServices = Object.freeze({
    getSectionDetail,
    saveSection,
    createSection,
    deleteSection
});

export default SectionServices
