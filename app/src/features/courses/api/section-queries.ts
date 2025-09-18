import axios from "axios";

import { BACKEND_URL } from "@common/constants/environment";

export const getSectionDetail = (sid: string, token: string) => {
    if (sid == undefined) {
        throw new Error("Error: getSectionDetail input sid is undefined");
    }
    return axios
        .get(`${BACKEND_URL}/api/sections/${sid}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data);
};
