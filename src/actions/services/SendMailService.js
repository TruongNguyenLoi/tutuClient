import {
    API_URL
} from '../constants/constants'
import axios from 'axios'

export const sendMail = (data) => {
    return axios({
        method: 'POST',
        data: data,
        url: `${API_URL}/send-email`
    })
}