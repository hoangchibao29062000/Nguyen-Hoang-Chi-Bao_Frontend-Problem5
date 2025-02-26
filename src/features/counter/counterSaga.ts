import { delay, put, takeEvery } from "redux-saga/effects";
import { incrementSaga, incrementSagaSuccess } from "./counterSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleIncrementSaga(actions: PayloadAction<number>) {
    console.log("handle");
    yield delay(2000);
    console.log("success");

    yield put(incrementSagaSuccess(actions.payload))
}

export default function* counterSaga(){
    yield takeEvery(incrementSaga.toString(), handleIncrementSaga)
}