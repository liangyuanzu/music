import axios from 'axios';
import Vue from 'vue';
import defConfig from '@/config/config';

let count = 0;
axios.interceptors.request.use(
  (config: any) => {
    count += 1;
    (Vue as any).showLoading();
    return config;
  },
  (error: any) => {
    (Vue as any).hiddenLoading();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: any) => {
    count -= 1;
    if (count === 0) (Vue as any).hiddenLoading();
    return response;
  },
  (err: any) => {
    (Vue as any).hiddenLoading();
    const error = err;
    if (error && error.response) {
      switch (error.response.status) {
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = '请求错误,未找到该资源';
          break;
        case 500:
          error.message = error.response.data.message;
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      error.message = '连接到服务器失败';
    }

    return Promise.reject(error);
  }
);

const isPro = process.env.NODE_ENV === 'production';
export const $request = (url: string, Options?: any) =>
  new Promise((resolve, reject) => {
    axios({
      baseURL: isPro ? defConfig.baseURL : '/api',
      data: Options.data, // post 传参
      method: Options.method || 'GET',
      params: Options.params, // get 传参
      url,
      ...Options,
    })
      .then((res) => {
        if (res.data.code === 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

export const $requestAll = (list: any) =>
  new Promise((resolve, reject) => {
    axios
      .all(list)
      .then(
        axios.spread((...res) => {
          resolve(res);
        })
      )
      .catch((err) => {
        reject(err);
      });
  });
