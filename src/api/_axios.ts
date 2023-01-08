import axios, { AxiosRequestConfig } from "axios";
import { Product } from "types";

const url = "http://reqres.in/api/products";
const defaultConfig: AxiosRequestConfig = {
  url,
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
  return axios<ApiResponse>(defaultConfig)
    .then((resp) => resp.data)
    .catch((err: Error) => {
      throw new Error(err.message);
    });
}
