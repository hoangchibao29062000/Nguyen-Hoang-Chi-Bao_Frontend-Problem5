import exampleApi from 'api/exampleApi';
import { ListDataResponse, UserInfo } from 'models';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { exampleActions } from './exampleSlice';

function* exampleFlow() {
  try {
    yield take(exampleActions.fetchDataStart.type);
    yield delay(5000)
    const actionSignIn: ListDataResponse<UserInfo> = yield call(exampleApi.getListUser);
    yield put(exampleActions.fetchDataSuccess(actionSignIn));
  } catch (error) {}
}

export default function* exampleSaga() {
  yield fork(exampleFlow);
}
