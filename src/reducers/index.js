import { combineReducers } from 'redux'

import authReducer from './auth'
import productReducer from './products'
import categoryReducer from './category'
import cartReducer from './cart'

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,

})

export default rootReducer;