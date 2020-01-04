import axios from '../utils/myaxios'
export const login=(data)=>{
    return axios({
        method:'post',
        url:'/login',
        data
    })
}