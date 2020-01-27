import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image, TextInput, ActivityIndicator, FlatList } from 'react-native';
import styles from '../styles/styles_template';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Balancebox extends React.Component{

	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	c_client_id:JSON.stringify(this.props.navigation.getParam('c_client_id', '')),
	  	balancetotal:0,
	  	data: this.props.data_
	  };

	  this.isMounted_ = false;
	  
	}

	shouldComponentUpdate(nextProps, nextState) {
    if (this.state.data != nextState.data){
      //alert('Los datos han cambiado...');
      return true;
    }else{
      return false;
    } 
  }

    componentDidUpdate(nextProps, nextState){
	    if(this.state.data !== nextState.data){
	      this.setState({balancetotal:this.total_balance});
	    }
  	}

	moneyFormat(num){
		num = num.toString();
		num = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
		return num;
	}

	formatdate(date){
		let newdate = date.substring(0,date.indexOf(" ")).split('-');
		let formatdate = newdate[2]+"/"+newdate[1]+"/"+newdate[0];
		return formatdate;
	}

    _renderItems_(item,index){
    	if(item == "" || item == "undefined" || item == null){
      		return  (<View style={[styles.container_preloader,{backgroundColor:'transparent'}]}>
        			<View style={styles.preloader}><ActivityIndicator size="large" /></View>
      			</View>)
    	}else{
    		if(Object.values(item) == "empty"){
    			return (
          			<View><Text style={{fontFamily:"Poppins",}}>Este cliente no tiene compras aun</Text></View>
        		);
    		}else{
    			total += parseInt(item.balance);
    			if(index > (this.props.data_.length-2)){
    				return(
    					<View>
		    				<View style={[styles.box_information,styles.borderGreen]}>
				               <Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Compra</Text>
				               <Text style={[styles.text,{fontFamily:"Poppins",}]}>Prenda: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>{item.p_name}</Text></Text>
				               <Text style={[styles.text,{fontFamily:"Poppins",}]}>Cantidad: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>{item.s_count}</Text></Text>
				               <Text style={[styles.text,{fontFamily:"Poppins",}]}>Fecha: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}> {this.formatdate(item.s_sale_date)}</Text></Text>
				               <Text style={[styles.text,{fontFamily:"Poppins",}]}>Valor: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>${this.moneyFormat(item.price)}</Text></Text>
				               <Text style={[styles.text,{fontFamily:"Poppins",}]}>Abono: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>${item.p_payment_product == "0" ? item.p_payment_product : this.moneyFormat(item.p_payment_product)}</Text></Text>
				               <Text style={[{fontFamily:"Poppins",},styles.bottomRight]}>Saldo: <Text style={[styles.textlight,{fontFamily:"Poppins-Bold",}]}>${this.moneyFormat(item.balance)}</Text></Text>
		               		</View>
	    					<View style={[styles.bar_show_state_,styles.bar_balance]}>
				                 <View style={[{flexDirection:'row',balignItems:'center'}]}>
									<Text style={[{fontFamily:"Poppins",left:3}]}>Saldo Total:</Text>
									<Text style={[styles.textlight,{fontFamily:"Poppins-Bold",top:-1}]}>${total}</Text>
								 </View>
	                		</View>
    					</View>
    					);
    			}else{
    				return(
    				  <View style={[styles.box_information,styles.borderGreen]}>
		                 <Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Compra</Text>
		                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Prenda: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>{item.p_name}</Text></Text>
		                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Cantidad: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>{item.s_count}</Text></Text>
		                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Fecha: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}> {this.formatdate(item.s_sale_date)}</Text></Text>
		                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Valor: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>${this.moneyFormat(item.price)}</Text></Text>
		                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Abono: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>${item.p_payment_product == "0" ? item.p_payment_product : this.moneyFormat(item.p_payment_product)}</Text></Text>
		                 <Text style={[{fontFamily:"Poppins",},styles.bottomRight]}>Saldo: <Text style={[styles.textlight,{fontFamily:"Poppins-Bold",}]}>${this.moneyFormat(item.balance)}</Text></Text>
               		  </View>
    				);
    			}
    			
    		}
    	}
    }

	render(){
		const { data } = this.state;
		return(
				<FlatList
                  contentContainerStyle={{ justifyContent: 'center', alignItems:'center'}}
                  style={{width:WIDTH,flexGrow:0 }}
                  data={data}
                  renderItem={({ item,index }) => this._renderItems_(item,index)}
                  keyExtractor={(item,index) => {return index.toString()}}
                />
				
			);
	}
}