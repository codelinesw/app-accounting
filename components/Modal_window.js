import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;



export default class Modal_window extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      visible: false,
      twoOptions: true,
    };
  }
  shouldComponentUpdate(nextPros,nextState){
    if(this.state.visible !== nextState.visible){
      return true;
    }else{
      return false;
    }
    alert(nextPros.visible);
    if(this.props.visible !== nextPros.visible){
      return true;
    }else{
      return false;
    }
  }
  componentDidUpdate(prevProps){
    alert(prevProps.visible);
    if(this.props.visible){
      this.setState({visible:true});
    }
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  Viewmore(){
    this.setState({visible:false});
    //this.props.navigation.navigate('ViewClient');
  }
  render(){
    const { visible, twoOptions } = this.props;
    return(
      <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
      >
        <View style={styles.containerModal}>
          <View style={styles.containerOptions}>
            <TouchableOpacity style={[styles.btnModal,{fontFamily:'Poppins'}]} onPress={this.Viewmore.bind(this)}><Text style={{fontSize:15,color:'#5c5b5e',fontFamily:'Poppins',}}>Ver más</Text></TouchableOpacity>
            {
              twoOptions == true ?
              (<TouchableOpacity style={[styles.btnModal,{fontFamily:'Poppins'},styles.btnTopradius]}><Text style={{fontSize:15,color:'#5c5b5e',fontFamily:'Poppins',}}>Eliminar</Text></TouchableOpacity>)
              : <TouchableOpacity style={[styles.btnModal,{fontFamily:'Poppins'},styles.btnTopradius]}><Text style={{fontSize:15,color:'#5c5b5e',fontFamily:'Poppins',}}>Reportar</Text></TouchableOpacity>
            }
          </View>
        </View>
      </Modal>
    );
  }
}
