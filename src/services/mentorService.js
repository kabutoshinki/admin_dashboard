import config from "../config.json";
import axios from "axios";
import { async } from "@firebase/util";

const apiEndpoint = config.apiEndpoint;

let accessToken = localStorage.getItem("Access-Token");
// Đặt quyền truy cập vào api
const options = {
  headers: {
    Authorization: "Bearer " + accessToken,
  },
};

export async function getMentors() {
  return axios.get(apiEndpoint + `/api/v1/mentor/?pageNo=0&pageSize=99&sortBy=id`, options);
}

export async function getListMentorsById(id) {
  return axios.get(apiEndpoint + `/api/v1/mentor/project/${id}`, options);
}

export async function getMentorById(id) {
  return axios.get(apiEndpoint + `api/v1/mentor/${id}`, options);
}

export async function getProjectsByMentorId(id) {
  return axios.get(apiEndpoint + `api/v1/mentor/${id}/projects`, options);
}
export async function deleteMentorById(id) {
  return axios.delete(apiEndpoint + `api/v1/mentor/${id}`, options);
}

export async function addMentor(formData) {
  console.log(formData);
  return axios.post(apiEndpoint + `/api/v1/mentor/`, formData, options);
}
export async function updateMentor(formData) {
  console.log(formData);
  return axios.put(apiEndpoint + `api/v1/mentor/${formData.id}`, formData, options);
}
