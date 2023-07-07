import axios from 'axios'
import { API_URL } from '../constants/constants'

export const calculateShipFeeGHTK = (params) => {
    const {pick_province, pick_district, province, district, weight, deliver_option, value} = params;
    return axios({
        method: 'GET',
        params: {pick_province, pick_district, province, district, weight, deliver_option, value},
        url: `${API_URL}/api/services/ship/ghtk/ship-fee`
    })
}