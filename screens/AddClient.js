import React from 'react';
import { TextInput, View ,Dimensions, TouchableOpacity, Image, Text} from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;



export default class AddClient extends React.Component{
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
              <Text style={[styles.title,{fontFamily:'Poppins-Bold', marginTop:15,}]}>Añade un nuevo cliente</Text>
							<Text style={[styles.textlight,{fontFamily:'Poppins'}]}>En esta zona puedes agrega un nuevo cliente a tu lista</Text>
          </View>
          <View style={[styles.body,{justifyContent:'center',alignItems:'center'}]}>
						<View style={styles.input_group}>

							<Ionicons
								name="md-person"
								color="#a4a6ac"
								size={19}
								style={styles.iconInput}
							 />
							<TextInput
								style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
								placeholder='Nombre completo'
      					onChangeText={text => this.onChangeText(text)}
      					value={value}
							/>
						</View>
						<View style={styles.input_group}>
						<FontAwesome name="mobile-phone" size={22} style={styles.iconInput} />
							<TextInput
								style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
								placeholder='(+57)'
      					onChangeText={text => this.onChangeText(text)}
      					value={value}
							/>
						</View>
						<View style={styles.input_group}>
							<FontAwesome name="location-arrow" size={18} style={styles.iconInput} />
							<TextInput
								style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
								placeholder='Dirección'
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
