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

export async function getMentorById(id) {
  return axios.get(apiEndpoint + `api/v1/mentor/${id}`, options);
}

export async function addMentor(formData) {
  console.log(formData);
  return axios.post(apiEndpoint + `/api/v1/mentor/`, formData, options);
}
