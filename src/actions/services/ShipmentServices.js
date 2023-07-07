import axios from 'axios'
import {API_URL} from 'actions/constants/constants'

export const getShipMethods = () => {
    return axios.get(`${API_URL}/api/shipment`)
}