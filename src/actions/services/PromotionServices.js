import {
    API_URL
} from '../constants/constants'
import axios from 'axios'

export const getAllPromotion = () => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/promotion/all`
    })
}
