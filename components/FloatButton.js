import React from 'react';
import { StyleSheet, Alert, TouchableOpacity, Button, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class FloatButton extends React.Component{

  constructor(props){
    super(props);
  }

	showAlert(){
		Alert.alert(
			'Hello user, your are press me'
		)
	}
	render(){
		return(

			<TouchableOpacity
			style={this.props.style}
			onPress={() => this.props.navigation.navigate('AddClient')}
			>
				<Ionicons
				 name="md-add"
				 color="#ffffff"
				 size={32}
				 style={styles.barmenu}
				/>
			</TouchableOpacity>
		);
	}
}



const styles = StyleSheet.create({
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


});
