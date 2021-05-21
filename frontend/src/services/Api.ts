import axios from "axios";
import AuthService from "src/services/AuthService";

// import config from '../config'

axios.defaults.headers.post["Content-Type"] = "application/json";

let api = axios.create();

export const get = async (url: string, params: any) => {

  try {  
    /* pour les paramètre de liens */
    let param = params ? `?` : "";
    param +=
      (params &&
        params.where
          .map((item: any) => `${item.name}=${item.value}`)
          .join("&")) ||
      "";
    param +=
      params && params.order
        ? `&order[${params.order["name"]}]=${params.order["by"]}`
        : "";
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    };
  
    return await api.get(`/${url}${param}`, headers);
  } catch (err) {
    console.log(" hehehehooo");
    return err.response;
  }
};

export const post = async (url: string, params: any) => {
  try {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    };
    return await api.post(`/${url}`, params, headers);
  } catch (err) {
    return err.response;
  }
};

export const del = async (url: string, id: any) => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AuthService.getAccessToken()}`,
    },
  };
  try {
    return await api.delete(`/${url}/${id}`, headers);
  } catch (err) {
    return err.response;
  }
};

export const put = async (url: string, params: any) => {
  try {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    };
    return await api.put(`/${url}/${params.id}`, params, headers);
  } catch (err) {
    return err.response;
  }
};

export const patch = async (url: string, params: any) => {
  try {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    };
    return await api.patch(`/${url}/${params.id}`, params, headers);
  } catch (err) {
    return err.response;
  }
};
