//---Get requests---//

import axios from "axios";

import { BACKEND_URL } from "@common/constants/environment";

// Send get request to personal information form
export const getUserFormOne = async (userID: string) => {
    return await axios.get(`${BACKEND_URL}/api/profiles/${userID}`);
};

// Send get request to academic experience form
export const getUserFormTwo = async (userID: string) => {
    return await axios.get(`${BACKEND_URL}/api/profiles/educations/${userID}`);
};
// Send get request to professional experience form
export const getUserFormThree = async (userID: string) => {
    return await axios.get(`${BACKEND_URL}/api/profiles/experiences/${userID}`);
};