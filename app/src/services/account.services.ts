import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL + 'api'

const getPublicProfileInfo = async (profileId: string, token: string | null | undefined) => {
  return await axios.get(
        `${BACKEND_URL}/public/profiles/${profileId}`,
        { headers: { Authorization: `Bearer ${token}` } }
  ).then(res => res.data)
}

const getProfileInfo = async (token: string | null | undefined) => {
  return await axios.get(
        `${BACKEND_URL}/profile/whoami`,
        { headers: { Authorization: `Bearer ${token}` } }
  ).then(res => res.data)
}

const updateProfileInfo = async (data: any, token: string | null | undefined) => {
  return await axios.put(
        `${BACKEND_URL}/profile`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
  ).then(res => res.data)
}

const changePassword = async (data: any, token: string) => {
  return await axios.put(
        `${BACKEND_URL}/profile/changePassword`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
  ).then(res => res.data)
}

const AccountServices = {
  getPublicProfileInfo,
  getProfileInfo,
  updateProfileInfo,
  changePassword
}

export default AccountServices
