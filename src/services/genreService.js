import http from "./httpService";

export function getGenres() {
  //const apiUrl = process.env.MONGODB_URI || config.apiUrl;
  return http.get("/genres");
}
