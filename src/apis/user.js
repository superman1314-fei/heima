import axios from '../utils/myaxios'
//登录的aip
export const login=(data)=>{
    return axios({
        method:'post',
        url:'/login',
        data
    })
}
//用户详情的aip
export const getUserById = (id)=>{
    return axios({
        method:'get',
        url:`/user/${id}`,  //给个id
      
    })
}
//编辑用户信息api
export const getUpDateById = (id,data)=>{
    return axios ({
        method:'post',
        url:`/user_update/${id}`,
        data
    })
}
//注册用户
export const register = (data)=>{
    return axios ({
        method:'post',
        url:'/register',
        data
    })
}