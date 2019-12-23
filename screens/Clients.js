import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Button, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



import FloatButton from '../components/FloatButton';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

var count = 0,
    countTwo = 0;

export default class Clients extends React.Component{

  showAlert(){
    if(count == 0){
      this.setState({typeIcon: 'md-arrow-down',});
      count++;
    }else{
      this.setState({typeIcon: 'md-arrow-up',});
      count--;
    }
  }

  changeState(){
    if(countTwo == 0){
      this.setState({changeColor: '#c3c3c3',});
      countTwo++;
    }else{
      this.setState({changeColor: '#FFD91C',});
      countTwo--;
    }
  }

  constructor(props) {
    super(props);
    this.state = { typeIcon: 'md-arrow-up', changeColor: '#c3c3c3',};
  }
  render(){
    return(
        <View style={styles.container}>
            <View style={styles.bodyContent}>
              <View style={styles.headerTitle}>
                  <Text style={styles.text}>Todos</Text>
                  <TouchableOpacity style={styles.button_order} onPress={() => this.showAlert()}><Text style={styles.text_button}>Mostrar los primeros</Text><Ionicons
                    name={this.state.typeIcon}
                    color="#c3c3c3"
                    size={20}
                    style={styles.IconArrow}
                   /></TouchableOpacity>
              </View>
              <View style={styles.containerClients}>
                <FloatButton style={[styles.menuIcon,styles.bgroundGreen]} navigation={this.props.navigation}/>
                <View style={styles.content_info_user}>
                  <Image source={require('../images/user.png')} style={styles.avatar} />
                  <View style={styles.info_user}>
                    <Text style={styles.name_user}>JHON MURILLO MENDEZ</Text>
                    <Text style={styles.current_user}>(+57) 3117222333</Text>
                    <Text style={styles.date_client}>17 Diciembre del 2019</Text>
                    <TouchableOpacity style={styles.buttonStar} onPress={() => this.changeState()}><Ionicons name="md-star" color={this.state.changeColor} size={22} style={styles.IconArrow}/></TouchableOpacity>
                    <Text style={styles.sale_price}>$180.0000</Text>
                  </View>
                </View>
                <View style={styles.content_info_user}>
                  <Image source={require('../images/user.png')} style={styles.avatar} />
                  <View style={styles.info_user}>
                    <Text style={styles.name_user}>JHON MURILLO MENDEZ</Text>
                    <Text style={styles.current_user}>(+57) 3117222333</Text>
                    <Text style={styles.date_client}>17 Diciembre del 2019</Text>
                    <TouchableOpacity style={styles.buttonStar} onPress={() => this.changeState()}><Ionicons name="md-star" color={this.state.changeColor} size={22} style={styles.IconArrow}/></TouchableOpacity>
                    <Text style={styles.sale_price}>$180.0000</Text>
                  </View>
                </View>
                <View style={styles.content_info_user}>
                  <Image source={require('../images/user.png')} style={styles.avatar} />
                  <View style={styles.info_user}>
                    <Text style={styles.name_user}>JHON MURILLO MENDEZ</Text>
                    <Text style={styles.current_user}>(+57) 3117222333</Text>
                    <Text style={styles.date_client}>17 Diciembre del 2019</Text>
                    <TouchableOpacity style={styles.buttonStar} onPress={() => this.changeState()}><Ionicons name="md-star" color={this.state.changeColor} size={22} style={styles.IconArrow}/></TouchableOpacity>
                    <Text style={styles.sale_price}>$180.0000</Text>
                  </View>
                </View>
              </View>
            </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle:{
    width:WIDTH,
    height:49,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#fcfcfc',
    borderBottomColor:'#dedede',
    borderBottomWidth:1,
  },
  text:{
    left:10,
    top:6,
    fontSize: 13,
    height:23,
    marginBottom:10,
    color:'#c3c3c3',
  },

  bodyContent:{
    width:WIDTH,
    height:(HEIGHT-105),

  },

  button_order: {
    top:14,
    width: 150,
    height: 50,
    right: 5,
    bottom: 30,
    zIndex:12,
    flexDirection:'row',
  },

  text_button:{
    fontSize:13,
    color:'#c3c3c3',
    marginRight:7,
  },

  IconArrow:{
    top:0,
  },

  containerClients: {
    width:WIDTH,
    height:(HEIGHT-45),

  },
  content_info_user:{
    width:WIDTH,
    height:76,
    left:0,
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#dedede',
  },
  avatar:{
    top:12,
    left:6,
    width:50,
    height:50,
    borderWidth:2,
    borderColor:'#78e88d',
    borderRadius:6,
  },
  info_user: {
    width:(WIDTH-65),
    left:15,

  },

  name_user:{
    marginTop:10,
    fontSize:13,
    color:'#737373',
    fontWeight: 'bold',
  },

  current_user:{
    top:3,
    color:'#c3c3c3',
    fontSize:12,
  },
  user_current:{
    width:18,
    height:18,

  },

  sale_price:{
    position:'absolute',
    bottom:10,
    right:10,
    fontSize:13,
    fontWeight:'bold',
    color:'#7EE393',
  },

  date_client:{
    top:8,
    fontSize:11,
    color:'#888888',
  },

  buttonStar: {
    position:'absolute',
    top:7,
    right:15,
    width:30,
    height:30,
    justifyContent:'center',
    alignItems:'center',
  },
  menuIcon: {
    position:'absolute',
    zIndex: 9,
    bottom:130,
    right:20,
    padding:10,
    width:55,
    height:55,
    borderRadius:100,
    justifyContent:'flex-end',
    alignItems:'center',
    textAlign:'center',
    backgroundColor:'red',
    shadowOffset: {width: 13, height: 13},
    shadowOpacity: 0.78,
    shadowRadius: 16.00,
    // android (Android +5.0)
    shadowColor:'#000000',
    elevation: 24,
  },

  bgroundYellow:{
      backgroundColor:'#ffbd3e',
  },

  bgroundGreen: {
    backgroundColor:'#7EE393',
  },
});
