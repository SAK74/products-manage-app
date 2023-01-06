import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import getItems from "api/_axios";
import { Product } from "types";

const fetchData = createAsyncThunk("products", async () => {
  const result = (await getItems()).data;
  return Array.isArray(result) ? result : [result];
});

const productsAdapter = createEntityAdapter<Product>();
const initialState = productsAdapter.getInitialState<{
  status: "iddle" | "loading" | "success" | "error";
  error?: string;
}>({
  status: "iddle",
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
