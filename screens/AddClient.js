import React from 'react';
import { TextInput, View ,Dimensions, TouchableOpacity, Image, Text, ActivityIndicator, Animated} from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import services from "../request/services";
import routes from "../request/routes";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class AddClient extends React.Component{

	constructor(props) {
	  	super(props);
	  	this.state = {
				value:'',
				c_client_id: JSON.stringify(this.props.navigation.getParam('c_client_id', '')).replace(/\"/g,''),
				c_name: JSON.stringify(this.props.navigation.getParam('c_name', '')).replace(/\"/g,''),
				c_phone: JSON.stringify(this.props.navigation.getParam('c_phone', '0')).replace(/\"/g,''),
				c_address: JSON.stringify(this.props.navigation.getParam('c_address', '')).replace(/\"/g,''),
				data_: [""],
				fadeValue: new Animated.Value(0),
				message_alert: 'Por favor complete los campos vacios.',
	    };
	}

	onChangeText(text){
		this.setState({value:text});
	}
	_start = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 500
    }).start();

		setTimeout(function(){
			Animated.timing(this.state.fadeValue, {
	      toValue: 1,
	      duration: 500
	    }).stop();
		},1000);
  };

	sendData(URL,data_){
		this.setState({isLoaded:true});
		services.request(URL,data_)
		.then(res => res.text())
		.then(res => {
		    this.setState({
		      isLoaded: false,
		      data_:res,
		    });
		  },
		  (error) => {
		    this.setState({
		      isLoaded: false,
		      error
		    });
		  }).catch(function(error) {
      Alert.alert(
        error.message
      )
      // ADD THIS THROW error
      throw error;
    });

	}

	validateForm(){
		const { c_client_id , c_name, c_phone, c_address } = this.state;
			if(c_name == "" && c_phone == "" && c_address == ""){
				this._start();
			}else if(c_name == ""){
				this._start();
			}else if(c_phone == "" || c_phone == "0"){
				this._start();
			}else if(c_address == ""){
				this._start();
			}else{
				if(c_client_id == ""){
					let data_ = JSON.stringify({
						c_name:this.state.c_name,
						c_phone:this.state.c_phone,
						c_address:this.state.c_address
					});
					this.sendData(routes.clients.add,data_);
				}else{
					let data_ = JSON.stringify({
						c_name:this.state.c_name,
						c_phone:this.state.c_phone,
						c_address:this.state.c_address,
						c_client_id: this.state.c_client_id,
					});
					this.sendData(routes.clients.update,data_);
				}
			}

	}
	render(){
    const { value, isLoaded, message_alert } = this.state;
		return(
			  <View style={[styles.container,{backgroundColor:'white',}]}>
          <View style={[styles.headerTitle,{flexDirection:'column', justifyContent:'flex-start',textAlign:'left',alignItems:'flex-start',height:95,resizeMode: 'contain'}]}>
              <Text style={[styles.title,{fontFamily:'Poppins-Bold', marginTop:15,}]}>Añade un nuevo cliente</Text>
							<Text style={[styles.textlight,{fontFamily:'Poppins'}]}>En esta zona puedes agrega un nuevo cliente a tu lista</Text>
          </View>
					<Animated.View style={[styles.toast,styles.bgGreen,{opacity: this.state.fadeValue,}]}>
          	<Text style={[styles.text,styles.textwhite,{position:'relative',right:20,fontFamily:'Poppins'}]}>{message_alert}</Text>
        	</Animated.View>
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
			      				onChangeText={text => this.setState({c_name:text})}
			      				value={this.state.c_name}
							/>
		  		</View>
					<View style={styles.input_group}>
						<FontAwesome name="mobile-phone" size={22} style={styles.iconInput} />
						<TextInput
						 style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
						 placeholder='(+57)'
		      			onChangeText={text => this.setState({c_phone:text})}
		      			value={this.state.c_phone}
							/>
					</View>
					<View style={styles.input_group}>
						<FontAwesome name="location-arrow" size={18} style={styles.iconInput} />
						<TextInput
						 style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
						 placeholder='Dirección'
		      			 onChangeText={text => this.setState({c_address:text})}
		      			 value={this.state.c_address}
						/>
					</View>
					<View style={[styles.input_group,{right:0,}]}>
					  <TouchableOpacity style={[styles.btnExpand,styles.btngreen]} onPress={()=> this._start()}>
						  <Text style={[styles.textwhite,{fontFamily:"Poppins",}]}>Agregar</Text>
					  </TouchableOpacity>
					</View>
          </View>
					{
						isLoaded ? (<View style={styles.container_preloader_expand}>
							<View style={styles.preloader}><ActivityIndicator size="large" /></View>
						</View>) : null
					}
    		</View>
			);
	}
}
