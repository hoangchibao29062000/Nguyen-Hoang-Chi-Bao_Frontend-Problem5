import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ObjectInitialState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ObjectInitialState = {
  data: null,
  loading: false,
  error: null,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<any>) {
      console.log(action.payload, "PAYLOD STORE");
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Actions
export const exampleActions = exampleSlice.actions;

// Selectors

// Reducer
const exampleReducer = exampleSlice.reducer;

export default exampleReducer;
