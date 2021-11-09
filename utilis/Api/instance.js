import axios from "axios";
const instance = axios.create({
    baseURL: "http://15.185.185.85:3001", 
    timeout: 1000,
    // headers: {}
});


export { instance }
