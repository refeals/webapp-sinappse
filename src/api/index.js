import axios from "axios"

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_PROD_BASE_URL,
  withCredentials: false
})

export const oldApi = axios.create({
  baseURL: process.env.REACT_APP_API_OLD_BASE_URL,
  withCredentials: false
})
