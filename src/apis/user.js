import axios from '../utils/myaxios'
export const login=(data)=>{
    return axios({
        method:'post',
        url:'/login',
        data
    })
}
export const getUserById = (id)=>{
    return axios({
        method:'get',
        url:`/user/${id}`,  //给个id
      
    })
}