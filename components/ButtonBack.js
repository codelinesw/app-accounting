import React from 'react';
import { StyleSheet, Alert, TouchableOpacity, Button, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class ButtonBack extends React.Component{

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	showAlert(){
		Alert.alert(
			'Hello, Jhon how are you!'
		)
	}
	render(){

		const { type_ } = this.props;

		if(type_ == "black"){
			return(
				<TouchableOpacity
				style={styles.menuIcon}
				onPress={() => this.props.navigation.navigate('Clients',{isupdated:1})}
				>
					<Ionicons
					 name="md-arrow-back"
					 color="#c3c3c3"
					 size={32}
					 style={styles.barmenu}
					/>
				</TouchableOpacity>
			);
		}else{
			return(
				<TouchableOpacity
				style={styles.menuIcon}
				onPress={() => this.props.navigation.goBack(null)}
				>
					<Ionicons
					 name="md-arrow-back"
					 color="#ffffff"
					 size={32}
					 style={styles.barmenu}
					/>
				</TouchableOpacity>
			);
		}
		
	}
}



const styles = StyleSheet.create({
	menuIcon: {
		zIndex: 9,
		position:'relative',
		top:0,
		left:10,
		padding:10,

	},


});
