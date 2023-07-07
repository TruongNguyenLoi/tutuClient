import {
    GET_CATEGORY,
    GET_SUB_CATEGORY
} from '../actions/constants/constants'

const initialState = {
    categories: [],
    subcategories: []
}

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CATEGORY:
            return {
                ...state
            }
        case GET_SUB_CATEGORY:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default categoryReducer;