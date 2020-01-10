import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/styles_template';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Home extends React.Component{
	
  constructor(props){
    super(props);

    this.state = {
      fontsLoaded: false,
      poppins:'',
      poppinsBold:'',
    };
  }

  componentDidMount() {
    Font.loadAsync({
      'Poppins': require('../assets/fonts/Poppins/Poppins-Light.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    }).then( () => this.setState( { fontsLoaded: true, poppins:'Poppins', poppinsBold:'Poppins-Bold' } ) );
  }

  render(){
		const { fontsLoaded, poppins, poppinsBold } = this.state;

    if(fontsLoaded){
      return(
        <View style={styles.container}>
             <View style={styles.content_title}>
               <Text style={[styles.title,{fontFamily:poppinsBold,}]}>Acceso rapido</Text>
             </View> 
             <View style={styles.body_}>
               <Text style={[styles.title,,{fontFamily:poppins,}]}>Acceso rapido</Text>
               <View style={[styles.box_information,styles.borderGreen]}>
                 <Text style={[styles.title,{fontFamily:poppinsBold,}]}>Compra</Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Prenda: <Text style={[styles.textlight,{fontFamily:poppins,}]}>Jean</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Cantidad: <Text style={[styles.textlight,{fontFamily:poppins,}]}>1</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Fecha: <Text style={[styles.textlight,{fontFamily:poppins,}]}> 9/01/2019</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Valor: <Text style={[styles.textlight,{fontFamily:poppins,}]}>$80.000</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Abono: <Text style={[styles.textlight,{fontFamily:poppins,}]}>$10.000</Text></Text>
                 <Text style={[{fontFamily:poppins,},styles.bottomRight]}>Saldo: <Text style={[styles.textlight,{fontFamily:poppinsBold,},styles.colorGreen]}>$70.000</Text></Text>
               </View>
               <View style={[styles.box_information,styles.expand_box_information]}>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundPurpple]}></View>
                   <Text style={[styles.title,{fontFamily:poppinsBold,}]}>Jhon Denver Murillo Mendez</Text>
                 </View>
                 <Text style={[styles.textlight,{fontFamily:poppins,}]}>(+57) 3117222333</Text>
                 <Text style={[styles.textlight,{fontFamily:poppins,}]}>Jhon es un cliente que le gusta hacer compras constantemente de jeans</Text>
                 <View style={styles.btnGroup}>
                   <TouchableOpacity style={styles.btngray}>
                     <Text style={[styles.textlight,{fontFamily:poppins,}]}>Editar</Text>
                   </TouchableOpacity> 
                   <TouchableOpacity style={styles.btnwgray}>
                     <Text style={[styles.textlight,{fontFamily:poppins,}]}>Eliminar</Text>
                   </TouchableOpacity> 
                 </View>
                 <TouchableOpacity style={styles.btnfavorites}>
                    <Ionicons name="md-star" color="#a4a6ac" size={22} />
                 </TouchableOpacity>
                 <Text style={[styles.textdate,{fontFamily:poppins,}]}>09/01/2019</Text>
               </View>
             </View>

        </View>
      );
    }else{
      return(
        <View style={styles.container}>
             <View style={styles.content_title}>
                <Text style={styles.title}>Acceso rapido</Text>
             </View>
        </View>
      );
    }
	}
}

// const styles = StyleSheet.create({
//   container: {
//     height:HEIGHT,
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   content_title:{
//     width:WIDTH,
//     height:130,
//     flex:1,
//     flexDirection:'column',
//     backgroundColor:'#ffffff',
//   },

//   content_body:{
//     width:WIDTH,
//     height:(HEIGHT-130),
//   },

//   text:{
//     top:12,
//     fontSize: 25,
//     paddingLeft:20,
//     color:'#14131f',
//   },

//   content_card: {
//     width:WIDTH,
//     height:520,
//     flexDirection:'row',
//     flexWrap:'wrap',
//     justifyContent:'center',
//   },

//   card: {
//     top:0,
//     left:10,
//     width:150,
//     height:160,
//     backgroundColor:'#ffffff',
//     borderRadius:10,
//     marginBottom:25,
//     marginRight:20,
//     backgroundColor: '#03A9F4',
//     alignItems: 'center', 
//     shadowOffset: {width: 13, height: 13}, 
//     shadowOpacity: 0.58,
//     shadowRadius: 16.00,

//     // android (Android +5.0)
//     shadowColor:'red',
//     elevation: 24,
//     flexDirection: 'column',
//     flexWrap: 'wrap',
  
//   },

//   purpple:{
//     backgroundColor:'#9b34ff',
//   },

//   yellow:{
//     backgroundColor:'#ffbd3e',
//   },

//   green:{
//     backgroundColor:'#00f397',
//   },

//   blue:{
//     backgroundColor:'#00e6e9',
//   },

//   circle_image:{
//     marginHorizontal: 'auto',
//     marginLeft:35,
//     marginRight:35,
//     marginTop:20,
//     width:75,
//     height:75,
//     borderRadius:100,
//     backgroundColor:'#ffffff',
//     alignItems:'center',
//   },

//   image_card:{
//     top:14,
//     right:5,
//     marginLeft:6,
//     width:45,
//     height:45,
//     margin:'auto',
//     alignItems:'center',
//   },

//   title_text: {
//     color:'#ffffff',
//     right:5,
//     top:20,
//     fontWeight:'bold',
//     alignItems:'center',
//   },

// });