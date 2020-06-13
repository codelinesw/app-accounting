import { combineReducers } from 'redux'
import AppReducer from './clientsReducers'
import productsReducer from './productsReducers'
import balanceClientReducers from './balanceClientReducers'

export default combineReducers({
	clients: () => [],
	data: AppReducer,
	products:productsReducer,
	balances:balanceClientReducers

})
