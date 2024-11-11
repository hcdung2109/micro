import axios from "axios";
import { store } from "@/store";
import jwtdecode from "jwt-decode";
import menu from "../utils/menu";

// default
const baseUrl = import.meta.env.VNPT_API;
const TOKEN_KEY = "VNPT-Token";

axios.defaults.baseURL = baseUrl;
axios.defaults.headers = {
  "Content-Type": "application/json",
  "Token-id": "97388db0-6ce9-11ea-bc55-0242ac130003",
  "Mac-address": "WEB",
};
// doing something with the request

axios.interceptors.request.use((request) => {
  var config = {};
  if (request.config) {
    config = request.config;
  }
  config.start = Date.now();
  request.config = config;

  //var token = store.getters['user/accessToken']
  var token = localStorage.getItem("VNPT-Token")
    ? localStorage.getItem("VNPT-Token")
    : null;
  if (token) {
    let access_token = JSON.parse(localStorage.getItem(TOKEN_KEY));
    request.headers.Authorization = `Bearer ${access_token.access_token}`;
    request.headers.SelectedMenuId = menu.getCurrentMenuItemID();
    request.headers.SelectedPath = menu.getCurrentPath();
  }
  return request;
});

// doing something with the response
axios.interceptors.response.use(
  (response) => {
    const now = Date.now();
    console.info(
      `Api Call ${response.config.url} took ${
        now - response.config.config.start
      }ms`
    );
    // all 2xx/3xx responses will end here
    return response;
  },
  (error) => {
    // all 4xx/5xx responses will end here
    try {
      const Vue = require("vue");

      if (error.response && error.response.status === 401) {
        Vue.default.$toast.error(
          "Có lỗi xác thực phân quyền khi thực hiện chức năng. Nếu lỗi này lặp lại, vui lòng thử đăng xuất và đăng nhập lại."
        );
      }
    } catch (e) {}

    //return Promise.reject(error);
    return Promise.reject(error.response);
  }
);

export default axios;
