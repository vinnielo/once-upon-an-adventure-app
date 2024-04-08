import React, { useState } from "react";
import Banner from "../components/Banner/Banner";
import SignUpModal from "../components/Modals/SignUpModal";
import About from "../components/About/About";
import { Container } from "../components/Grid";
import Login from "../components/Login/Login";
import API from "../utils/API";
// import {saveUser} from '../utils/API'
import bookPile from "../images/Book-Pile.png";

const styles = {
  bookImg: {
    width: 200,
    marginTop: 10,
  },
};

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await API.findUser(formData);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const user = await response.json();
      const id = user._id;

      window.location.replace("/user/" + id);
      // Auth.login(token);
    } catch (err) {
      console.error(err);
      // setShowAlert(true);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // const user = this.state;

    try {
      const response = await API.saveUser(formData);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const user = await response.json();
      const id = user._id;

      window.location.replace("/user/" + id);
      console.log(user);
      // Auth.login(token);
    } catch (err) {
      console.error(err);
      // setShowAlert(true);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <Container>
      <div className="row">
        <div className="col-md-7 text-center">
          {/* Opening splash image */}
          <Banner />
        </div>
        <div className="col-md-5 text-center">
          {/* Login Card */}
          {/* <Login
              handleInputChange={handleInputChange}
              handleLoginSubmit={handleLoginSubmit}
            /> */}
          <div className="card">
            <div className="card-body">
              <h1>Welcome!</h1>
              <br />
              <form className="login">
                <input
                  name="email"
                  value={formData.email}
                  type="email"
                  onChange={handleInputChange}
                  className="form-control special"
                  id="email-input"
                  placeholder="Email"
                />
                <br />

                <input
                  name="password"
                  value={formData.password}
                  type="password"
                  onChange={handleInputChange}
                  className="form-control special"
                  id="password-input"
                  placeholder="Password"
                />
                <br />

                <button className="btn special" onClick={handleLoginSubmit}>
                  Log In!
                </button>

                <p>
                  or
                  <br />
                  <a
                    href="#loginModal"
                    data-toggle="modal"
                    data-target="#loginModal"
                  >
                    Create an Account
                  </a>
                  <br />
                  to begin your Adventure!
                  <br />
                  <img src={bookPile} style={styles.bookImg} alt="books" />
                </p>
              </form>
            </div>
          </div>
        </div>
        {/* An About Section */}
        <About />
        {/* Renders the sign-Up Modal */}
        <div
          className="modal fade"
          id="loginModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="loginModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Sign Up!
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="signup">
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    className="form-control special"
                    id="email-input"
                    placeholder="Email"
                  />
                  <br />

                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type="password"
                    className="form-control special"
                    id="password-input"
                    placeholder="Password"
                  />
                  <br />
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn special"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn special"
                  onClick={handleSignUpSubmit}
                >
                  Register!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
