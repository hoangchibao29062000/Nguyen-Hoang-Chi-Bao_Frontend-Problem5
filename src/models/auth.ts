import { UserInfo } from "./user";

export interface AuthSignIn {
  username: string;
  passwrod: string;
}

export interface LoginFormInputs {
  username: string;
  password: string;
}


export interface SignInPayload {
  username: string,
  password: string
}

export interface AuthState {
  isSignIn: boolean;
  signing?: boolean;
  currentUser?: UserInfo
}