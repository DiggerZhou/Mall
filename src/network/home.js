import {request} from "./require"

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}

export function getHomeGoodsData(type, page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}