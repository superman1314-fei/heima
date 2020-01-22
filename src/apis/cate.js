import axios from 'axios'

export const getCatePost=()=>{
    return axios({
        url:'/category'
    })
}