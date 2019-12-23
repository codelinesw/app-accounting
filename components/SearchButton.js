import React from 'react';
import { StyleSheet, Alert, TouchableOpacity, Button, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class SearchButton extends React.Component{
  	
  	constructor(props){
  		super(props);
  		this.state = {
  			color:'#838383',
  		};
  	}
	showAlert(){
		Alert.alert(
			'Hello, Jhon how are you!'
		)
	}

	render(){
		return(

			<TouchableOpacity
			style={styles.menuIcon}
			onPress={() => this.showAlert()}
			>
				<Ionicons
				 name="md-search"
				 color={this.props.color}
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
