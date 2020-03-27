import React from 'react';
import { TextInput, View ,Dimensions, TouchableOpacity, Image, Text, Picker, FlatList, ActivityIndicator, Alert,Animated} from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import services from "../request/services";
import routes from "../request/routes";
import DateTimePicker from '@react-native-community/datetimepicker';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;



export default class AddBalances extends React.Component{

	 constructor(props) {
  		super(props);
	  	this.state = {
		  value:'s',
		  c_client_id:JSON.stringify(this.props.navigation.getParam('c_client_id', '0')),
		  c_name_:'Selecciona un cliente',
		  s_sales_id:'Selecciona una venta',
		  amt:'0',
		  datepayment:'s',
		  clients:[''],
		  sales:[''],
		  isLoaded:false,
		  type:JSON.stringify(this.props.navigation.getParam('type', 'TODOS')),
		  countSale:'Selecciona la compra del cliente',
		  datesale: '',
		  date: new Date(),
		  mode: 'datetime',
      show: false,
      isDateTimePickerVisible: false,
      fadeValue: new Animated.Value(0),
		  message_alert: 'Por favor complete los campos vacios.',
		  bgalert:'',
	    };

	    this.isMounted_ = false;
	}

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.sales != nextState.sales){
  //     //alert('Los datos han cambiado...');
  //     return true;
  //   }else{
  //     return false;
  //   }

  //   //return false;
  // }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.sales !== this.state.sales) {
       //this.getSales();
       //alert('hola');
    }
  }

	componentDidMount(){
	  this.getSales();
	}

	componentWillUnmount(){
	 Animated.timing(this.state.fadeValue).stop();
     this.isMounted_ = false;
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

	// getClients(){
	// 	this.isMounted_ = true;
	//     const { type } = this.state;
	//     const URL = (type.replace(/\"/g,'') == "TODOS") ? routes.clients.list : routes.clients.list_new;
	//     services.request(URL,type)
	//     .then(res => res.json())
	//     .then(res => {
	//       if(this.isMounted_){
	//         this.setState({
	//           clients:res,
	//         });
	//         //this.arrayholder = res;
	//       }
	//     },
	//     (error) => {
	//       this.setState({
	//         isLoaded: true,
	//         error
	//       });
	//     }).catch(function(error) {
	//       Alert.alert(
	//         error.message
	//       )
	//      // ADD THIS THROW error
	//       throw error;
	//     });
 //    }

    getSales(){
		this.isMounted_ = true;
	    const { c_client_id } = this.state;
	    //alert("request data... " + c_client_id);
	    let _id_ = c_client_id.replace(/\"/g,'');
	    _id_ = (parseInt(_id_) > 0 ) ? _id_ : 'Selecciona un cliente';
	    let _data_ = JSON.stringify({c_client_id: _id_});
	    services.requestGet(routes.sales.list_id,_data_)
	    .then(res => res.json())
	    .then(res => {
	      if(this.isMounted_){
	        this.setState({
	          //isLoaded: false,
	          sales:res,
	        });
	        //this.arrayholder = res;
	      }
	    },
	    (error) => {
	      this.setState({
	        //isLoaded: true,
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

	save(){
		this.setState({isLoaded:true});
		const {c_client_id , s_sales_id, amt, datesale,date } = this.state;
		let _date_ = (datesale == "" || datesale == null) ? this.getFormateDate(date) : datesale;
		//alert(c_client_id + ' - ' + s_sales_id + ' - ' + amt + ' - ' + _date_);
	    let _data_ = JSON.stringify({c_client_id: c_client_id,s_sales_id:s_sales_id,amount:amt,p_date_payment:_date_});
	    let type_message = routes.balances.add.split('/');
	    services.requestSet(routes.balances.add,_data_)
	    .then(res => res.text())
	    .then(res => {
	      if(this.isMounted_){
	        this.setState({
	          isLoaded: false,
	          //sales:res,
	        });
	        //alert(res);
	          if(res == "ok"){
					if(type_message[5] == "add"){
						this.setState({message_alert:'Se ha añadido el bono del cliente correctamente!',bgalert:styles.bgroundGreen});
				  	this._start();
					}else{
						this.setState({message_alert:'Se ha actualizado el bono del cliente correctamente!',bgalert:styles.bgroundGreen});
				  	this._start();
					}

			  }else{
					if(type_message[5] == "add"){
						this.setState({message_alert:'Ah ocurrido un problema, intentelo de nuevo más tarde',bgalert:styles.bgroundYellow});
				  	this._start();
					}else{
						this.setState({message_alert:'Realice algunos cambios para actualizar el bono del cliente',bgalert:styles.bgroundYellow});
				  	this._start();
					}

			  }
	      }
	    },
	    (error) => {
	      this.setState({
	        isLoaded:false,
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

	onChangeText(text){
		this.setState({value:text});
	}
	getFormateDate(date_){
     let formatdate = date_.getDate()+"/"+(date_.getMonth()+1)+"/"+date_.getFullYear()+" "+date_.getHours()+":"+date_.getMinutes()+":"+date_.getSeconds();
     return formatdate;
    }

    setDate = (event, date) => {
	    date = date || this.state.date;
	    let formatdate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
	    //alert(formatdate);
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

	requestSaleitem(Value, itemIndex){
		alert('hola');
		this.setState({c_client_id: itemValue,c_name_:itemIndex});
		this.getSales();
	}


	render(){
    const { clients, c_client_id, s_sales_id, amt, datepayment, value, c_name_, sales, countSale,date, datesale, show, mode, bgalert, fadeValue, message_alert, isLoaded } = this.state;
    	let client = (c_name_ == "Selecciona un cliente") ? 0 : (c_name_-1),
    	scount = (countSale == "Selecciona la compra del cliente") ? 0 : (countSale-1);
		return(
			  <View style={[styles.container,{backgroundColor:'white',}]}>
          <View style={[styles.headerTitle,{flexDirection:'column', justifyContent:'flex-start',textAlign:'left',alignItems:'flex-start',height:95,resizeMode: 'contain'}]}>
              <Text style={[styles.title,{fontFamily:'Poppins-Bold', marginTop:15,}]}>Añade un nuevo saldo</Text>
			  <Text style={[styles.textlight,{fontFamily:'Poppins'}]}>En esta zona puedes agregar los saldos de tus clientes</Text>
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
							<Text style={[styles.textlight,{fontFamily:'Poppins',position:'absolute',top:11,left:25,width:(WIDTH-60),height:47,zIndex: 2}]}>{sales[scount].s_description == null ? countSale : sales[scount].s_description}</Text>
							<Picker
							selectedValue={s_sales_id}
							style={[{fontFamily:'Poppins',},styles.textlight,{position:'absolute',top:-5,left:15,width:(WIDTH-60),height:47,zIndex:1,color:'white'}]}
							itemStyle={{ fontFamily: 'Poppins' }}
							onValueChange={(itemValue, itemIndex) =>
								this.setState({s_sales_id: itemValue, countSale: itemIndex})
							}>
								<Picker.Item key="400" label="Selecciones la compra del cliente" value="0" />
			                    {sales.map((data,i) => {
			                          if((data == "" || data == undefined)){
			                            return <Picker.Item key="900" label="Selecciones un cliente para ver sus compras" color="#a4a6ac" value="load" />
			                          }else if(Object.values(data) == "empty" || data.response == "empty"){
			                            return <Picker.Item key="1400" label="Cliente sin ventas" color="#a4a6ac" value="none" />
			                          }else{
			                            return <Picker.Item key={i} value={data.s_sales_id} color="#a4a6ac" label={data.s_description} />
			                          }
			                    })}
							</Picker>

							</View>
						</View>
						<View style={styles.input_group}>
							<FontAwesome name="dollar" size={22} style={styles.iconInput} />
							<TextInput
							  style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
							  placeholder='0'
	      					  onChangeText={amt => this.setState({amt})}
	      				   	  value={amt}
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
	                   			  placeholder={datesale == "" ? this.getFormateDate(date) : datesale }
	                   			  editable={false}
	                   			  style={[styles.textlight,{fontFamily:'Poppins',right:5},]}
	                   			  value={datesale}
	                   			/>
							</TouchableOpacity>
						</View>
						<View style={[styles.input_group,{right:0,}]}>
							<TouchableOpacity style={[styles.btnExpand,styles.btngreen]} onPress={() => this.save()}>
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
