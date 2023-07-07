import {
    GET_ALL_BOOKS_SUCCESS,
    GET_ALL_CLOTHES_SUCCESS,
    GET_ALL_FOOD_SUCCESS,
    GET_ALL_LAPTOP_SUCCESS,
    GET_ALL_PHONE_SUCCESS,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS
} from '../actions/constants/constants'

const initialState = {
    products: [],
    books: [],
    clothes: [],
    foods: [],
    laptops: [],
    phones: [],
    totalProducts: 0,
    product: {},
    isFetching: false
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                products: [],
                isFetching: true
            }
        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products,
                totalProducts: action.totalProducts,
                isFetching: false
            }
        case GET_ALL_BOOKS_SUCCESS:
            return {
                ...state,
                books: action.books,
                isFetching: false
            }
        case GET_ALL_CLOTHES_SUCCESS:
            return {
                ...state,
                clothes: action.clothes,
                isFetching: false
            }
        case GET_ALL_LAPTOP_SUCCESS:
            return {
                ...state,
                laptops: action.laptops,
                isFetching: false
            }
        case GET_ALL_FOOD_SUCCESS:
            return {
                ...state,
                foods: action.foods,
                isFetching: false
            }
        case GET_ALL_PHONE_SUCCESS:
            return {
                ...state,
                phones: action.phones,
                isFetching: false
            }
        case GET_PRODUCT_BY_ID_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                product: action.payload,
                isFetching: false
            }
        default:
            return {
                ...state
            }
    }
}

export default productReducer;