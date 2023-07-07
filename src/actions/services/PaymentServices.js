import axios from 'axios'
import {API_URL} from 'actions/constants/constants'

export const getPaymentMethods = () => {
    return axios.get(`${API_URL}/api/payment-method`)
}