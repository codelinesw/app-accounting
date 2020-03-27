import React from 'react';
import { StyleSheet, Alert, TouchableOpacity, Button, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class ButtonMenu extends React.Component{
	showAlert(){
		Alert.alert(
			'Hello, Jhon how are you!'
		)
	}
	render(){
		return(

			<TouchableOpacity
			style={styles.menuIcon}
			onPress={() => this.props.navigation.toggleDrawer()}
			>
				<Ionicons
				 name="md-menu"
				 color="#000000"
				 size={32}
				 style={styles.barmenu}
				/>
			</TouchableOpacity>
		);
	}
}



const styles = StyleSheet.create({
	menuIcon: {
		zIndex: 9,
		position:'relative',
		top:0,
		left:5,
		padding:10,

	},


});
