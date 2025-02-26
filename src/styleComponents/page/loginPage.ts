import { Paper, TextField } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const ImageContainer = styled.div`
  flex: 1;
  background: url('https://img.lovepik.com/desgin_photo/40165/5752_detail.jpg');
  background-size: cover;
  background-position: center;
`;

export const FormContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 30px;
  text-align: center;
`;

export const FormWrapper = styled(Paper)`
  width: 100%;
  max-width: 400px;
  padding: 50px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputField = styled(TextField)`
  && {
    margin-bottom: 20px;
  }
`;

export const ButtonSignUp = styled.div`
  background-color: red;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: red;
    border: 1px solid black;
    color: black;
  }
  &:focus {
    outline: none;
  }
  margin: 10px;
`;

export const ButtonSignIn = styled.div`
  background-color: #3366CC;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #3366CC;
    border: 1px solid black;
    color: black;
  }
  &:focus {
    outline: none;
  }
  margin: 10px;
`;

export const ForgotPassword = styled.a`
  text-align: right;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    color: blue;
    cursor: pointer;
    text-decoration-style: solid;
  }
`;
