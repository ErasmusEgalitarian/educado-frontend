import axios from "axios";

import { BACKEND_URL } from "@common/constants/environment";
import { Application } from "@common/unknown/interfaces/Application";
import { Institution } from "@admin/types/institution-types";
import { User } from "@user/types/user-types";

// TODO move interfaces somewhere else
export interface ContentCreatorApplication {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  token: string | null;
}

export interface UserCredentials {
  email: string;
  password: string;
  isContentCreator: boolean;
}

