import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toastNoti } from 'helper/toast.helper';
import { AuthState, DataResponse, SignInPayload, UserInfo } from 'models';

const initialState: AuthState = {
  isSignIn: false,
  signing: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<SignInPayload>) {
      state.signing = false;
    },
    signInSuccess(state, action: PayloadAction<DataResponse<UserInfo>>) {
      state.signing = true;
      state.isSignIn = true;
      state.currentUser = action.payload.data;
      toastNoti(action.payload.message, 200);
    },
    signInFailed(state, action: PayloadAction<DataResponse<UserInfo>>) {
      state.signing = false;
      toastNoti(action.payload.message, 400);
    },

    signOut(state) {
      state.signing = false;
      state.isSignIn = false;
      state.currentUser = undefined;
      toastNoti("Đăng xuất thành công", 200);
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsSignIn = (state: any) => state.auth.isSignIn;
export const selectSigning = (state: any) => state.auth.signing;

// Reducer
const authReducer = authSlice.reducer;

export default authReducer;
