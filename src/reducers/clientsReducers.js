const initialState = {
	data: [""],
	selectedClientId: [""],
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CLIENTS':
      return {...state,data: action.payload}
    case 'GET_SELECTED_CLIENT_ID':
      return {...state,selectedClientId: action.payload}
    case 'SET_CLIENT_ID':
    	 return {...state,data: action.payload}
		case 'ADD_CLIENT':
			state.data.unshift(action.payload);
			//console.log(JSON.stringify(state.data));
			 return {...state,data: state.data}
		case 'DELETE_CLIENT_ID':
			console.log('id_to_delete ',action.payload);
			state.data.splice(action.payload,1);
			return {...state,data:state.data}
    default:
      //console.log('default:state',state)
      return state;
  }
}
