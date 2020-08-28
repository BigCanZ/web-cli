import axios from 'axios'
// import store from '@/store'

// 1. 创建axios实例
const service = axios.create({
  // url基础地址，解决不同数据源url变化问题
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // 跨域时若要发送cookies需设置该选项
  timeout: 5000 // 超时
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    /**
     * 处理请求内容
     * 自定义headers,参数加密及加签等
     */

    return config
  },
  (error) => {
    // 请求错误预处理
    // console.log(error) // for debug

    return Promise.reject(error)
  }

)

// 响应拦截
service.interceptors.response.use(
  // 通过自定义code判定响应状态，也可以通过HTTP状态码判定
  (response) => {
    /**
     * 请求返回信息处理
     * 获取headers参数, 错误信息处理等
     */

    return response
  },
  (error) => {
    // console.log("err" + error); // for debug
    return Promise.reject(error)
  }
)

export default service
