import axios from 'axios'
import {API_URL} from 'actions/constants/constants'
import axiosClient from 'actions/constants/axiosClient';

const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

// Danh sách các bình luận sản phẩm
export const getAllCommentByProductId = (productId) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/comment/product/search?productId=${productId}`,
        headers: headers
    })
}

// Danh sách các bình luận sản phẩm
export const getAllCommentByUser = () => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/comment/user`,
        headers: headers
    })
}

export const addComment = (data) => {
    return axiosClient({
        method: "POST",
        data: data,
        url: `${API_URL}/api/comment`
    })
}