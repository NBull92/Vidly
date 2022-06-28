import http from "./httpService";

//const apiUrl = process.env.MONGODB_URI || config.apiUrl;
const apiEndpoint = "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;

    return http.put(movieUrl(movie._id), body); // we create a copy of teh movie and delete the _id, becuase the server doesn't like the id of the entity being passed in, at the same time as being passed into the url.
  }

  return http.post(apiEndpoint, movie);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
