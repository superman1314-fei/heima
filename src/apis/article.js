import axios from 'axios'

export const getPostList=(params)=>{
    return axios({
        url:'/post',
        params
    })
}