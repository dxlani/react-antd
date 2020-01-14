/**
 * http配置
 */

import axios from 'axios'
import store from '../vuex/modules/login'
import { MessageBox,Message,  } from 'element-ui'
import router from '../router'

function buildHeader(): { [key: string]: string } {
    return {
        'Content-Type': 'application/json;charset=UTF-8;multipart/form-data'
    }
}

export let ax = axios.create({
    baseURL: host(),
    headers: buildHeader(),
    timeout: 60000,
    responseType: 'json',
    withCredentials: false,
    transformRequest: [
        function (data) {
            if (data instanceof FormData) return data
            return JSON.stringify(data)
        }
    ],
    transformResponse: [
        function (data) {
            if (data) {
                return data
            } else {
                let msg = 'Unknow Error'
                throw new Error(msg)
            }
        }
    ],
    // `onUploadProgress`允许处理上传的进度事件
    onUploadProgress: function (progressEvent) {
        // 使用本地 progress 事件做任何你想要做的
    },
    // `onDownloadProgress`允许处理下载的进度事件
    onDownloadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
    },
})

export function host(): string {
    if (window.location.hostname == "localhost" || window.location.hostname.indexOf('192.168') > -1) {
    //    return "/api/"                //代理
      return "http://192.168.2.32:5000/api/"  //刘飞
       //  return "http://192.168.2.107:5010/api/"  //相鹏
        //   return "http://192.168.2.105:5005/api/"  //胡庆伟
    } else {
        return "/api/"
    }
}

// http request 拦截器
ax.interceptors.request.use(
    config => {
        if (store.state.jwtToken) {
            config.headers.Authorization = `Bearer ${store.state.jwtToken}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
ax.interceptors.response.use(
    response => {
        if (!response.data.success) {
            switch(response.data.errorCode){
                case '10001': //未登录
                // router.push('/login');
                break;
                case '100004':
                MessageBox.alert('请先注册账号！', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        MessageBox.close();
                    }
                });
                // Message.warning('请先注册账号！')
                break;
                default:
                return Promise.reject(response.data.errorMessage)
              }
        }else{
            return response.data
        }
    },
    error => {
        if (error.response) {
            console.log('error',error)
          }
            MessageBox.alert('网络开小差了，请稍后重试', '提示', {
                confirmButtonText: '确定',
                type: 'warning',
                callback: action => {
                    MessageBox.close();
                }
            });
        //   Message.warning("网络开小差了，请稍后重试")
          // return Promise.reject(error.response.data)
    });

/* 手动取消请求的不显示报错 */
function handleError(err) {
    // 如果是手动取消的请求，不显示错误信息
    console.log("handleError1", err)
}

/* GET  */
export function Get<T>(url, data): Promise<any> {
    // `params`是要与请求一起发送的URL参数
    // 必须是纯对象或URLSearchParams对象
    return ax
        .get(url, {
            params: data
        })
        .then(res => {
            return res.data
        })
        .catch(err => {
            MessageBox.alert(`${err}`, '提示', {
                confirmButtonText: '确定',
                type: 'warning',
                callback: action => {
                    MessageBox.close();
                }
            });
            // Message.warning(err)
            handleError(err)
            throw err
        })
}

//下载excel
export function Download<T>(url, data) :Promise<any> {
    return axios({
        baseURL:host(),
        url:url,
        params:data,
        headers:{'Authorization':`Bearer ${store.state.jwtToken}`},
        method: 'get',
        responseType: 'blob'  //二进制流
    })
}


/* POST */
export function Post<T>(url, data): Promise<any> {
    return ax
        .post(url, data)
        .then(res => {
            return res.data 
        })
        .catch(err => {
            MessageBox.alert(`${err}`, '提示', {
                confirmButtonText: '确定',
                type: 'warning',
                callback: action => {
                    MessageBox.close();
                }
            });
            // Message.warning(err)
            handleError(err)
            throw err
        })
}
/* PUT */
export function Put<T>(url, data): Promise<any> {
    return ax
        .put(url, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            MessageBox.alert(`${err}`, '提示', {
                confirmButtonText: '确定',
                type: 'warning',
                callback: action => {
                    MessageBox.close();
                }
            });
            // Message.warning(err)
            handleError(err)
            throw err
        })
}
/* PATCH */
export function Patch<T>(url, data): Promise<any> {
    return ax
        .patch(url, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            MessageBox.alert(`${err}`, '提示', {
                confirmButtonText: '确定',
                type: 'warning',
                callback: action => {
                    MessageBox.close();
                }
            });
            // Message.warning(err)
            handleError(err)
            throw err
        })
}
/* DELETE */
export function Delete<T>(url, data): Promise<any> {
    return ax
        .delete(url, data)
        .then(res => {
            return res.data
        })
        .catch(err => {
            MessageBox.alert(`${err}`, '提示', {
                confirmButtonText: '确定',
                type: 'warning',
                callback: action => {
                    MessageBox.close();
                }
            });
            // Message.warning(err)
            handleError(err)
            throw err
        })
}

