import axios from "axios";

import { BACKEND_URL } from "@common/constants/environment";
import { Application } from "@common/unknown/interfaces/Application";
import { User } from "@user/types/user-types";

export const GetCCApplications = async () => {
    return await axios.get(`${BACKEND_URL}/api/applications`);
};

export const GetSingleCCApplication = async (id: string | undefined) => {
    return await axios.get<{ applicator: User; application: Application }>(
        `${BACKEND_URL}/api/applications/${String(id)}`,
    );
};