import React from 'react';
import { StyleSheet, Alert, TouchableOpacity, Button, Text } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default class ButtonDelete extends React.Component{
	showAlert(){
		Alert.alert(
			'Hello, Jhon how are you!'
		)
	}
	render(){
		return(
			<TouchableOpacity style={{right:10,padding:10,zIndex:10,}} onPress={() => this.props.navigation.navigate('ViewPdf')}>
           		<FontAwesome name="download" size={22} style={[{color:'#ffffff'}]} />
         	</TouchableOpacity>
		);
	}
}

