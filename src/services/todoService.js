import axios from "axios";
import { TODO_URL } from "constants/url-endpoints";

export const getTodoList = () => {
  return axios
    .get(TODO_URL)
    .then((res) => {
      const { data, status } = res;
      if (status === 200) return { data, error: "" };
      return { data: [], error: "" };
    })
    .catch((err) => {
      console.log("Error:", err);
      return { data: null, error: "Error fetching todo list" };
    });
};

export const postTodo = (item) => {
  const data = {
    itemName: item,
    status: "pending",
  };
  return axios
    .post(TODO_URL, data)
    .then((res) => {
      const { data, status } = res;
      if (status === 200) return { data, error: "" };
      return { data: [], error: "" };
    })
    .catch((err) => {
      console.log("Error:", err);
      return { data: null, error: "Error adding todo" };
    });
};
