import axios from 'axios'

function buildHeader(){
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
    },
})

export function host(){
    if (window.location.hostname == "localhost" || window.location.hostname.indexOf('192.168') > -1) {
        return "/api/"                //代理
    //  return "http://192.168.2.32:5000/api/"  //刘飞
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
                break;
                case '100004':
                MessageBox.alert('请先注册账号！', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    callback: action => {
                        MessageBox.close();
                    }
                });
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
export function Get(url, data){
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
            handleError(err)
            throw err
        })
}

//下载excel
export function Download(url, data){
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
export function Post(url, data){
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
            handleError(err)
            throw err
        })
}
/* PUT */
export function Put(url, data){
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
            handleError(err)
            throw err
        })
}
/* PATCH */
export function Patch(url, data){
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
            handleError(err)
            throw err
        })
}
/* DELETE */
export function Delete(url, data){
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
            handleError(err)
            throw err
        })
}

