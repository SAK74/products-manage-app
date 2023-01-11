import axios, { AxiosRequestConfig } from "axios";
import { Product } from "types";

// const SERVER = "http://reqres.in/api"; // default
const SERVER = "https://simple-server-sage.vercel.app"; // VERCEL
// const SERVER = "http://192.168.0.55:4000"; // local
const defaultConfig: AxiosRequestConfig = {
  baseURL: SERVER,
  url: "/products",
};

interface PageParams {
  page?: number;
  per_page?: number;
}

export interface ApiResponse extends PageParams {
  total?: number;
  total_pages?: number;
  data: Product | Product[];
}

export interface SearchParams extends PageParams {
  id?: number;
}

export default function getItems(params?: SearchParams) {
  if (params) {
    defaultConfig.params = params;
  }
  return axios
    .request<ApiResponse>(defaultConfig)
    .then((resp) => resp.data)
    .catch((err: Error) => {
      throw new Error(err.message);
    });
}
