import React from 'react';
import { View,Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import { connect } from 'react-redux';
import {
  showOptions,
  isOptionVisible,
  IndexProduct,
  setIndexProduct,
  selectProductId,
  deleteProductId,
  setResponse,
  setMessage,
  getSelectedProductId
} from '../src/actions';
import services from "../request/services";
import routes from "../request/routes";

class MenuControls extends React.Component{

  constructor(props){
    super(props);

    this.state = {

    };
  }

  deleteItem(URL){
    let index = this.props.products.IndexProduct;
    let product_id = this.props.products.selectProductId;
    let data_  = new FormData();
    data_.append('p_products_id',product_id);
    this.props.deleteProductId(index);

    services.requestUpload(routes.products.delete,data_)
    .then(res => {
        //delete all product with this id
        //alert(res);
        this.props.deleteProductId(index);
        this.props.setResponse(res);
        this.props.getSelectedProductId(0);
        if(res == "ok"){
          this.props.setMessage('Se ha eliminado este producto correctamente');
        }else{
          this.props.setMessage('Upps! ha ocurrido un problema al intentar eliminar este producto');
        }
    },
    (error) => {
      this.setState({
        //isLoaded: false,
        error
      });
    }).finally(() => {
      this.setState({isLoaded:false});
      this.isMounted_ = false;
    }).catch(function(error) {
      alert(
        error.message
      );

     // ADD THIS THROW error
      throw error;
    });

  }

  render(){
      let enable  = this.props.products.isOptionVisible;
      let screen_ = "AddProduct";
        return(
          <View style={{display:'flex',flexDirection:'row'}}>
            {
              enable ? <View style={{display:'flex',flexDirection:'row',right:10}}>
              <TouchableOpacity style={styles._btngray_} onPress={() => this.handleAddClient(item.c_client_id,{c_client_id:item.c_client_id,c_name:item.c_name,c_phone:item.c_phone,c_address:item.c_address,c_date:item.c_date},index)}>
                <Text style={[styles.textlight,{fontFamily:"Poppins",right:3,top:3}]}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles._btnwgray_]} onPress={() => this.deleteItem()}>
                <Text style={[styles.textlight,{fontFamily:"Poppins"}]}>Eliminar</Text>
              </TouchableOpacity>
            </View>: <TouchableOpacity style={[styles._btngreen_,{right:10}]} onPress={() => this.props.navigation.navigate('AddProduct')}>
              <Text style={[styles.textgreen,{fontFamily:"Poppins",left:5}]}>Añadir</Text>
            </TouchableOpacity>
            }

          </View>
        );
  }
}


const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = {
  showOptions,
  isOptionVisible,
  IndexProduct,
  setIndexProduct,
  selectProductId,
  deleteProductId,
  setResponse,
  setMessage,
  getSelectedProductId
};

export default connect( mapStateToProps , mapDispatchToProps )(MenuControls)
