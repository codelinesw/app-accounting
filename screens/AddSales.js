import React from 'react';
import { TextInput, View ,Dimensions, TouchableOpacity, Image, Text, Picker, Animated} from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import services from "../request/services";
import routes from "../request/routes";
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;



export default class AddSales extends React.Component{

	constructor(props) {
  		super(props);
	  	this.state = {
		  value:'',
		  language:'Selecciona un cliente',
		  product:parseInt(JSON.stringify(this.props.navigation.getParam('product', '1')).replace(/\"/g,'')),
		  productname: [
		  	'Jean',
		  	'Bermuda',
		  	'Blusa Mujer',
		  	'Boxer',
		  	'Buso Hombre',
		  	'Camisa Hombre',
		  	'Leggis'
		  ],
		  qty: JSON.stringify(this.props.navigation.getParam('qty', '1')).replace(/\"/g,''),
		  price: JSON.stringify(this.props.navigation.getParam('price', '0')).replace(/\"/g,''),
		  datesale: '',
		  date: new Date(),
		  mode: 'datetime',
      	  show: false,
      	  isDateTimePickerVisible: false,
      	  fadeValue: new Animated.Value(0),
		  message_alert: 'Por favor complete los campos vacios.',
		  val: true,
		  bgalert:'',
		  c_client_id: JSON.stringify(this.props.navigation.getParam('c_client_id', '')).replace(/\"/g,''),
		  s_sales_id: JSON.stringify(this.props.navigation.getParam('s_sales_id', '')).replace(/\"/g,'')
	    };
	}

	_start = () => {

	   const { fadeValue } = this.state;

	    Animated.sequence([
            Animated.parallel([
              Animated.timing(fadeValue, {
                toValue: 1,
                duration: 400,
              }),

            ]),
            Animated.delay(2500),
	        Animated.parallel([
	          Animated.timing(fadeValue, {
	            toValue: 0,
	            duration: 400,
	          }),
	        ]),
         ]).start();


  	};
  	componentDidMount(){
  		this.setState({datesale:this.getFormateDate(this.state.date)})
  	}
  	componentWillUnmount() {
   	  Animated.timing(this.state.fadeValue).stop();
	}
	sendData(URL,data_){
	   this.setState({isLoaded:true});
	   let response_ = false;
	   let type_message = URL.split('/');
	   services.requestSet(URL,data_)
	   .then(res => res.text())
	   .then(res => {
	   	//alert(res);
		  this.setState({
		    isLoaded: false,
		    data_:res,
		  });

		  if(res == "ok"){
				if(type_message[5] == "add"){
				  this.setState({message_alert:'Se realizo la venta correctamente!',bgalert:styles.bgroundGreen});
			  	  this._start();
				}else{
				  this.setState({message_alert:'Se ha actualizado esta venta correctamente!',bgalert:styles.bgroundGreen});
			  	  this._start();
				}

		  }else{
				if(type_message[5] == "add"){
				  this.setState({message_alert:'Ah ocurrido un problema, intentelo de nuevo más tarde',bgalert:styles.bgroundYellow});
			  	  this._start();
				}else{
				  this.setState({message_alert:'Realice algunos cambios para actualizar la informacion de esta venta',bgalert:styles.bgroundYellow});
			  	  this._start();
				}

		  }
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

		const { product, productname, qty, price, datesale, c_client_id,s_sales_id } = this.state;

			if(price == "0" || price == 0 || price == ""){
				this.setState({message_alert: 'Por favor agregue el precio de la venta',bgalert:styles.bgroundRed});
				this._start();
			}else if(qty == "0" || qty == 0 || qty == ""){
				this.setState({message_alert: 'Por favor agregue la cantidad vendida',bgalert:styles.bgroundRed});
				this._start();
			}else{
				if(s_sales_id == ""){
					let data_ = JSON.stringify({
						p_product_id:product,
						productname:productname[product-1],
						qty:qty,
						price: price,
						s_sale_date:datesale,
						c_client_id: c_client_id,
					});
					//alert('adding...');
					this.sendData(routes.sales.add,data_);
				}else{
					let data_ = JSON.stringify({
						p_product_id:product,
						productname:productname[product-1],
						qty:qty,
						price: price,
						s_sale_date:datesale,
						c_client_id: c_client_id,
						s_sales_id: s_sales_id
					});
					//alert('updating...');
					this.sendData(routes.sales.update,data_);
				}
			}

	}

	getFormateDate(date_){
     let formatdate = date_.getDate()+"/"+(date_.getMonth()+1)+"/"+date_.getFullYear()+" "+date_.getHours()+":"+date_.getMinutes()+":"+date_.getSeconds();
     return formatdate;
    }

    setDate = (event, date) => {
	    date = date || this.state.date;
	    let formatdate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
	    this.setState({
	      show: Platform.OS === 'ios' ? true : false,
	      date,
	      datesale:formatdate,
	    });
    }

	show = mode => {
	  this.setState({
	    show: true,
	    mode,
	  });
	}

	datepicker = () => {
	  this.show('date');
	}

	timepicker = () => {
	  this.show('time');
	}

	render(){
    const { qty, product, product_id, productname, date, datesale, show, mode, bgalert, fadeValue, message_alert, price } = this.state;
		return(
			  <View style={[styles.container,{backgroundColor:'white',}]}>
          <View style={[styles.headerTitle,{flexDirection:'column', justifyContent:'flex-start',textAlign:'left',alignItems:'flex-start',height:95,resizeMode: 'contain'}]}>
              <Text style={[styles.title,{fontFamily:'Poppins-Bold', marginTop:15,}]}>No te olvides de añadir tus ventas</Text>
							<Text style={[styles.textlight,{fontFamily:'Poppins'}]}>En esta zona puedes agregar las ventas que le has hecho a tus clientes</Text>
          </View>
          <Animated.View style={[styles.toast,bgalert,{opacity: fadeValue}]}>
          	<Text style={[styles.textwhite,{position:'relative',left:7,fontFamily:'Poppins'}]}>{message_alert}</Text>
          </Animated.View>
          <View style={[styles.body,{justifyContent:'center',alignItems:'center'}]}>
						<View style={styles.input_group}>
							<View style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}>
							<Ionicons
								name="md-shirt"
								color="#a4a6ac"
								size={19}
								style={[styles.iconInput,{left:8,},]}
							 />
							<Text style={[styles.textlight,{fontFamily:'Poppins',position:'absolute',top:11,left:25,width:(WIDTH-60),height:47,zIndex: 2}]}>{productname[product-1]}</Text>
							<Picker
							selectedValue={this.state.product}
							style={[{fontFamily:'Poppins',},styles.textlight,{position:'absolute',top:-5,left:15,width:(WIDTH-60),height:47,zIndex:1,color:'white'}]}
							itemStyle={{ fontFamily: 'Poppins' }}
							onValueChange={(itemValue, itemIndex) =>
								this.setState({product: itemValue})
							}>
								<Picker.Item label="Jean" color="#a4a6ac" value="1" />
								<Picker.Item label="Bermudas" color="#a4a6ac" value="2" />
								<Picker.Item label="Blusas" color="#a4a6ac" value="3" />
								<Picker.Item label="Boxer" color="#a4a6ac" value="4" />
								<Picker.Item label="Busos Hombre" color="#a4a6ac" value="5" />
								<Picker.Item label="Camisa Hombre" color="#a4a6ac" value="6" />
								<Picker.Item label="Leggis" color="#a4a6ac" value="7" />
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
      						  onChangeText={count => this.setState({qty:count})}
      					      value={qty}
							/>
						</View>
						<View style={styles.input_group}>
						<FontAwesome name="dollar" size={22} style={styles.iconInput} />
							<TextInput
							 style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
							 placeholder='0'
      					     onChangeText={val => this.setState({price:val})}
      					     value={price}
							/>
						</View>
						<View style={styles.input_group}>
						    { show && <DateTimePicker value={date}
			                    mode={mode}
			                    is24Hour={true}
			                    display="default"
			                    onChange={this.setDate} />
                  			}
							<FontAwesome name="calendar" size={18} style={[styles.iconInput,{top:14,}]} />
							<TouchableOpacity style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]} onPress={this.datepicker}>
								<TextInput
	                   			  placeholder={datesale == "" ? this.getFormateDate(date) : datesale}
	                   			  editable={false}
	                   			  style={[styles.textlight,{fontFamily:'Poppins',right:5},]}
	                   			  value={datesale}
	                   			/>
							</TouchableOpacity>
						</View>
						<View style={[styles.input_group,{right:0,}]}>
							<TouchableOpacity style={[styles.btnExpand,styles.btngreen]} onPress={() => this.validateForm()}>
								<Text style={[styles.textwhite,{fontFamily:"Poppins"}]}>Agregar</Text>
							</TouchableOpacity>
						</View>
          			</View>
    		</View>
			);
	}
}
