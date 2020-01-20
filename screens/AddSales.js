import React from 'react';
import { TextInput, View ,Dimensions, TouchableOpacity, Image, Text, Picker} from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;



export default class AddSales extends React.Component{
	constructor(props) {
  	super(props);
  	this.state = {
			value:'',
			language:'Selecciona un cliente',
			product:'Selecciona un producto',
    };
	}

	onChangeText(text){
		this.setState({value:text});
	}
	render(){
    const { value } = this.state;
		return(
			  <View style={[styles.container,{backgroundColor:'white',}]}>
          <View style={[styles.headerTitle,{flexDirection:'column', justifyContent:'flex-start',textAlign:'left',alignItems:'flex-start',height:95,resizeMode: 'contain'}]}>
              <Text style={[styles.title,{fontFamily:'Poppins-Bold', marginTop:15,}]}>No te olvides de añadir tus ventas</Text>
							<Text style={[styles.textlight,{fontFamily:'Poppins'}]}>En esta zona puedes agregar las ventas que le has hecho a tus clientes</Text>
          </View>
          <View style={[styles.body,{justifyContent:'center',alignItems:'center'}]}>
						<View style={styles.input_group}>
							<View style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}>
							<Ionicons
								name="md-shirt"
								color="#a4a6ac"
								size={19}
								style={[styles.iconInput,{left:8,},]}
							 />
							<Text style={[styles.textlight,{fontFamily:'Poppins',position:'absolute',top:11,left:25,width:(WIDTH-60),height:47,zIndex: 2}]}>{this.state.product}</Text>
							<Picker
							selectedValue={this.state.language}
							style={[{fontFamily:'Poppins',},styles.textlight,{position:'absolute',top:-5,left:15,width:(WIDTH-60),height:47,zIndex:1,color:'white'}]}
							itemStyle={{ fontFamily: 'Poppins' }}
							onValueChange={(itemValue, itemIndex) =>
								this.setState({language: itemValue})
							}>
								<Picker.Item label="Java" color="#a4a6ac" value="java" />
								<Picker.Item label="JavaScript" color="#a4a6ac" value="js" />
							</Picker>
							</View>
						</View>
						<View style={styles.input_group}>
							<Ionicons
								name="md-add-circle-outline"
								color="#a4a6ac"
								size={19}
								style={styles.iconInput}
							 />
							<TextInput
								style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
								placeholder='Cantidad'
      					onChangeText={text => this.onChangeText(text)}
      					value={value}
							/>
						</View>
						<View style={styles.input_group}>
						<FontAwesome name="dollar" size={22} style={styles.iconInput} />
							<TextInput
								style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
								placeholder='0'
      					onChangeText={text => this.onChangeText(text)}
      					value={value}
							/>
						</View>
						<View style={styles.input_group}>
							<FontAwesome name="calendar" size={18} style={styles.iconInput} />
							<TextInput
								style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
								placeholder='15/01/2020'
      					onChangeText={text => this.onChangeText(text)}
      					value={value}
							/>
						</View>
						<View style={[styles.input_group,{right:0,}]}>
								<TouchableOpacity style={[styles.btnExpand,styles.btngreen]}>
									<Text style={[styles.textwhite,{fontFamily:"Poppins",}]}>Agregar</Text>
								</TouchableOpacity>
						</View>
          </View>
    		</View>
			);
	}
}
