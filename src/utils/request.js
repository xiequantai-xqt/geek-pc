import axios from "axios";

export const baseURL = "http://geek.itheima.net";
const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 💥小小的改造，多解构了一个data，再返回
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
