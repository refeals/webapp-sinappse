// import jwt_decode from "jwt-decode"
// import moment from "moment"

export const TOKEN_KEY = "@sinappse-webapp-Token"

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

export const isTokenExpired = () => false
// isAuthenticated() &&
// moment().isSameOrAfter(moment(new Date(jwt_decode(getToken()).exp * 1000)))

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const login = (token) => token && localStorage.setItem(TOKEN_KEY, token)

export const logout = () => localStorage.removeItem(TOKEN_KEY)
