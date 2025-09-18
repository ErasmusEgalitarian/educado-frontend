import axios from "axios";

import { BACKEND_URL } from "@common/constants/environment";


//Upload image request
export const postImage = async (formData: any) => {
    return await axios.post(`${BACKEND_URL}/api/bucket/`, formData);
};

//---Delete requests---//
//Delete additional academic forms
export const deleteEducationForm = async (_id: string) => {
    return await axios.delete(`${BACKEND_URL}/api/profiles/educations/${_id}`);
};

//Delete additional professional forms
export const deleteExperienceForm = async (_id: string) => {
    return await axios.delete(`${BACKEND_URL}/api/profiles/experiences/${_id}`);
};

//---Update requests---//
// Update personal form
export const putFormOne = async (formDataToSend: string) => {
    return await axios.put(`${BACKEND_URL}/api/profiles`, formDataToSend);
};

// Update academic form
export const putFormTwo = async (data: {
    userID: string | undefined;
    educationLevel: string[];
    status: string[];
    course: string[];
    institution: string[];
    startDate: string[];
    endDate: string[];
}) => {
    return await axios.put(`${BACKEND_URL}/api/profiles/educations`, data);
};

// Update professional form
export const putFormThree = async (data: {
    userID: string | undefined;
    company: string[];
    jobTitle: string[];
    startDate: string[];
    endDate: string[];
    isCurrentJob: boolean[];
    description: string[];
}) => {
    return await axios.put(`${BACKEND_URL}/api/profiles/experiences`, data);
};