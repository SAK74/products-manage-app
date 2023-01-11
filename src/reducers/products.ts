import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import getItems, { ApiResponse, SearchParams } from "api/_axios";
import { ReduxState } from "store";
import { Product } from "types";
import qs from "qs";

export const fetchData = createAsyncThunk<
  ApiResponse,
  SearchParams | undefined,
  {
    state: ReduxState;
  }
>("products", async (params, { getState }) => {
  const { page: state_page, per_page: state_per_page } = getState().products;
  const requestParams: SearchParams = {
    page: params?.page ? params.page : state_page,
    per_page: params?.per_page ? params.per_page : state_per_page,
    id: params?.id,
  };
  const query = qs.stringify(requestParams);
  window.history.replaceState(requestParams, "", query);
  return await getItems(requestParams);
});

const productsAdapter = createEntityAdapter<Product>();
const initialState = productsAdapter.getInitialState<{
  status: "iddle" | "loading" | "success" | "error";
  error?: string;
  page: number;
  per_page: number;
  total: number;
}>({
  status: "iddle",
  page: 1,
  per_page: 5,
  total: -1,
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
      .addCase(
        fetchData.fulfilled,
        (state, { payload: { total, data, page, per_page } }) => {
          if (total) {
            state.total = total;
          }
          if (page) {
            state.page = page;
          }
          if (per_page) {
            state.per_page = per_page;
          }
          const productData = Array.isArray(data) ? data : [data];
          productsAdapter.setAll(state, productData);
        }
      )
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
export const { selectAll: selectAllProd } =
  productsAdapter.getSelectors<ReduxState>((state) => state.products);
