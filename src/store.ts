import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import products from "reducers/products";

export const store = configureStore({
  reducer: {
    products,
  },
});

export type ReduxState = ReturnType<typeof store.getState>;
export const useReduxDispatch = useDispatch<typeof store.dispatch>;
export const useReduxSelector: TypedUseSelectorHook<ReduxState> = useSelector;
