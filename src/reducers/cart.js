import * as types from '../actions/constants/constants'

const initialState = {
    message: '',
    cartInfo: {},
    cart: {},
    cartSelected: {},
    isFetching: true
}

const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.GET_ALL_ITEM_IN_CART:
            return {
                ...state,
                cart: action.payload,
                isFetching: false
            }
        case types.GET_ALL_ITEM_IN_CART_SELECTED:
            return {
                ...state,
                cartSelected: action.payload,
                isFetching: false
            }
        case types.GET_CART_INFO:
            return {
                ...state,
                cartInfo: action.payload
            }
        case types.ADD_TO_CART:
            return {
                ...state,
                message: action.payload.message,
            }

        case types.DELETE_ITEM_IN_CART:
            return {
                ...state
            };

        case types.UPDATE_ITEM_IN_CART:
            return {
                ...state
            }
        case types.CART_COMPLETE:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default cartReducer;