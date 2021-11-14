import axios from "axios";

const requestt = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyAHwaanFQlB6XQkvIDVfB5p6oiPU4DydDU",
  },
});
export default requestt;
