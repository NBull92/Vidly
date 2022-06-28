import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="logout" element={<Logout />} />
            <Route path="movies/:id" element={<MovieForm user={user} />} />
            <Route path="movies" element={<Movies user={user} />} />
            <Route path="customers" element={<Customers />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="not-found" element={<NotFound />} />
            <Route path="/" exact element={<Navigate replace to="movies" />} />
            <Route path="*" element={<Navigate replace to="not-found" />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
}

export default App;
