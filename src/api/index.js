import axios from "axios"

const setApiBaseURL = (env) => {
  if (env === "development") return "http://localhost/sinappse/odb"
  if (env === "production") return "https://api2.sinappse.com/odb"
}

export const baseURL = setApiBaseURL(process.env.NODE_ENV)

export const api = axios.create({
  baseURL,
  withCredentials: false
})
