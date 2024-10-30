import axiosRoot from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

export const setAuthToken = (token: any) => {
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};

export const getAll = async (url: string) => {
  const { data } = await axios.get(`/${url}`);
  return data.items;
};

export const getById = async (url: string) => {
  const { data } = await axios.get(`/${url}`);
  return data;
};

export const post = async (url: string, { arg: body }: any) => {
  const { data } = await axios.post(`/${url}`, body);
  return data;
};

export const updateById = async (url: string, { arg: body }: any) => {
  const response = await axios.put(`/${url}`, body);
  return response.data;
};

export const deleteById = async (url: string, { arg: id }: any) => {
  await axios.delete(`/${url}/${id}`);
};
