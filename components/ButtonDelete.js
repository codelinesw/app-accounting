import React from 'react';
import { StyleSheet, Alert, TouchableOpacity, Button, Text, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default class ButtonDelete extends React.Component{
	showAlert(){
		alert();
	}
	render(){ 
		return(
			<View style={{display:'flex',flexDirection:'row'}}>
				<TouchableOpacity style={{right:10,padding:10,zIndex:10,}} onPress={() => this.props.navigation.navigate('AddBalances',{
					c_client_id:JSON.stringify(this.props.navigation.getParam('c_client_id','0')).replace(/\"/g,""),
					s_sale_id:JSON.stringify(this.props.navigation.getParam('s_sale_id','0')).replace(/\"/g,"")
				})}>
           			<Ionicons name="md-add-circle-outline" color="#ffffff" size={26} style={{color:'#ffffff',top:-2}} />
         		</TouchableOpacity>
				<TouchableOpacity style={{right:10,padding:10,zIndex:10,}} onPress={() => this.props.navigation.navigate('ViewPdf',{
					c_client_id:JSON.stringify(this.props.navigation.getParam('c_client_id','0')).replace(/\"/g,""),
					s_sale_id:JSON.stringify(this.props.navigation.getParam('s_sale_id','0')).replace(/\"/g,"")
				})}>
           			<FontAwesome name="file-pdf-o" size={22} style={[{color:'#ffffff'}]} />
         		</TouchableOpacity>
			</View>
		);
	}
}

