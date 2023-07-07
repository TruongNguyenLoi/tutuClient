import {
    API_URL,
    GET_ALL_BOOKS_SUCCESS,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS
} from '../constants/constants'
import axios from 'axios'
axios.defaults.baseURL = API_URL;


export const getProductsByCategory = (searchObject, category, subcategory) => dispatch => {
    dispatch({
        type: GET_ALL_PRODUCTS_REQUEST
    })
    axios.get(`/api/product/danh-muc/${category}/${subcategory}?page=${searchObject.page}&limit=${searchObject.limit}&keyword=${searchObject.keyword}`)
        .then((res) => {
            dispatch({
                type: GET_ALL_PRODUCTS_SUCCESS,
                products: res.data.content,
                totalProducts: res.data.totalElements,
            })
        })
        .catch((err) => console.log(err));
}

export const getBooks = (searchObject) => dispatch => {
    dispatch({
        type: GET_ALL_PRODUCTS_REQUEST
    })
    axios.get(`/api/product/danh-muc/sach?page=${searchObject.page}&limit=${searchObject.limit}&keyword=${searchObject.keyword}`)
        .then((res) => {
            dispatch({
                type: GET_ALL_BOOKS_SUCCESS,
                books: res.data.content,
                totalBooks: res.data.totalElements,
            })
        })
        .catch((err) => console.log(err));
}
export const searchProductByKeyword = (searchObject) => dispatch => {
    dispatch({
        type: GET_ALL_PRODUCTS_REQUEST
    })
    axios.get(`/api/product/search?page=${searchObject.page}&limit=${searchObject.limit}&keyword=${searchObject.keyword}`)
        .then((res) => {
            dispatch({
                type: GET_ALL_PRODUCTS_SUCCESS,
                products: res.data.content,
                totalProducts: res.data.totalElements,
            })
        })
        .catch((err) => console.log(err));
}

export const getProductById = (id) => dispatch => {
    dispatch({
        type: GET_PRODUCT_BY_ID_REQUEST
    })
    axios.get(`/api/product/san-pham/${id}`)
        .then((res) => {
            dispatch({
                type: GET_PRODUCT_BY_ID_SUCCESS,
                payload: res.data
            })
        })
        .catch((err) => console.log(err));
}