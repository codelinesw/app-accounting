import React from 'react';
import { Image,TouchableOpacity, Text, Platform, Dimensions , View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles_template';

import Home from '../screens/Home';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class MenuOptions extends React.Component {
  route(){
    return (
          <View>
            <View style={styles.panel_body}>
            <TouchableOpacity style={styles.link_navigation} onPress={() => this.props.navigation.navigate('Home')}>
              <Image source={require('../images/home.png')} style={styles.icon_link} />
              <Text style={{top:5,marginLeft:10,color:'#737373',fontWeight: 'bold',fontSize:16,}}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link_navigation} onPress={() => this.props.navigation.navigate('Accounting')}>
              <Image source={require('../images/discount.png')} style={styles.icon_link} />
              <Text style={styles.link_text}>Contabilidad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link_navigation} onPress={() => this.props.navigation.navigate('Clients')}>
              <Image source={require('../images/avatar.png')} style={styles.icon_link} />
              <Text style={styles.link_text}>Clientes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link_navigation} onPress={() => this.props.navigation.navigate('Balances')}>
              <Image source={require('../images/sale.png')} style={styles.icon_link} />
              <Text style={styles.link_text}>Saldos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link_navigation} onPress={() => this.props.navigation.navigate('ViewClient')}>
              <Image source={require('../images/money-bag.png')} style={styles.icon_link} />
              <Text style={styles.link_text}>Compras</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.panel_configuration}>
            <TouchableOpacity style={styles.link_navigation} onPress={() => this.props.navigation.navigate('Accounting')}>
              <Image source={require('../images/settings.png')} style={styles.icon_link} />
              <Text style={styles.link_text}>Configuraciones</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link_navigation} onPress={() => this.props.navigation.navigate('AddClient')}>
              <Image source={require('../images/logout.png')} style={styles.icon_link} />
              <Text style={styles.link_text}>Salir</Text>
            </TouchableOpacity>
          </View>
          </View>
      )
  }
	render(){
		return(
			<View style={styles.container_menu} >
				<View style={styles.panel_top}>
					<View style={[styles.container_divider,styles.container_divider_white,{width:(WIDTH-62),borderBottomWidth:0,top:2,}]}>
               <View style={styles.panel_left}>
                 <Image source={require('../images/user.png')} style={styles.avatar} />
               </View>
               <View style={styles.panel_right}>
                 <Text style={[styles.title,{fontFamily:"Poppins-Bold",fontSize:12,marginTop:9,}]}>Jhon Denver Murillo</Text>
                 <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:11,}]}>(+57) 3117222333</Text>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundGreen]}></View>
                   <Text style={[styles.text,{fontFamily:"Poppins",fontSize:12,}]}>Administrador</Text>
                 </View>
               </View>
          </View>
				</View>
				{this.route()}
			</View>
			);
	}
}



// const styles = StyleSheet.create({
//   container_menu: {
//     width:(WIDTH-62),
//     //height:686
//     height:HEIGHT,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   panel_top:{
//   	position:'relative',
//   	top:18,
//   	width:(WIDTH-62),
//   	height:(HEIGHT-555),
//     backgroundColor:'red',
//   	borderBottomColor: '#f3f3f6',
//     borderBottomWidth: 2,
//     flex:1,
//     justifyContent:'center',

//   },
//   panel_body:{
//   	position:'relative',
//   	top:20,
//   	width:(WIDTH-60),
//   	height:295,
//   	borderBottomColor: '#f3f3f6',
//   	borderBottomWidth: 2,
//   	marginBottom:20,
//   },
//   content_info_user:{
//   	width:220,
//   	left:30,
//   	flexDirection:'row',
//   },
//   avatar:{
//   	width:50,
//   	height:50,
//   	borderWidth:2,
//   	borderColor:'#78e88d',
//   	borderRadius:6,
//   },
//   info_user: {
//   	left:15,
//   },

//   name_user:{
//   	top:2,
//   	fontSize:14,
//   	color:'#737373',
//   	fontWeight: 'bold',
//   },

//   current_user:{
//   	top:5,
//   	color:'#737373',
//   },
//   user_current:{
//   	width:18,
//   	height:18,

//   },

//   link_navigation:{
//   	padding:6,
//   	fontSize:26,
//   	paddingLeft:14,
//   	margin:6,
//   	textAlign:'left',
//   	flexDirection:'row',
//   },

//   icon_link: {
//   	width:25,
//   	height:25,
//   },

//   link_text:{
//   	top:1,
//   	marginLeft:10,
//   	color:'#737373',
//   	fontWeight: 'bold',
//   	fontSize:16,
//   },

//   panel_configuration: {
//   	top:5,
//   	width: (WIDTH-60),
//   	height: 260,
//   }

// });
