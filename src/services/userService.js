import axios from "axios";
import { USERS_URL } from "constants/url-endpoints";

export const getUsers = () => {
  return axios
    .get(USERS_URL)
    .then((res) => {
      const { data, status } = res;
      if (status === 200) return { data, error: "" };
      return { data: [], error: "" };
    })
    .catch((err) => {
      console.log("Error:", err);
      return { data: null, error: "Error fetching users" };
    });
};

export const postUser = (data) => {
  data.password = `${data.firstname}@123`;
  return axios
    .post(USERS_URL, data)
    .then((res) => {
      const { data, status } = res;
      if (status === 200) return { data, error: "" };
      return { data: [], error: "" };
    })
    .catch((err) => {
      console.log("Error:", err);
      return { data: null, error: "Error adding user" };
    });
};
