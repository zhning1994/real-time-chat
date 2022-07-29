import React from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';
import Logout from './Logout';

function Welcome({ currentUser }) {
  return (
    <Container>
      <Logout />
      <img src={Robot} alt="Welcome" />
      <h1>Welcome !</h1>
      <h3>Please select a chat to start.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #ffc857;
  }
`;

export default Welcome;
