import React from 'react';
import { Image,StyleSheet, Alert, TouchableOpacity, Button, Text, Platform, Dimensions , View } from 'react-native';
import { Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';


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
            <TouchableOpacity style={styles.link_navigation} onPress={() => this.props.navigation.navigate('Balances')}>
              <Image source={require('../images/discount.png')} style={styles.icon_link} />
              <Text style={styles.link_text}>Cuentas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link_navigation} onPress={() => this.props.navigation.navigate('Clients')}>
              <Image source={require('../images/avatar.png')} style={styles.icon_link} />
              <Text style={styles.link_text}>Clientes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link_navigation} onPress={() => this.props.navigation.navigate('ViewClient')}>
              <Image source={require('../images/envelope.png')} style={styles.icon_link} />
              <Text style={styles.link_text}>Mensajes</Text>
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
					<View style={styles.content_info_user}>
						<Image source={require('../images/user.png')} style={styles.avatar} />
						<View style={styles.info_user}>
							<Text style={styles.name_user}>JHON MURILLO MENDEZ</Text>
							<Text style={styles.current_user}><Image source={require('../images/avatar.png')} style={styles.user_current} /> admin@admin.com</Text>
						</View>
					</View>
				</View>
				<Divider style={{ backgroundColor: 'blue' }} />
				{this.route()}
			</View>
			);
	}
}

const styles = StyleSheet.create({
  container_menu: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  panel_top:{
  	position:'relative',
  	top:18,
  	width:(WIDTH-62),
  	height:(HEIGHT-580),
  	borderBottomColor: '#f3f3f6',
    borderBottomWidth: 2,
    flex:1,
    justifyContent:'center',

  },
  panel_body:{
  	position:'relative',
  	top:20,
  	width:(WIDTH-60
      ),
  	height:205,
  	borderBottomColor: '#f3f3f6',
  	borderBottomWidth: 2,
  	marginBottom:20,
  },
  content_info_user:{
  	width:220,
  	left:30,
  	flexDirection:'row',
  },
  avatar:{
  	width:50,
  	height:50,
  	borderWidth:2,
  	borderColor:'#78e88d',
  	borderRadius:6,
  },
  info_user: {
  	left:15,
  },

  name_user:{
  	top:2,
  	fontSize:14,
  	color:'#737373',
  	fontWeight: 'bold',
  },

  current_user:{
  	top:5,
  	color:'#737373',
  },
  user_current:{
  	width:18,
  	height:18,

  },

  link_navigation:{
  	padding:6,
  	fontSize:26,
  	paddingLeft:14,
  	margin:6,
  	textAlign:'left',
  	flexDirection:'row',
  },

  icon_link: {
  	width:25,
  	height:25,
  },

  link_text:{
  	top:1,
  	marginLeft:10,
  	color:'#737373',
  	fontWeight: 'bold',
  	fontSize:16,
  },

  panel_configuration: {
  	top:5,
  	width: (WIDTH-60),
  	height: 370,
  }

});
