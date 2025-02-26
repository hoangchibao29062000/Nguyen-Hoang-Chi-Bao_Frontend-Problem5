import { DataResponse, LoginFormInputs, UserInfo } from 'models';
import { authActions } from './authSlice';
import { call, take, fork, put, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/auth';
import { RootState } from 'app/store';
import { commonActions } from 'features/common/commonSlice';
import { push } from 'redux-first-history';

function* handleSignIn(payload: LoginFormInputs) {
  try {
    const actionSignIn: DataResponse<UserInfo> = yield call(authApi.signIn, payload);
    
    if (actionSignIn.status > 200) {
      yield put(authActions.signInFailed(actionSignIn));
    } else {
      yield put(authActions.signInSuccess(actionSignIn));
      localStorage.setItem('access_token', actionSignIn.data.access_token);
      localStorage.setItem('refresh_token', actionSignIn.data.refresh_token);
      yield put(push("/example"));
    }
  } catch (error) {
    yield put(commonActions.commonToast(error));
  }
}

function* handleSignOut() {
  yield put(authActions.signOut());
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginFormInputs> = yield take(authActions.signIn.type);
      yield fork(handleSignIn, action.payload);
    }
    const state: RootState = yield select((state: RootState) => state);
    if (state.auth.signing) {
      yield take(authActions.signOut.type);
      yield call(handleSignOut);
    }
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
