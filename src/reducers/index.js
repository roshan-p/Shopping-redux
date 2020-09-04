import { combineReducers } from 'redux'
import cartReducer from './cart'
import filterReducer from './filter'

const reducer = combineReducers({
     cartRc:cartReducer,
     filterRc:filterReducer
})

export default reducer