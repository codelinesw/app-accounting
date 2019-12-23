import React from 'react';
import { StyleSheet, Text, View ,Dimensions, TouchableOpacity, Image } from 'react-native';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Home extends React.Component{
	render(){
		return(
			<View style={styles.container}>
            <View style={styles.content_title}>
              <Text style={styles.text }>Acceso rapido</Text>
            </View>
      			<View style={styles.content_body}>
              <View style={styles.content_card}>
                    <TouchableOpacity style={[styles.card,styles.purpple]}>
                      <View style={styles.circle_image}>
                        <Image source={require('../images/PNG/001-taxes.png')} style={styles.image_card} />
                      </View>
                      <Text style={styles.title_text}>Mis Cuentas</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={[styles.card,styles.yellow]}>
                    <View style={styles.circle_image}><Image source={require('../images/PNG/002-target.png')} style={styles.image_card} /></View>
                    <Text style={styles.title_text}>Mis Clientes</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.card,styles.green]}>
                      <View style={styles.circle_image}><Image source={require('../images/PNG/003-paper-plane.png')} style={styles.image_card} /></View>
                      <Text style={styles.title_text}>Mensajes</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.card,styles.blue]}>
                      <View style={styles.circle_image}><Image source={require('../images/PNG/004-shopping-bag.png')} style={styles.image_card} /></View>
                      <Text style={styles.title_text}>Mis Compras</Text>
                   </TouchableOpacity>
              </View>
            </View>
    		</View>
			);
	}
}

const styles = StyleSheet.create({
  container: {
    height:HEIGHT,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content_title:{
    width:WIDTH,
    height:130,
    flex:1,
    flexDirection:'column',
    backgroundColor:'#ffffff',
  },

  content_body:{
    width:WIDTH,
    height:(HEIGHT-130),
  },

  text:{
    top:12,
    fontSize: 25,
    paddingLeft:20,
    color:'#14131f',
  },

  content_card: {
    width:WIDTH,
    height:520,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
  },

  card: {
    top:0,
    left:10,
    width:150,
    height:160,
    backgroundColor:'#ffffff',
    borderRadius:10,
    marginBottom:25,
    marginRight:20,
    backgroundColor: '#03A9F4',
    alignItems: 'center', 
    shadowOffset: {width: 13, height: 13}, 
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    // android (Android +5.0)
    shadowColor:'red',
    elevation: 24,
    flexDirection: 'column',
    flexWrap: 'wrap',
  
  },

  purpple:{
    backgroundColor:'#9b34ff',
  },

  yellow:{
    backgroundColor:'#ffbd3e',
  },

  green:{
    backgroundColor:'#00f397',
  },

  blue:{
    backgroundColor:'#00e6e9',
  },

  circle_image:{
    marginHorizontal: 'auto',
    marginLeft:35,
    marginRight:35,
    marginTop:20,
    width:75,
    height:75,
    borderRadius:100,
    backgroundColor:'#ffffff',
    alignItems:'center',
  },

  image_card:{
    top:14,
    right:5,
    marginLeft:6,
    width:45,
    height:45,
    margin:'auto',
    alignItems:'center',
  },

  title_text: {
    color:'#ffffff',
    right:5,
    top:20,
    fontWeight:'bold',
    alignItems:'center',
  },

});