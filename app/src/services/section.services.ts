import axios from "axios";

// Intefaces
import { Section } from "../interfaces/CourseDetail";

const backend_url = import.meta.env.VITE_BACKEND_URL + 'api';

export const getSectionDetail = (url: string, token: string) => {
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data)
}

// boilerplate FIXME: should this be en Exercise.services ??
export const getExerciseDetail = (url: string, token: string) => {
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.data)
}

export const saveSection = async (props: Section, sid: string | null | undefined, token: string) => {
    // Send the info to caller
    return axios.put(
        `${backend_url}/sections/${sid}`,
        props,
        { headers: { Authorization: `Bearer ${token}` } }
    );
};

const SectionServices = Object.freeze({
    getSectionDetail,
    getExerciseDetail,
    saveSection
});

export default SectionServices;
