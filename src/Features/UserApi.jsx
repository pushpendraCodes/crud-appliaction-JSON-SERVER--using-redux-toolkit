import axios from "axios";

export const getUsers = () => {
  try {
    let res = axios.get("http://localhost:4000/User");

    return res;
  } catch (error) {
    console.log(error);
  }
};


