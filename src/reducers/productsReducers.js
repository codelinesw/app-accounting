const initialState = {
	products:[""],
	selectProductId:0,
	isOptionVisible:false,
	IndexProduct:0,
	message:'',
	response:'',
	productToUpdate:['']
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {...state,products: action.payload}
    case 'GET_SELECTED_PRODUCT_ID':
      return {...state,selectProductId: action.payload}
		case 'SET_SELECT_PRODUCT_INDEX':
			return {...state,IndexProduct:action.payload};
    case 'SET_PRODUCT_ID':
    	 return {...state,products: action.payload}
		case 'ADD_PRODUCT':
			state.products.unshift(action.payload);
			console.log(JSON.stringify(state.products));
			 return {...state,products: state.products}
		case 'DELETE_PRODUCT_ID':
			console.log('id_to_delete ',action.payload);
			state.products.splice(action.payload,1);
			return {...state,products:state.products}
		case 'PRODUCT_TO_UPDATE':
		  return {...state,productToUpdate:action.payload}	
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
