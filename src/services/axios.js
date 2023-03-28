import axios from "axios";

export const fetchUserData = () =>
  axios
    .get("https://randomuser.me/api/")
    .then((response) => response.data)
    .catch((error) => console.log(error));
