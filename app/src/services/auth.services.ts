import axios from 'axios'

// Interfaces
import { type CCApp } from '../interfaces/CCApp'

export interface ContentCreatorApplication {
  firstName: string
  lastName: string
  email: string
  motivation: string
}

// Authenticate with JWT login
const postUserLogin = async (credentials: any) => {
  return await axios.post('http://127.0.0.1:8888/auth/jwt', credentials)
}

const postUserApplication = async (formData: ContentCreatorApplication) => {
  return await axios.post('http://127.0.0.1:8888/api/applications', formData)
}

const GetCCApplications = async (): Promise<CCApp.RootObject> => {
  return await axios.get(
    'http://127.0.0.1:8888/api/applications?approved=false&isRejected=false'
  )
}

const GetSingleUserApplication = async (url: string): Promise<CCApp.Datum> => {
  const response = await axios.get(url)
  return response.data.data
}

const PostDelcineContentCreator = async (id: string): Promise<unknown> => {
  return await axios.put(
    `http://127.0.0.1:8888/api/applications/${id}?action=reject`,
    { data: { reason: 'No' } }
  )
}

const PostAcceptContentCreator = async (id: string): Promise<unknown> => {
  return await axios.put(
    `http://127.0.0.1:8888/api/applications/${id}?action=approve`,
    { data: { reason: 'Yes' } }
  )
}

const AuthServices = Object.freeze({
  postUserLogin,
  postUserApplication,
  GetCCApplications,
  GetSingleUserApplication,
  PostDelcineContentCreator,
  PostAcceptContentCreator
})

export default AuthServices
