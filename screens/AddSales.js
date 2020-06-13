import React from 'react';
import { TextInput, View ,Dimensions, TouchableOpacity, Image, Text, Picker, Animated, ActivityIndicator} from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import services from "../request/services";
import routes from "../request/routes";
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import { connect } from 'react-redux';
import {
	addBalanceToClient,
  getBalanceToClients,
  showOptions,
  isOptionVisible,
  setIndexBalanceToClient,
  setSelectedBalanceToClientId,
  message,
  response,
  setResponse,
  setBalanceToClientToUpdate,
  IndexBalance
} from '../src/actions';


class AddSales extends React.Component{

	constructor(props) {
  		super(props);
	  	this.state = {
			  value:'',
			  language:'Selecciona un cliente',
			  product_id:parseInt(JSON.stringify(this.props.navigation.getParam('p_products_id', '400')).replace(/\"/g,'')),
				products:[''],
				indexproduct: 0,
				productname:'',
			  qty: JSON.stringify(this.props.navigation.getParam('qty', '0')).replace(/\"/g,''),
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
				isLoaded:false,
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
  	this.setState({datesale:this.getFormateDate(this.state.date)});
	this.getProducts();
  }
  componentWillUnmount() {
   	Animated.timing(this.state.fadeValue).stop();
		this.isMounted_ = false;
	}

	formatToTimeStamp(date){
		let newdate = date.substring(0,date.indexOf(" ")).split('/');
		let seconds = date.substring(date.indexOf(" "),date.length);
    	let formatdate = newdate[2]+"-"+newdate[1]+"-"+newdate[0]+seconds;
    	return formatdate;
	}
	sendData(URL,data_){
	   this.setState({isLoaded:true});
	   let response_ = false;
	   let type_message = URL.split('/');
		 const { products , product_id, indexproduct , _id, qty , price, datesale, c_client_id, s_sales_id} = this.state;
	   services.requestSet(URL,data_)
	   .then(res => {
	   	//alert(res);
		  this.setState({
		    isLoaded: false,
		    data_:res,
		  });
			let response = res.split('-');
			let productName = indexproduct > 0 ? products[indexproduct-1].p_name : products[indexproduct].p_name;
			let description = "Venta de "+qty+" "+productName+" por una valor de $ "+price;
			if(response[0] == "ok"){
				if(type_message[5] == "add"){
				  this.setState({message_alert:'Se realizo la venta correctamente!',bgalert:styles.bgroundGreen});
			  	this._start();

					//alert(datesale);
					let data_ = ({
						s_sales_id:response[1],
						p_products_id:product_id,
						p_name:productName,
						s_description:description,
						s_count:qty,
						price: price,
						s_sale_date:this.formatToTimeStamp(datesale),
						c_client_id: c_client_id,
						p_payment_product:0
          });
          this.props.addBalanceToClient(data_);
          //this.props.setSelectedBalanceToClientId(response[1]);
          this._start();

				}else{
				  this.setState({message_alert:'Se ha actualizado esta venta correctamente!',bgalert:styles.bgroundGreen});
					 let old_Data = this.props.balances.balances;
					let data_ = ({
						s_sales_id:s_sales_id,
						p_products_id:product_id,
						p_name:productName,
						s_description:description,
						s_count:qty,
						price: price,
						s_sale_date:this.formatToTimeStamp(datesale),
						c_client_id: c_client_id,
						p_payment_product:0
          });
          old_Data[this.props.balances.IndexBalance] = data_;
					this.props.setBalanceToClientToUpdate(old_Data);
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
			alert(error);
	   }).catch(function(error) {
        alert(
        	error.message
       	)
        // ADD THIS THROW error
       	throw error;
    });

	}

	validateForm(){

		const { product_id, products,indexproduct, qty, price, datesale, c_client_id,s_sales_id } = this.state;

			if(product_id == "0" || product_id == 0 || product_id == "" || product_id == "400" || product_id == 400){
				this.setState({message_alert: 'Por favor un producto',bgalert:styles.bgroundRed});
				this._start();
			}else if(price == "0" || price == 0 || price == ""){
				this.setState({message_alert: 'Por favor agregue el precio de la venta',bgalert:styles.bgroundRed});
				this._start();
			}else if(qty == "0" || qty == 0 || qty == ""){
				this.setState({message_alert: 'Por favor agregue la cantidad vendida',bgalert:styles.bgroundRed});
				this._start();
			}else{
				let productName = indexproduct > 0 ? products[indexproduct-1].p_name : products[indexproduct].p_name;
				if(s_sales_id == ""){
					let data_ = JSON.stringify({
						p_product_id:product_id,
						productname:productName,
						qty:qty,
						price: price,
						s_sale_date:datesale,
						c_client_id: c_client_id
					});
					//alert('adding...');
					this.sendData(routes.sales.add,data_);
				}else{
					let data_ = JSON.stringify({
						p_product_id:product_id,
						productname:productName,
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

	getProducts(){
		this.isMounted_ = true;
		const { type } = this.state;
		this.setState({isLoaded:true})
		services.requestGet(routes.products.list,type)
		.then(res => {
			if(this.isMounted_){
				//Get all products our data base
				//alert(res);
				if(this.state.product_id != 400){
					let _index_ = res.indexOf(res.find(element => element.p_products_id == this.state.product_id));
					this.setState({products:res,productname:res[_index_].p_name});
				}else{
					this.setState({products:res});
				}
			}
		},
		(error) => {
			this.setState({
				//isLoaded: false,
				error
			});
		}).finally(() => {
			this.setState({isLoaded:false});
			this.isMounted_ = false;
		}).catch(function(error) {
			alert(
				error.message
			);

		 // ADD THIS THROW error
			throw error;
		});
	}

	render(){
    const { qty, products, product_id, productname, indexproduct, date, datesale, show, mode, bgalert, fadeValue, message_alert, price, isLoaded } = this.state;

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
							<Text style={[styles.textlight,{fontFamily:'Poppins',position:'absolute',top:11,left:25,width:(WIDTH-60),height:47,zIndex: 2}]}>{(indexproduct > 0 && (product_id != "400" || product_id != 400)) ? products[indexproduct-1].p_name : (indexproduct == 0 && (product_id != 400 || product_id != "400")) ?  productname : products[indexproduct].p_name }</Text>
							<Picker
							selectedValue={this.state.product_id}
							style={[{fontFamily:'Poppins',},styles.textlight,{position:'absolute',top:-5,left:15,width:(WIDTH-60),height:47,zIndex:1,color:'white'}]}
							itemStyle={{ fontFamily: 'Poppins' }}
							onValueChange={(itemValue, itemIndex) =>
								this.setState({product_id: itemValue,indexproduct: itemIndex})
							}>
								<Picker.Item key="400" label="Selecciona un producto" value="400" />
	              {this.state.products.map((data,i) => {
	                    if((data == "" || data == undefined)){
	                      return <Picker.Item key="900" label="Selecciona un producto" color="#a4a6ac" value="load" />
	                    }else if(Object.values(data) == "empty" || data.response == "empty"){
	                      return <Picker.Item key="1400" label="No hay productos en el inventario" color="#a4a6ac" value="none" />
	                    }else{
	                      return <Picker.Item key={i} value={data.p_products_id} color="#a4a6ac" label={data.p_name} />
	                    }
	              })}
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
						{
              isLoaded ? (<View style={styles.container_preloader_expand}>
                <View style={styles.preloader}><ActivityIndicator size="large" /></View>
              </View>) : null
            }
    		</View>
			);
	}
}


const mapStateToProps = state => {
  return {
    balances: state.balances
  }
}

const mapDispatchToProps = {
	addBalanceToClient,
  getBalanceToClients,
  showOptions,
  isOptionVisible,
  setIndexBalanceToClient,
  setSelectedBalanceToClientId,
  message,
  response,
  setResponse,
  setBalanceToClientToUpdate,
  IndexBalance
};

export default connect( mapStateToProps , mapDispatchToProps )(AddSales)
