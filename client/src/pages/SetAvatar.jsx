import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes.js";
import axios from "axios";
import { Buffer } from "buffer";

function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    async function checkUser() {
      if (!localStorage.getItem("chat-app-user")) navigate("/login");
    }
    checkUser();
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    async function fetchAvatar() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }

    fetchAvatar();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <div
            className="loader__wrap"
            role="alertdialog"
            aria-busy="true"
            aria-live="polite"
            aria-label="Loading…">
            <div className="loader" aria-hidden="true">
              <div className="loader__sq"></div>
              <div className="loader__sq"></div>
            </div>
          </div>
        </Container>
      ) : (
        // <Container>
        //   <img src={loader} alt="loading" className="loader" />
        // </Container>
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}>
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile Pic
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  .loader__wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1;
    background-color: #2c294f;
  }

  .loader {
    --sz: 7rem;
    width: calc(var(--sz) * 2);
    height: var(--sz);
    margin: auto;
    display: flex;
    justify-content: space-evenly;
  }

  .loader__sq {
    --p-sz: calc(var(--sz) / 4);
    --m-offset: calc((var(--p-sz) * -1) * 0.75);
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: space-evenly;
    height: 100%;
    width: 50%;
  }
  .loader__sq::before,
  .loader__sq::after {
    width: var(--p-sz);
    height: var(--p-sz);
    content: "";
    position: relative;
    transform: translateY(calc((var(--sz) - var(--p-sz)) * -1));
    animation: loader-box-bounce 0.5s cubic-bezier(0.3, 0.5, 0.4, 0.95)
      calc(var(--i) * 0.06s) infinite alternate-reverse;
  }
  .loader__sq:first-of-type {
    margin-right: var(--m-offset);
  }
  .loader__sq:first-of-type::before {
    --i: 1;
    border: 3px solid #ff7ab5;
    border-radius: 50%;
  }
  .loader__sq:first-of-type::after {
    --i: 3;
    background-color: #c643fb;
  }
  @supports ((-webkit-clip-path: circle()) or (clip-path: circle())) {
    .loader__sq:first-of-type::after {
      -webkit-clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
      clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    }
  }
  .loader__sq:nth-of-type(2)::before {
    --i: 2;
    border: 3px solid #ffb650;
  }
  .loader__sq:nth-of-type(2)::after {
    --i: 4;
    background-color: #2fe2dd;
    border-radius: 50%;
  }
  @supports ((-webkit-clip-path: circle()) or (clip-path: circle())) {
    .loader__sq:nth-of-type(2)::after {
      border-radius: 0;
      -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }
  }

  @-webkit-keyframes loader-box-bounce {
    to {
      transform: translateY(0);
    }
  }

  @keyframes loader-box-bounce {
    to {
      transform: translateY(0);
    }
  }

  // general page styles
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #323031;
  height: 100vh;
  width: 100vw;

  .title-container {
    h1 {
      color: #ffc857;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s ease-in-out;
      cursor: pointer;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #db3a34;
    }
  }

  .submit-btn {
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
`;

export default SetAvatar;
