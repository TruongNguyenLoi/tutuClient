import axiosClient from 'actions/constants/axiosClient';
// import axios from 'axios'
import { API_URL } from '../constants/constants'

// const token = localStorage.getItem('token');
// const headers = { Authorization: `Bearer ${token}` }

export const getAllOrderByUser = () => {
    return axiosClient({
        method: 'GET',
        url: `${API_URL}/api/order/user`
    })
}

export const addOrder = (order) => {
    return axiosClient({
        method: 'POST',
        url: `${API_URL}/api/order`,
        data: order
    })
}

export const checkTradingCode = (tradingCode) => {
    return axiosClient({
        method: 'GET',
        url: `${API_URL}/api/order/checkCode?tradingCode=${tradingCode}`
    })
}

export const getDetailOrderById = (id) => {
    return axiosClient({
        method: 'GET',
        url: `${API_URL}/api/order/detail-full/${id}`
    })
}

export const getDetailOrderByIdAfterPayment = (id) => {
    return axiosClient({
        method: 'GET',
        url: `${API_URL}/api/order/chi-tiet/${id}`
    })
}

export const cancelOrder = (id) => {
    return axiosClient({
        method: 'PUT',
        url: `${API_URL}/api/order/cancel/${id}`
    })
}

export const updateStatusPayment = (data) => {
    return axiosClient({
        method: 'PUT',
        url: `${API_URL}/api/order/pay-success/${data.order_id}`,
        data: data
    })
}

export const updateStatusSendMail = (id) => {
    return axiosClient({
        method: 'PUT',
        url: `${API_URL}/api/order/send-email/${id}`,
    })
}