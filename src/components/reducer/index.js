import {combineReducers} from 'redux'
import addItem from './addItemReducer'
import undoItem from './undoItemReducer'

export default combineReducers({
     addItem,
     undoItem,
})