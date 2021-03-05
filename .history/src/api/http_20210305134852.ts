import axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";

// create an axios instance
const service = axios.create({
  baseURL: "http://192.168.2.116:3000/api/", // 根据项目设置 url = base url + request url
  responseType: "json",
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    console.log("请求配置", config);
    return config;
  },

  (error) => {
    // do something with request error
    console.log(error, "error"); // for debug
    // return Promise.reject(error)
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log("请求成功", res);
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      ElMessage({
        message: res.message,
        type: "error",
        duration: 5 * 1000,
      });
    } else {
      return res;
    }
  },
  (error) => {
    console.log("请求失败", error);
    if (error.message == "Request failed with status code 401") {
      ElMessage({
        type: "error",
        message: "登陆失效,请从新登陆",
      });
    } else if (error.message == "Request failed with status code 500") {
      ElMessage({
        type: "error",
        message: "网络连接出错，请稍后再试！",
      });
    } else {
      ElMessage({
        message: error.message,
        type: "error",
        duration: 5 * 1000,
      });
      return Promise.reject(error);
    }
  }
);

export default service;
