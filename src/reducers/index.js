import { combineReducers } from 'redux'
import AppReducer from './clientsReducers'
import productsReducer from './productsReducers'

export default combineReducers({
	clients: () => [],
	data: AppReducer,
	products:productsReducer

})
