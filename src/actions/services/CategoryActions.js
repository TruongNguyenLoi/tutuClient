import {
    API_URL
} from '../constants/constants'
import axios from 'axios'

export const getAllCategory = () => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/category`
    })
}

export const getOneCategoryByCode = (code) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/category/get?code=${code}`
    })
}

export const getAllsubCategory = () => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/subcategory`
    })
}

// get ds thuong hieu theo danh muc

export const getAllBrandByCategoryCode = (category) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/brand/category?category=${category}`
    })
}