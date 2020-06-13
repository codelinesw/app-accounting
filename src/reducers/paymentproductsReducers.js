const initialState = {
	payments:[""],
	selectPaymentId:0,
	isOptionVisible:false,
	IndexPayment:0,
	message:'',
	response:'',
	PaymentToUpdate:['']
};

export default function balanceClientReducers(state = initialState, action) {
  switch (action.type) {
    case 'GET_BALANCES':
      return {...state,payments: action.payload}
    case 'GET_SELECTED_BALANCE_ID':
      return {...state,selectPaymentId: action.payload}
		case 'SET_SELECT_BALANCE_INDEX':
			return {...state,IndexPayment:action.payload};
    case 'SET_BALANCE_ID':
    	return {...state,payments: action.payload}
		case 'ADD_BALANCE':
			state.payments.map((item,index) => {
				if(Object.values(item) == "empty"){
					state.payments.splice(index,1);
				}
			});
			state.payments.unshift(action.payload);
			return {...state,balances: state.balances}
		case 'DELETE_BALANCE_ID':
			console.log('index_to_delete ',action.payload);
			state.payments.splice(action.payload,1);
			return {...state,payments:state.payments}
		case 'BALANCE_TO_UPDATE':
		  return {...state,PaymentToUpdate:action.payload}
		case 'SET_MESSAGE':
			return {...state,message: action.payload}
	  case 'SET_RESPONSE':
			return {...state,response: action.payload}
		case 'SHOW_OPTIONS':
			console.log("showing menu to delete..." + action.payload);
			return {...state,isOptionVisible: action.payload}
    default:
      //console.log('default:state',state)
      return state;
  }
}
