import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons } from '@expo/vector-icons';
import services from "../request/services";
import routes from "../request/routes";


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default class Home extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      fontsLoaded: false,
      poppins:'',
      poppinsBold:'',
      value:'',
      showing:false,
      expand:true,
      nameicon:'md-arrow-up',
      nameorder:'ASCENDENTE',
      data:[''],
      c_client_id: JSON.stringify(this.props.navigation.getParam('c_client_id','')).replace(/\"/g,'')
    };
    this._count_ = 0;
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
  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.getShopping();
    }
  }

  componentDidMount(){
    this.isMounted_ = false;
    this.getShopping();
  }

  componentWillUnmount(){
    this.isMounted_ = false;
  }
  
  moneyFormat(num){
    num = (num == "") ? 0 : num;
    num = (num == null) ? 0 : num;
    num = num.toString();
    num = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return num;
  }

  formatdate(date){
    let newdate = date.substring(0,date.indexOf(" ")).split('-');
    let formatdate = newdate[2]+"/"+newdate[1]+"/"+newdate[0];
    return formatdate;
  }

    _renderItems_(item,index,total){
      let balance = 0;

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
          balance += parseFloat(item.p_payment_product.toString().replace(/\-/g,''));
          if(index > (this.state.data.length-2)){
            return(
              <View>
                <View style={[styles.box_information,styles.borderGreen]}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Balancedetails',{c_client_id:item.c_client_id,c_name:item.c_name,s_sale_id:item.s_sales_id,description:item.s_description,date:item.s_sale_date,balance:(parseInt(item.price) - parseInt(item.p_payment_product)),})}><Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Compra</Text></TouchableOpacity>
                  <Text style={[styles.text,{fontFamily:"Poppins",}]}>Prenda: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>{item.p_name}</Text></Text>
                  <Text style={[styles.text,{fontFamily:"Poppins",}]}>Cantidad: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>{item.s_count}</Text></Text>
                  <Text style={[styles.text,{fontFamily:"Poppins",}]}>Fecha: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}> {this.formatdate(item.s_sale_date)}</Text></Text>
                  <Text style={[styles.text,{fontFamily:"Poppins",}]}>Valor: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>${this.moneyFormat(item.price)}</Text></Text>
                  <Text style={[styles.text,{fontFamily:"Poppins",}]}>Abono: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>${item.p_payment_product == "0" ? item.p_payment_product : this.moneyFormat(item.p_payment_product)}</Text></Text>
                  <Text style={[{fontFamily:"Poppins",},styles.bottomRight]}>Saldo: <Text style={[styles.textlight,{fontFamily:"Poppins-Bold",}]}>${this.moneyFormat((parseInt(item.price) - parseInt(item.p_payment_product)))}</Text></Text>
                </View>
                <View style={[styles.bar_show_state_,styles.bar_balance]}>
                    <View style={[{flexDirection:'row',balignItems:'center'}]}>
                      <Text style={[{fontFamily:"Poppins",left:3}]}>Saldo Total:</Text>
                      <Text style={[styles.textlight,{fontFamily:"Poppins-Bold",top:-1}]}>${this.moneyFormat(total)}</Text>
                    </View>
                </View>
              </View>
              );
          }else{
            return(
              <View style={[styles.box_information,styles.borderGreen]}>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('Balancedetails',{c_client_id:item.c_client_id,c_name:item.c_name,s_sale_id:item.s_sales_id,description:item.s_description,date:item.s_sale_date,balance:(parseInt(item.price) - parseInt(item.p_payment_product)),})}><Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Compra</Text></TouchableOpacity>
                     <Text style={[styles.text,{fontFamily:"Poppins",}]}>Prenda: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>{item.p_name}</Text></Text>
                     <Text style={[styles.text,{fontFamily:"Poppins",}]}>Cantidad: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>{item.s_count}</Text></Text>
                     <Text style={[styles.text,{fontFamily:"Poppins",}]}>Fecha: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}> {this.formatdate(item.s_sale_date)}</Text></Text>
                     <Text style={[styles.text,{fontFamily:"Poppins",}]}>Valor: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>${this.moneyFormat(item.price)}</Text></Text>
                     <Text style={[styles.text,{fontFamily:"Poppins",}]}>Abono: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>${item.p_payment_product == "0" ? item.p_payment_product : this.moneyFormat(item.p_payment_product)}</Text></Text>
                     <Text style={[{fontFamily:"Poppins",},styles.bottomRight]}>Saldo: <Text style={[styles.textlight,{fontFamily:"Poppins-Bold",}]}>${this.moneyFormat((parseInt(item.price) - parseInt(item.p_payment_product)))}</Text></Text>
              </View>
            );
          }
          
        }
      }
      
  }

  getShopping(){
    this.isMounted_ = true;
    const { c_client_id } = this.state;
    let id = JSON.stringify({c_client_id: c_client_id});
    services.request(routes.sales.list_id,id)
    .then(res => res.json())
    .then(res => {
      if(this.isMounted_){
        this.setState({
          isLoaded: true,
          data:res,
        });
      }
    },
    (error) => {
      this.setState({
        isLoaded: true,
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

  onchangetext(text){
    let lenghtText = text.toString();
    if(lenghtText.length > 0){
      this.setState({value:text,showing:true,expand:false});
    }else{
      this.setState({value:text,showing:false,expand:true});
    }

  }
  changeOrder(){
    if(this._count_ == 0){
      this.setState({nameicon:'md-arrow-down',nameorder:'DESCENDENTE'});
      this._count_ = 1;
    }else{
      this.setState({nameicon:'md-arrow-up',nameorder:'ASCENDENTE'});
      this._count_ = 0;
    }
  }

  render(){
		const { fontsLoaded, poppins, poppinsBold, value, showing, expand, nameicon, nameorder,data } = this.state;
    var total = 0;
    data.map((item,i) => {
      total += parseInt(item.price) - parseInt(item.p_payment_product);
    });  
      return(
        <View style={styles.container}>
             <View style={[styles.container_divider,styles.container_divider_white]}>
               <View style={styles.panel_left}>
                 <Image source={require('../images/user.png')} style={styles.avatar} />
               </View>
               <View style={styles.panel_right}>
                 <Text style={[styles.title,{fontFamily:"Poppins-Bold",fontSize:12,marginTop:9,}]}>{JSON.stringify(this.props.navigation.getParam('c_name', 'Administrador')).replace(/\"/g,"")}</Text>
                 <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:11,}]}>(+57) {JSON.stringify(this.props.navigation.getParam('c_phone', '000')).replace(/\"/g,"")}</Text>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundGreen]}></View>
                   <Text style={[styles.text,{fontFamily:"Poppins",fontSize:12,}]}>Cliente constante</Text>
                 </View>
                 <TouchableOpacity style={styles.btnfavorites}>
                    <Ionicons name="md-star" color="#a4a6ac" size={22} />
                 </TouchableOpacity>
               </View>
             </View>
             <View style={styles.body_}>
               <View style={styles.headerTitle}>
                  <Text style={[styles.textlight,{fontSize:12},{fontFamily:"Poppins",}]}>TODOS</Text>
                  <TouchableOpacity style={styles.buttonorder} onPress={() => this.changeOrder()}>
                    <Text style={[styles.textlight,{fontSize:12},{fontFamily:"Poppins",}]}>{nameorder}</Text>
                    <Ionicons
                      name={nameicon}
                      color="#a4a6ac"
                      size={18}
                      style={styles.iconArrow}
                     />
                   </TouchableOpacity>
               </View>
               <View style={styles.bar_show_state_}>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundGreen]}></View>
                   <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:13,}]}>Controlado</Text>
                 </View>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundYellow]}></View>
                   <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:13,}]}>Regulado</Text>
                 </View>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundPurpple]}></View>
                   <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:13,}]}>Abandonado</Text>
                 </View>
               </View>
               <FlatList
                 contentContainerStyle={{ justifyContent: 'center', alignItems:'center'}}
                 style={{width:WIDTH,flexGrow:0 }}
                 data={data}
                 renderItem={({ item,index }) => this._renderItems_(item,index,total)}
                 keyExtractor={(item,index) => {return index.toString()}}
               />
             </View>
        </View>
      );
	}
}
