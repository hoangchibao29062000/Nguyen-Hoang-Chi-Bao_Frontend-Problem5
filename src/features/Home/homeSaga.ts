import { ListDataResponse, IProduct, DataResponse } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import productApi from 'api/productApi';
import { commonActions } from 'features/common/commonSlice';
import { productActions } from './homeSlice';
import { IUnit } from 'models/unit';
import { IPlatform } from 'models/platform';
import { IConfig } from 'models/config';
import { IShipping } from 'models/shipping';

function* handleGetListPlatform() {
  try {
    const actionGetListPlatform: ListDataResponse<IPlatform> = yield call(productApi.getListPlatform);
    if (actionGetListPlatform.status >= 400) {
      yield put(productActions.getListPlatformFailed(actionGetListPlatform));
    } else {
      yield put(productActions.getListPlatformSuccess(actionGetListPlatform));
    }
  } catch (error) {
    yield put(commonActions.commonToast(error));
  }
}

function* handleGetListConfig() {
  try {
    const actionGetListConfig: ListDataResponse<IConfig> = yield call(productApi.getLisConfig);
    if (actionGetListConfig.status >= 400) {
      yield put(productActions.getListConfigFailed(actionGetListConfig));
    } else {
      yield put(productActions.getListConfigSuccess(actionGetListConfig));
    }
  } catch (error) {
    yield put(commonActions.commonToast(error));
  }
}

function* handleGetListShipping() {
  try {
    const actionGetListShipping: ListDataResponse<IShipping> = yield call(productApi.getListShipping);
    if (actionGetListShipping.status >= 400) {
      yield put(productActions.getListShippingFailed(actionGetListShipping));
    } else {
      yield put(productActions.getListShippingSuccess(actionGetListShipping));
    }
  } catch (error) {
    yield put(commonActions.commonToast(error));
  }
}

function* handleGetListUnit() {
  try {
    const actionGetListUnit: ListDataResponse<IUnit> = yield call(productApi.getListUnit);
    if (actionGetListUnit.status >= 400) {
      yield put(productActions.getListUnitFailed(actionGetListUnit));
    } else {
      yield put(productActions.getListUnitSuccess(actionGetListUnit));
    }
  } catch (error) {
    yield put(commonActions.commonToast(error));
  }
}

function* handleGetListProduct() {
  try {
    const actionGetListProduct: ListDataResponse<IProduct> = yield call(productApi.getListProduct);
    if (actionGetListProduct.status >= 400) {
      yield put(productActions.getListFailed(actionGetListProduct));
    } else {
      yield put(productActions.getListSuccess(actionGetListProduct));
    }
  } catch (error) {
    yield put(commonActions.commonToast(error));
  }
}

function* handleSaveProduct(action: ReturnType<typeof productActions.callSaveSuccess>) {
  try {
    const response: DataResponse<IProduct | any> = yield call(productApi.saveProduct, action.payload);
    if (response.status >= 400) {
      yield put(productActions.saveFailed(response));
    } else {
      yield put(productActions.saveSuccess(response));
    }

  } catch (error) {
    yield put(commonActions.commonToast(error));
  }
}

function* handleDeleteProduct(action: ReturnType<typeof productActions.callSaveSuccess>) {
  try {
    const response: DataResponse<IProduct | any> = yield call(productApi.deleteProduct, action.payload);
    if (response.status >= 400) {
      yield put(productActions.deleteFailed(response));
    } else {
      yield put(productActions.deleteSuccess({ ...response, data: action.payload }));
    }
  } catch (error) {
    yield put(commonActions.commonToast(error));
  }
}

export default function* productSaga() {
  //Get
  yield takeLatest(productActions.callListUnitSuccess.type, handleGetListUnit);
  yield takeLatest(productActions.callListSuccess.type, handleGetListProduct);
  yield takeLatest(productActions.callListPlatformSuccess.type, handleGetListPlatform);
  yield takeLatest(productActions.callListConfigSuccess.type, handleGetListConfig);
  yield takeLatest(productActions.callListShippingSuccess.type, handleGetListShipping);

  // Post
  yield takeLatest(productActions.callSaveSuccess.type, handleSaveProduct);
  yield takeLatest(productActions.callDeleteSuccess.type, handleDeleteProduct);
}
