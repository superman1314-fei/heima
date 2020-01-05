import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:3000";
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // 判断是否有token值
    let token = localStorage.getItem('heima_token')
    // console.log(config);
    // console.log(token);
    
    if(token){
        config.headers.Authorization = token
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // 响应用户信息是否登录失败 如果验证失败就跳转到登录页
        if(response.data.message==="用户信息验证失败" || response.data.message==="用户信息验证失败!"){
            window.location.href='#/login'
        }
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default axios;
