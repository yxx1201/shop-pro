/**
 * 封装接口
 */
// 导入请求函数
import $axios from "./axios";
const baseUrl = '/showApi'
/**
 * 获取商品也列表
 * @param {Object} data
 * @returns promise
 */
export const getGoods = (data) => $axios(baseUrl + '/goodList', 'GET', data)

export const getTypeOne = (data) => $axios(baseUrl + '/getTypeOne', 'GET', data)

export const getBanner = (data) => $axios(baseUrl + '/banner', 'GET', data)

export const Register = (data) => $axios(baseUrl + '/register', "GET", data)

export const Login = (data) => $axios(baseUrl + '/login', "GET", data)

export const Detail = (data) => $axios(baseUrl + '/detail', "GET", data)

export const Search = (data) => $axios(baseUrl + '/search', "GET", data)

export const Add = (data) => $axios(baseUrl + '/add', "GET", data)

export const Remove = (data) => $axios(baseUrl + '/remove', "GET", data)

export const Delete = (data) => $axios(baseUrl + '/del', "GET", data)

export const SameList = (data) => $axios(baseUrl + '/sameList', "GET", data)

export const ShopList = (data) => $axios(baseUrl + '/shopList', "GET", data)
