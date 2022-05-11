import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import gossip1 from "../assets/gossip1.png";
import gossip2 from "../assets/gossip2.png";
import gossip3 from "../assets/gossip3.png";
import gossip4 from "../assets/gossip4.png";
import gossip5 from "../assets/gossip5.png";
import gossip6 from "../assets/gossip6.png";
import gossip7 from "../assets/gossip7.png";
import gossip8 from "../assets/gossip8.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes.js";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or more than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>FriChat</h1>
          </div>
          <div className="RegisContainer">
            <label className="username">
              <span>Username</span>
              <input
                value={values.username}
                type="text"
                placeholder="zningLow"
                name="username"
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            <label className="email">
              <span>Email</span>
              <input
                value={values.email}
                type="email"
                placeholder="abcd@gmail.com"
                name="email"
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            <label className="pwd">
              <span>Password</span>
              <input
                value={values.password}
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            <label className="confirmPwd">
              <span>Confirm Password</span>
              <input
                value={values.confirmPassword}
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            <button type="submit">Sign Up</button>
            <span className="login">
              Already have an account ? <Link to="/login">Login</Link>
            </span>
          </div>
        </form>
        <ul className="circles">
          <li>
            <img src={gossip1} alt="gossip1" />
          </li>
          <li>
            <img src={gossip2} alt="gossip2" />
          </li>
          <li>
            <img src={gossip3} alt="gossip3" />
          </li>
          <li>
            <img src={gossip4} alt="gossip4" />
          </li>
          <li>
            <img src={gossip5} alt="gossip5" />
          </li>
          <li>
            <img src={gossip6} alt="gossip6" />
          </li>
          <li>
            <img src={gossip7} alt="gossip7" />
          </li>
          <li>
            <img src={gossip8} alt="gossip8" />
          </li>
        </ul>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: beige;
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      animation: animate 25s linear infinite;
      bottom: -150px;
      &:nth-child(1) {
        left: 25%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 10%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 72%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 68%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 78%;
        width: 110px;
        height: 110px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 20%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
    }
    img {
      width: 60px;
      height: 60px;
    }
  }
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    h1 {
      color: #323031;
      font-size: 3rem;
    }
    img {
      height: 4rem;
    }
  }
  .RegisContainer {
    display: flex;
    flex-direction: column;
    .login {
      color: #ffffff;
    }
  }
  .username,
  .email,
  .pwd,
  .confirmPwd {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.2rem;
  }
  form {
    width: 600px;
    padding: 3rem 5rem;
    background-color: #177e89;
    border-radius: 15px;
    z-index: 2;
  }
  span {
    display: block;
    color: #ffc857;
    font-size: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    a {
      text-decoration: none;
      color: #ffc857;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  input {
    display: block;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    padding: 0.5rem 0.75rem;
    width: 100%;
    border-radius: 10px;
    height: 2.5rem;
    outline-style: none;
    box-shadow: 3px 2px 6px 0 #cecece;
    border: none;
    transition: all 50ms ease-in-out;
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
      box-shadow: 0 0 0 30px white inset !important;
    }
    &:focus {
      outline: solid #ffc857 3px;
      border: none;
      box-shadow: none;
    }
  }
  button {
    padding: 0.5rem 0.75rem;
    height: 2.5rem;
    border-radius: 10px;
    border: none;
    background-color: #ffc857;
    color: #177e89;
    font-size: 1rem;
    font-weight: bold;
    transition: all 80ms ease-in-out;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
      box-shadow: 3px 3px 5px #32303168;
    }
    &:active {
      font-size: 1.5rem;
    }
  }
  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }

    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }
`;

export default Register;
