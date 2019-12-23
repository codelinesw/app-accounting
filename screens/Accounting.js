import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Dimensions, Button, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Pie from 'react-native-pie';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

var count = 0,
    countTwo = 0;

export default class Accounting extends React.Component{
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
        <View style={styles.container_pie}>
            <View style={styles.panel_left}>
                <Pie
                  radius={75}
                  series={[10, 90,]}
                  colors={['#CC66FF', '#535D7C']}
                  style={styles.pie}
                />
            </View>
            <View style={styles.info_pie}>
                <View style={styles.list_info}><View style={[styles.box_,styles.box_default]}></View><Text style={styles.text_info_pie}> Inversión</Text></View>
                  <View style={styles.list_info}><View style={[styles.box_,styles.box_purpple]}></View><Text style={styles.text_info_pie}> Ingresos</Text></View>
            </View>
          </View>
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
          <View style={styles.content_info_user}>
            <View style={styles.avatar}><Text style={styles.number_day}>17</Text><Text style={styles.text_day}>Dic</Text></View>
            <View style={styles.info_user}>
              <Text style={styles.name_user}>2 Jeans</Text>
              <Text style={styles.current_user}>Le compre 2 jeans a donia julia</Text>
              <Text style={styles.date_client}>17 Diciembre del 2019</Text>
              <View style={styles.buttonStar} onPress={() => this.changeState()}><Image source={require('../images/coin.png')} style={styles.Icondollar}/></View>
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
    backgroundColor: '#fff',
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

  Icondollar:{
    width:21,
    height:21,
    top:8,
  },
  container_pie:{
    width:WIDTH,
    height:200,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
  },

  panel_left:{
    width:(WIDTH-150),
    height:200,
    backgroundColor:'#ffffff',
    justifyContent:'flex-end',
    alignItems:'center',
    flexDirection:'row',
  },
  info_pie:{
    width:150,
    height:200,
    backgroundColor:'#ffffff',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
  },

  list_info:{
    right:20,
    flexDirection:'row',
  },
  text_info_pie:{
      fontWeight:'bold',
      color:'#333333',
  },

  box_:{
    top:3,
    width:13,
    height:13,
    backgroundColor:'red',
    borderRadius:3,
  },

  box_green:{
    backgroundColor:'#78e88d',
  },

  box_default:{
    backgroundColor:'#535D7C',
  },

  box_purpple: {
    backgroundColor:'#CC66FF',
    borderWidth:2,
    borderColor:'#CC66FF',
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
    backgroundColor:'#78e88d',
    borderColor:'#78e88d',
    borderRadius:6,
    color:'#ffffff',
    textAlign:'center',
    flexDirection:'column',
    fontSize:19,
    
  },
  avatar_red:{
    backgroundColor:'#F75C3B',
  },
  
  avatar_green: {
    backgroundColor:'#78e88d',
  },
  number_day:{
    marginTop:4,
    textAlign:'center',
    color:'#ffffff',
    fontWeight:'bold',
  },
  text_day:{
    textAlign:'center',
    fontSize:12,
    color:'#ffffff',
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
  }
});
