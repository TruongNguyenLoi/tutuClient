import axios from 'axios'
import { API_URL } from '../constants/constants'
const headers = {
    token: process.env.REACT_APP_GHN_TOKEN,
    ShopId: process.env.REACT_APP_GHN_SHOPID
}


// địa chỉ
export const getListProvince = () => {
    return axios({
        method: 'GET',
        url:'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province',
        headers: headers
    })
}

export const getListDistrict = (province_id) => {
    return axios({
        method: 'GET',
        url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',
        params: { province_id: province_id },
        headers: headers
    })
}

export const getListWard = (district_id) => {
    
    return axios({
        method: 'GET',
        url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id',
       headers:headers
    })
}

// // tinh phí ship
// export const calculateShipFee = (data) => {
//     return axios({
//         method: 'POST',
//         url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
//         data: data,
//         headers: headers
//     })
// }

// tinh phí ship
export const calculateShipFee = (data) => {
    return axios({
        method: 'POST',
        url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
        data: data,
        headers: headers
    })
}

export const calculateShipFeeGHN = (params) => {
    const { from_district_id,service_id,service_type_id,to_district_id, to_ward_code, length, weight, width,  height } = params;
    return axios({
        method: 'GET',
        params: { from_district_id,service_id,service_type_id, to_district_id, to_ward_code, length, weight, width, height },
        url: `${API_URL}/api/services/ship/ghn/ship-fee`
    })
}

// tinh thoi gian du kien giao hang
export const calculateShipTime = (data) => {
    return axios({
        method: 'POST',
        url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime',
        data: data,
        headers: headers
    })
}

//tra cuu trang thai don hang
export const checkOrderInfoGHN = (data) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/services/ship/ghn/checkorderinfo`,
        params: { order_code: data }
    })
}