import axios from "axios";

// Intefaces
import { Section } from "../interfaces/CourseDetail";

const backend_url = import.meta.env.VITE_BACKEND_URL;

/**
 * Get section detail
 * 
 * @param url url of the section
 * @param token token of the user, currently ignored
 * @returns respons from the backend get request
 */
export const getSectionDetail = (url: string, token: string) => {
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data)
}

/**
 * Get exercise detail
 * 
 * @param url url of the exercise
 * @param token token of the user, currently ignored
 * @returns respons from the backend get request
 */
export const getExerciseDetail = (url: string, token: string) => {
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
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
    console.log(`${backend_url}/api/sections/update/${id}`);
    return axios.post(
        `${backend_url}/api/sections/update/${id}`,
        data/*,
    { headers: { Authorization: `Bearer ${token}` } }*/
    );
};

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
      `${backend_url}/api/sections/create/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

const SectionServices = Object.freeze({
    getSectionDetail,
    getExerciseDetail,
    saveSection,
    createSection
    
});

export default SectionServices;
