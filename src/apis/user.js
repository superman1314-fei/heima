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