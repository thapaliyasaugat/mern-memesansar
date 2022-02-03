import axios from "axios"
const BASE_URL = "http://localhost:5000/api/";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWRhYzEyOWU2MjNmZmY3NjAyYmQ3MzAiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjQzMTY1MjA4LCJleHAiOjE2NDM1OTcyMDh9.pz0ngVHpeveqYFaV58hJRXPgRk2EuhOYkRRbUk7kM54"
const token = JSON.parse(localStorage.getItem('userDetail'))?.accessToken;
// console.log(token);
export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: token }
})