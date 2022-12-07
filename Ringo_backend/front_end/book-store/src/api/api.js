import axios from 'axios';

let local_host = 'http://127.0.0.1:8000'
//获取物品类别信息
export const queryCategorygoods = params => { return axios.get(`${local_host}/indexgoods/`) }

//获取物品类别信息
export const getCategory = params => {
  if('id' in params){
    return axios.get(`${local_host}/categories/`+params.id+'/');
  }
  else {
    return axios.get(`${local_host}/categories/`, params);
  }
};


//获取需求列表(all)
export const getGoods = params => { return axios.get(`${local_host}/goods/`, { params: params }) }

//物品详情
export const getGoodsDetail = goodId => { return axios.get(`${local_host}/goods/${goodId}`+'/') }

//登录
export const login = params => {
  return axios.post(`${local_host}/login/`, params)
}

//注册

export const register = parmas => { return axios.post(`${local_host}/users/`, parmas) }

//短信
export const getMessage = parmas => { return axios.post(`${local_host}/code/`, parmas) }

//获取用户信息
export const getUserDetail = () => { return axios.get(`${local_host}/users/`) }

//修改信息
export const updateUserInfo = params => { return axios.patch(`${local_host}/users/${userid}`, params) }

//添加需求
export const addNeeds = params => {return axios.post(`${local_host}/needs/`, params)}

//删除需求
export const delNeeds  = addressId => {return axios.delete(`${local_host}/needs/`+addressId+'/')}

//修改需求
export const updateNeeds  = (addressId, params) => {return axios.patch(`${local_host}/needs/`+addressId+'/', params)}

//获取需求
export const getNeeds  = () => {return axios.get(`${local_host}/needs/`)}

//添加提供
export const addOffering = params => {return axios.post(`${local_host}/offerings/`, params)}

//删除需求
export const delOffering = addressId => {return axios.delete(`${local_host}/offerings/`+addressId+'/')}

//修改需求
export const updateOffering = (addressId, params) => {return axios.patch(`${local_host}/Offerings/`+addressId+'/', params)}

//获取需求
export const getOffering = () => {return axios.get(`${local_host}/offerings/`)}