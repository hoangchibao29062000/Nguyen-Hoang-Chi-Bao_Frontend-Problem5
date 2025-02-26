// import authSaga from 'features/auth/authSaga';
import authSaga from 'features/auth/authSaga';
import counterSaga from 'features/counter/counterSaga';
import exampleSaga from 'features/example/exampleSaga';
import productSaga from 'features/Home/homeSaga';
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([counterSaga(), exampleSaga(), productSaga(), authSaga()])
}