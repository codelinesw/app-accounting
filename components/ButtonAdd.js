import React from 'react';
import { Text, Dimensions, TouchableOpacity} from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons } from '@expo/vector-icons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class ButtonAdd extends React.Component{

  render(){
    const { typeButton, navigation } = this.props;
    let c_client_id = navigation.getParam('c_client_id','');
    let screen_ = (typeButton == "addclients") ? "AddClient" : "AddBalances";
    screen_ = (typeButton == "addsales") ? "AddSales" : screen_;
      return(
        <TouchableOpacity style={[styles.btnwgreen,{right:10,padding:3,}]} onPress={() => this.props.navigation.navigate(screen_,{c_client_id:c_client_id})}>
          <Text style={[styles.textlight,{fontFamily:"Poppins-Bold",color:"#59f090"}]}>Añadir</Text>
        </TouchableOpacity>
      );
  }
}
