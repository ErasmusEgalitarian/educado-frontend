import axios from "axios";

import { BACKEND_URL } from "@common/constants/environment";

/**
 * Update a section with new data
 */
export const saveSection = async (
    data: any,
    id: string | undefined,
    token: string,
) => {
    if (id == undefined) {
        throw new Error("Error: saveSection input id is undefined");
    }
    // Send the info to caller
    return axios.patch(`${BACKEND_URL}/api/sections/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

/**
 * Create a new section for a course
 *
 * @param data Input data, should be a Section interface
 * @param id id of the section
 * @param token token of the user, currently ignored
 * @returns respons from the backend post request
 */
export const createSection = async (
    data: any,
    id: string | undefined,
    token: string,
) => {
    if (id == undefined) {
        throw new Error("Error: createSection input id is undefined");
    }
    return await axios.put(`${BACKEND_URL}/api/sections/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

/**
 * Delete a section
 *
 * @param id Section ID
 * @param token
 * @returns
 */
export const deleteSection = async (id: string | undefined, token: string) => {
    if (id == undefined) {
        throw new Error("Error: deleteSection input id is undefined");
    }
    return await axios.delete(`${BACKEND_URL}/api/sections/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};