import axios from 'axios'

const backend_url = import.meta.env.VITE_BACKEND_URL;

// Interfaces
import { type Exercise } from '../interfaces/Exercise'

// Send the info to exercise service 
const addExercise = async (props: any/*, token: string*/, sid: any) => {
  return await axios.post(
    `${backend_url}/api/exercises/create/${sid}`,
    props/*,
    { headers: { Authorization: `Bearer ${token}` } }*/
  );
}

// Send the info to exercise service
const updateExercise = async (props: any/*, token: string*/, eid: any) => {
  const response = await axios.post(
    `${backend_url}/api/exercises/update/${eid}`,
    props/*,
    { headers: { Authorization: `Bearer ${token}` } }*/
  );
  return response.data
};

// Get exercise detail
const getExerciseDetail = (url: string, token: string) => {
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.data)
}

/* OLD CODE FROM LAST YEAR
// Send the info to exercise service
const addExercise = async (props: Exercise, token: string, sid: string | null | undefined) => {
  const response = await axios.post(
    `http://127.0.0.1:8888/api/sections/${sid}/exercises`,
    props,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  return response.data
};
*/

/* OLD CODE FROM LAST YEAR
// Send the info to exercise service
const saveExercise = async (props: any, token: string) => {
  const response = await axios.put(
    `http://127.0.0.1:8888/api/exercises/${props.id}`,
    props,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  return response.data
};
*/


const ExerciseServices = Object.freeze({ getExerciseDetail, addExercise, updateExercise });

export default ExerciseServices;
