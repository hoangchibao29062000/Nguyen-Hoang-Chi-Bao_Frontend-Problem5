import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { toastNoti } from 'helper/toast.helper';
import { ListDataResponse, IProduct, IProductState, DataResponse } from 'models';
import { IConfig } from 'models/config';
import { IPlatform } from 'models/platform';
import { IShipping } from 'models/shipping';
import { IUnit } from 'models/unit';

const initialState: IProductState = {
  success: true,
  saveProduct: undefined,
  listProduct: [],
  listUnit: [],
  listPlatform: [],
  listShipping: [],
  listConfig: []
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    callListSuccess(state) { },
    getListSuccess(state, action: PayloadAction<ListDataResponse<IProduct>>) {
      state.listProduct = action.payload.data[0];
      console.log(state.listProduct, "state.listProduct")
      // toastNoti(action.payload.message, 200);
    },
    getListFailed(state, action: PayloadAction<ListDataResponse<IProduct>>) {
      state.success = false;
      toastNoti(action.payload.message, 400);
    },

    // Đơn vị
    callListUnitSuccess(state) { },
    getListUnitSuccess(state, action: PayloadAction<ListDataResponse<IUnit>>) {
      state.listUnit = action.payload.data[0];
    },
    getListUnitFailed(state, action: PayloadAction<ListDataResponse<IUnit>>) {
      state.success = false;
    },

    // Nền tản
    callListPlatformSuccess(state) { },
    getListPlatformSuccess(state, action: PayloadAction<ListDataResponse<IPlatform>>) {
      state.listPlatform = action.payload.data[0];
    },
    getListPlatformFailed(state, action: PayloadAction<ListDataResponse<IPlatform>>) {
      state.success = false;
    },

    callListConfigSuccess(state) { },
    getListConfigSuccess(state, action: PayloadAction<ListDataResponse<IConfig>>) {
      state.listConfig = action.payload.data[0];
    },
    getListConfigFailed(state, action: PayloadAction<ListDataResponse<IConfig>>) {
      state.success = false;
    },

    callListShippingSuccess(state) { },
    getListShippingSuccess(state, action: PayloadAction<ListDataResponse<IShipping>>) {
      state.listShipping = action.payload.data[0];
    },
    getListShippingFailed(state, action: PayloadAction<ListDataResponse<IShipping>>) {
      state.success = false;
    },

    callSaveSuccess(state, action: PayloadAction<IProduct>) { },
    saveSuccess(state, action: PayloadAction<DataResponse<IProduct>>) {
      // Tìm và thay thế hoặc thêm mới
      const index = current(state.listProduct).findIndex((item: IProduct) => item.id === action.payload.data.id);
      if (index !== -1) {
        // Nếu tồn tại, thay thế
        state.listProduct[index] = action.payload.data;
      } else {
        // Nếu không tồn tại, thêm mới
        state.listProduct.push(action.payload.data);
      }
      toastNoti(action.payload.message, 200);
    },
    saveFailed(state, action: PayloadAction<DataResponse<IProduct>>) {
      state.success = false;
      toastNoti(action.payload.message, 400);
    },

    callDeleteSuccess(state, action: PayloadAction<any>) { },
    deleteSuccess(state, action: PayloadAction<DataResponse<IProduct>>) {
      const index = current(state.listProduct).findIndex((item: IProduct) => item.id === action.payload.data.id);
      if (index !== -1) {
        state.listProduct.splice(index, 1);
      }
      toastNoti(action.payload.message, 200);
    },
    deleteFailed(state, action: PayloadAction<DataResponse<IProduct>>) {
      state.success = false;
      toastNoti(action.payload.message, 400);
    },
  },

});

// Actions
export const productActions = productSlice.actions;

// Selectors
export const selectIsSignIn = (state: any) => state.product.success;

// Reducer
const productReducer = productSlice.reducer;

export default productReducer;
