import {
    API_URL
} from '../constants/constants'
import axios from 'axios'

export const getAllSlide = () => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/slide/all`
    })
}
