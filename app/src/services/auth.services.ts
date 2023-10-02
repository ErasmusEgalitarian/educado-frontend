import axios from "axios";

// Interfaces
import { CCApp } from "../interfaces/CCApp";
import { boolean } from "yup";

export interface ContentCreatorApplication {
  name: String;
  email: String;
  password: String;
}


// Authenticate with JWT login
const postUserLogin = async (credentials: any) => {
  return await axios.post("http://127.0.0.1:8888/api/credentials/login", credentials);
};


const postUserSignup = async(formData: ContentCreatorApplication) => {
  return await axios.post("http://127.0.0.1:8888/api/credentials/signup", formData)
}

/*  const postUserApplication = async (formData: ContentCreatorApplication) => {
  return await axios.post("http://127.0.0.1:8888/api/applications", formData);
}; */

const GetCCApplications = async (): Promise<CCApp.RootObject> => {
  return await axios.get(
    "http://127.0.0.1:8888/api/applications?approved=false&isRejected=false"
  );
};

const GetSingleUserApplication = async (url: string): Promise<CCApp.Datum> => {
  const response = await axios.get(url);
  return response.data.data;
};

const PostDelcineContentCreator = async (id: string): Promise<unknown> => {
  return await axios.put(
    `http://127.0.0.1:8888/api/applications/${id}?action=reject`,
    { data: { reason: "No" } }
  );
};

const PostAcceptContentCreator = async (id: string): Promise<unknown> => {
  return await axios.put(
    `http://127.0.0.1:8888/api/applications/${id}?action=approve`,
    { data: { reason: "Yes" } }
  );
};

const AuthServices = Object.freeze({
  postUserLogin,
  postUserSignup,
  //postUserApplication,
  GetCCApplications,
  GetSingleUserApplication,
  PostDelcineContentCreator,
  PostAcceptContentCreator,
});

export default AuthServices;
