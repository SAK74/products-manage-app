import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import getItems, { SearchParams } from "api/_axios";
import { ReduxState } from "store";
import { Product } from "types";

export const fetchData = createAsyncThunk(
  "products",
  async (params?: SearchParams) => {
    const result = (await getItems(params)).data;
    return Array.isArray(result) ? result : [result];
  }
);

const productsAdapter = createEntityAdapter<Product>();
const initialState = productsAdapter.getInitialState<{
  status: "iddle" | "loading" | "success" | "error";
  error?: string;
  page: number;
  per_page: number;
}>({
  status: "iddle",
  page: 1,
  per_page: 5,
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
export const { selectAll: selectAllProd } =
  productsAdapter.getSelectors<ReduxState>((state) => state.products);
