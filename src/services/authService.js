import http from "./httpService";
import jwtDecode from "jwt-decode";

//const apiUrl = process.env.MONGODB_URI || config.apiUrl;
const apiEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jsonWebToken } = await http.post(apiEndpoint, {
    email,
    password,
  });
  console.log(jsonWebToken);
  localStorage.setItem(tokenKey, jsonWebToken);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jsonWebToken = localStorage.getItem(tokenKey);
    return jwtDecode(jsonWebToken);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
