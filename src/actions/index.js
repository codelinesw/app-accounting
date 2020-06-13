//import services from '../../request/services'


export function addClient(client){
  //console.log("ACTIONS::ADD_CLIENT",client)
  return {
    type: 'ADD_CLIENT',
    payload:client
  }
}

//Get all data to client selected
export function getSelectedClientId(clientId) {
  //console.log("ACTIONS::GET_SELECTED_CLIENT_ID",clientId)
  return {
    type: 'GET_SELECTED_CLIENT_ID',
    payload: clientId
  }
}
// Get all clients with his info
export function getClients(clients) {
  //  console.log("ACTIONS::GET_CLIENTS",clients)
    return {
      type: 'GET_CLIENTS',
      payload: clients
    }
}

export function setClientId(clientId){
  //console.log("ACTIONS::SET_CLIENTS_ID",clientId)
  return {
    type: 'SET_CLIENT_ID',
    payload: clientId
  }
}


export function deleteClientId(clientId){
  //console.log("ACTIONS::DELETE_CLIENT_ID",clientId)
  return{
    type: 'DELETE_CLIENT_ID',
    payload: clientId
  }
}

/** FUNCTIONS FOR PRODUCTS **/

export function addProduct(product){
  //console.log("ACTIONS::ADD_CLIENT",client)
  return {
    type: 'ADD_PRODUCT',
    payload:product
  }
}

//Get all data to client selected
export function getSelectedProductId(productId) {
  //console.log("ACTIONS::GET_SELECTED_CLIENT_ID",productId)
  return {
    type: 'GET_SELECTED_PRODUCT_ID',
    payload: productId
  }
}


//Get all position of data into array
export function setIndexProduct(itemIndex){
  return{
    type:'SET_SELECT_PRODUCT_INDEX',
    payload:itemIndex
  }
}


// Get all products with his info
export function getProducts(products) {
  //  console.log("ACTIONS::GET_CLIENTS",products)
    return {
      type: 'GET_PRODUCTS',
      payload: products
    }
}

export function setProductId(productId){
  console.log("ACTIONS::SET_CLIENTS_ID",productId)
  return {
    type: 'SET_PRODUCT_ID',
    payload: productId
  }
}


export function deleteProductId(clientId){
  //console.log("ACTIONS::DELETE_PRODUCT_ID",clientId)
  return{
    type: 'DELETE_PRODUCT_ID',
    payload: clientId
  }
}

export function showOptions(showing_){
  return{
    type:'SHOW_OPTIONS',
    payload:showing_
  }
}


export function setMessage(msg){
  return{
    type:'SET_MESSAGE',
    payload:msg
  }
}


export function setResponse(response){
  //console.log('ACTION:: SET_RESPONSE ', response);
  return{
    type:'SET_RESPONSE',
    payload:response
  }
}


export function setProducttoUpdate(product){
  return{
    type:'PRODUCT_TO_UPDATE',
    payload: product
  }
}

/** FUNCTIONS TO BALANCES TO CLIENT **/

export function addBalanceToClient(balance){
  console.log("ACTIONS::ADD_BALANCE_TO_CLIENT",balance)
  return {
    type: 'ADD_BALANCE',
    payload:balance
  }
}

//Get all data to client selected
export function setSelectedBalanceToClientId(productId) {
  //console.log("ACTIONS::GET_SELECTED_CLIENT_ID",productId)
  return {
    type: 'GET_SELECTED_BALANCE_ID',
    payload: productId
  }
}


//Get all position of data into array
export function setIndexBalanceToClient(itemIndex){
  return{
    type:'SET_SELECT_BALANCE_INDEX',
    payload:itemIndex
  }
}


// Get all products with his info
export function getBalanceToClients(balances){
  console.log("ACTIONS::GET_CLIENTS",balances)
    return {
      type: 'GET_BALANCES',
      payload: balances
    }
}

export function setBalanceToClientId(productId){
  console.log("ACTIONS::SET_CLIENTS_ID",productId)
  return {
    type: 'SET_BALANCE_ID',
    payload: productId
  }
}


export function deleteBalanceToClientId(clientId){
  //console.log("ACTIONS::DELETE_BALANCE_ID",clientId)
  return{
    type: 'DELETE_BALANCE_ID',
    payload: clientId
  }
}

export function setBalanceToClientToUpdate(product){
  return{
    type:'BALANCE_TO_UPDATE',
    payload: product
  }
}
// export const fetchData = (callback) => {
//   return (dispatch) => {
//      dispatch(getClients())
//      services.request()
//        .then(response,{
//          dispatch(get)
//        })
//   }
// }
