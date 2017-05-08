import axios from 'axios';

let valToken = '';
export const http = axios.create({
  baseURL: 'http://www.yiyexy.com/servlet/',
  timeout: 5000,
  withCredentials: true, // 允许跨域 cookie
  headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json', 'Authorization':'Bearer '+ valToken}
});


// get
export const _get = (req) => {
  return http.get(req.url, {params: req.data})
}

// put
export const _put = (req) => {
  return http({ method: 'put', url: `/${req.url}`, data: req.data })
}

// post
export const _post = (req) => {
  return http({ method: 'post', url: `/${req.url}`, data: req.data })
}

// delete
export const _delete = (req) => {
  return http({ method: 'delete', url: `/${req.url}`, data: req.data })
}
