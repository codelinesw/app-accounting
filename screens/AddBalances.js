import React from 'react';
import { TextInput, View ,Dimensions, TouchableOpacity, Image, Text, Picker} from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;



export default class AddBalances extends React.Component{
	constructor(props) {
  	super(props);
  	this.state = {
			value:''
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
              <Text style={[styles.title,{fontFamily:'Poppins-Bold', marginTop:15,}]}>Añade un nuevo saldo</Text>
							<Text style={[styles.textlight,{fontFamily:'Poppins'}]}>En esta zona puedes agregar los saldos de tus clientes</Text>
          </View>
          <View style={[styles.body,{justifyContent:'center',alignItems:'center'}]}>
					<View style={styles.input_group}>
						<View style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}>
						 <Ionicons
							 name="md-person"
							 color="#a4a6ac"
							 size={19}
							 style={[styles.iconInput,{left:8,},]}
							/>
						<Picker
						selectedValue={this.state.language}
						style={[styles.textlight,{position:'absolute',top:-5,left:15,width:(WIDTH-60),height:47,fontFamily:'Poppins',fontSize:11,}]}
						onValueChange={(itemValue, itemIndex) =>
							this.setState({language: itemValue})
						}
						>
							<Picker.Item label="Java" color="blue" value="java"/>
							<Picker.Item label="JavaScript" value="js" />
						</Picker>
						</View>
					</View>
						<View style={styles.input_group}>
							<View style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}>
							<Ionicons
								name="md-shirt"
								color="#a4a6ac"
								size={19}
								style={[styles.iconInput,{left:8,},]}
							 />
							<Picker
							selectedValue={this.state.language}
							style={[{fontFamily:'Poppins',},styles.textlight,{position:'absolute',top:-5,left:15,width:(WIDTH-60),height:47,}]}
							itemStyle={{ fontFamily: 'Poppins' }}
							onValueChange={(itemValue, itemIndex) =>
								this.setState({language: itemValue})
							}>
								<Picker.Item label="Java" value="java" />
								<Picker.Item label="JavaScript" value="js" />
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
