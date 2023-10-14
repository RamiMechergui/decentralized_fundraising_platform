import axios from 'axios'
// import {AuthModel} from '../models/AuthModel'
import {UserModel} from '../models/UserModel'

const API_URL = process.env.REACT_APP_API_URL || 'api'

export const GET_USER_BY_ACCESSTOKEN_URL = `http://backend.tokenopp.org/api/auth/get-user`
export const LOGIN_URL = `http://backend.tokenopp.org/api/auth/login`
{/*export const REGISTER_URL = `http://backend.docker.local/api/auth/signup`*/}
export const REGISTER_URL = `http://backend.tokenopp.org/api/auth/signup`
export const REQUEST_PASSWORD_URL = `http://backend.tokenopp.org/api/auth/email-to-reset-pass`
export const RESET_PASSWORD_URL = `http://backend.tokenopp.org/api/auth/reset-password`
export const LOGOUT_URL = `http://backend.tokenopp.org/api/auth/logout`
export const AUTH_URL = `http://backend.tokenopp.org/api/auth/verify-two-factor-code`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post(LOGIN_URL, {email, password})
}
  


// Server should return AuthModel
export function register( userName: string, email: string, password: string, userType: string) {
  return axios.post(REGISTER_URL, {
    userName,
    email,
    password,
    userType,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function resetPassword(code : string, password: string) {
  return axios.post( RESET_PASSWORD_URL, {code, password})
}

export function requestPassword (email: string) {
  return axios.post(REQUEST_PASSWORD_URL, {email})
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get(GET_USER_BY_ACCESSTOKEN_URL)
}
export function authentication(email: string, twoFactorCode: string) {
  return axios.post(AUTH_URL, { email, twoFactorCode })
}
export function logout() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(LOGOUT_URL)
}