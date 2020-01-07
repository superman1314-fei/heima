//文件上传api
import axios from 'axios'

export const uploadFile = (data)=>{
    return axios ({
        method:'post',
        url :'/upload',
        data
    })
}