import axios from 'axios'
import {
    API_URL
} from 'actions/constants/constants'
import axiosClient from 'actions/constants/axiosClient';
axios.defaults.baseURL = API_URL;
// const token = localStorage.getItem('token');
// const headers = { Authorization: `Bearer ${token}` }

// get
export const getProductListByCategoryAndSubcategory = (searchObject) => {
    return axios.get(`${API_URL}/api/product/danh-muc/${searchObject.category}/${searchObject.subcategory}?page=${searchObject.page}&keyword=${searchObject.keyword}&sortBy=${searchObject.sortBy}&sortValue=${searchObject.sortValue}&brand=${searchObject.brand}&price=${searchObject.price}`)
}
export const getProductList = (searchObject) => {
    return axios.get(`${API_URL}/api/product/search?page=${searchObject.page}&keyword=${searchObject.keyword}`)
}

// ds san pham ban chay
export const topSaleProduct = () => {
    return axios.get(`${API_URL}/api/product/top_sale`)
}


export const getProductByCategory = (searchObject) => {
    return axios.get(`${API_URL}/api/product/danh-muc/${searchObject.category}?page=${searchObject.page}&keyword=${searchObject.keyword}`)
}

export const getOneItem = (id) => {
    return axios.get(`${API_URL}/api/product/san-pham/${id}`);
}


// Get ds sap cung thuong hieu sp
export const getAllProductByBrand = (productId, brandCode) => {
    return axios.get(`${API_URL}/api/product/brand?productId=${productId}&brandCode=${brandCode}`);
}

// GET all SP theo thuong hieu
export const getAllProductByBrandCode = (searchObject) => {
    return axios.get(`${API_URL}/api/product/all/${searchObject.brandCode}?page=${searchObject.page}&keyword=${searchObject.keyword}&sortBy=${searchObject.sortBy}`);
}

// Get Thuowng hieu theo ma thuong hieu
export const getBrandByCode = (brandCode) => {
    return axios.get(`${API_URL}/api/brand/get-one/${brandCode}`);
}

// -------   SP Da Thich   --------

export const addLikeProduct = (data) => {
    return axiosClient({
        method: 'POST',
        url: `${API_URL}/api/liked/user`,
        data: data
    })
}

export const getProductLiked = (productId) => {
    return axiosClient({
        method: 'GET',
        url: `${API_URL}/api/liked/product?productId=${productId}`
    });
}

// get ds sp yeu thich
export const getListProductLiked = () => {
    return axiosClient({
        method: 'GET',
        url: `${API_URL}/api/liked/products`
    });
}

// bo thich san pham
export const deleteProductLiked = (productId) => {
    return axiosClient({
        method: 'DELETE',
        url: `${API_URL}/api/liked/user?productId=${productId}`
    })
}

// -------   SP Da XEM   --------

export const addViewedProduct = (data) => {
    return axiosClient({
        method: 'POST',
        url: `${API_URL}/api/viewed/add`,
        data: data
    })
}

// get ds sp yeu thich
export const getListProductViewedByUser = () => {
    return axiosClient({
        method: 'GET',
        url: `${API_URL}/api/viewed/products`
    });
}

// get ds sp pho bien nhat
export const getListProductMostPopular = () => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/viewed/most-popular`
    });
}