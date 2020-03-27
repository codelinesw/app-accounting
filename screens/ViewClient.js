import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator, Animated, Modal, Alert } from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
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
      fadeValue: new Animated.Value(0),
      fadeValueAlert:new Animated.Value(0),
      bottomValue: new Animated.Value(0),
      c_client_id: JSON.stringify(this.props.navigation.getParam('c_client_id','0')).replace(/\"/g,''),
      s_sales_id: 0,
      isSelected:0,
      bground:'',
      bottomValue: new Animated.Value(0),
      isSelected:0,
      message_alert: 'Por favor complete los campos vacios.',
      bgalert:'',
      showingPreloader:false,
      modalVisible:false,
      product:1,
      qty:1,
      price:0,
      datesale:''
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
      let c_client_id = JSON.stringify(prevProps.navigation.getParam('c_client_id','')).replace(/\"/g,'');
      this.getShopping(c_client_id);
    }
  }

  componentDidMount(){
    this.isMounted_ = false;
    this.getShopping();
  }

  componentWillUnmount(){
    this.isMounted_ = false;
  }

  activeElementForDelete(id,p_product_id,s_count,s_sale_date,price){

    this._id_ = id;
    this.setState({
      bground:styles.bgroundActive,
      s_sales_id:id,
      isSelected:id,
      product:p_product_id,
      qty:s_count,
      datesale:s_sale_date,
      price:price
    });


    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.fadeValue, {
          toValue: 1,
          duration: 100,
        }),

      ]),
      Animated.delay(50),
      Animated.parallel([
        Animated.timing(this.state.bottomValue, {
          toValue: 90,
          duration: 100,
        }),
      ]),
    ]).start();
  }

  inactiveElementForDelete(data){
    this.setState({bground:styles.bgGray,isSelected:0,s_sales_id:0});
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.fadeValue, {
          toValue: 0,
          duration: 100,
        }),

      ]),
      Animated.delay(50),
      Animated.parallel([
        Animated.timing(this.state.bottomValue, {
          toValue: 50,
          duration: 100,
        }),
      ]),
    ]).start();

    this.props.navigation.navigate('Balancedetails',data);

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
            //alert(this.state.isSelected);
            return(
              <View>
                <View style={[styles.box_information,styles.borderGreen,styles.select_box_information,]}>
                  <FontAwesome name="check-circle" size={19} style={[{position:'absolute',right:10,top:10, color:'#59f090'},this.state.isSelected == item.s_sales_id ? {opacity:1} : {opacity:0}]} />
                  <TouchableOpacity onPress={() => this.inactiveElementForDelete({c_client_id:item.c_client_id,c_name:item.c_name,s_sale_id:item.s_sales_id,description:item.s_description,date:item.s_sale_date,balance:(parseInt(item.price) - parseInt(item.p_payment_product)),}) } onLongPress={() => this.activeElementForDelete(item.s_sales_id,item.p_products_id,item.s_count,item.s_sale_date,item.price)}><Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Compra</Text></TouchableOpacity>
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
            //alert(this.state.isSelected);
            return(
              <View style={[styles.box_information,styles.borderGreen]}>
                <FontAwesome name="check-circle" size={19} style={[{position:'absolute',right:10,top:10, color:'#59f090'},this.state.isSelected == item.s_sales_id ? {opacity:1} : {opacity:0}]} />
                <TouchableOpacity onPress={() => this.inactiveElementForDelete({c_client_id:item.c_client_id,c_name:item.c_name,s_sale_id:item.s_sales_id,description:item.s_description,date:item.s_sale_date,balance:(parseInt(item.price) - parseInt(item.p_payment_product)),}) } onLongPress={() => this.activeElementForDelete(item.s_sales_id,item.p_products_id,item.s_count,item.s_sale_date,item.price)}><Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Compra</Text></TouchableOpacity>
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

  getShopping(id){
    this.isMounted_ = true;
    if((id == "" || id == "0") || id == null){
        const { c_client_id } = this.state;
        let _id_ = JSON.stringify({c_client_id: c_client_id});
        services.requestGet(routes.sales.list_id,_id_)
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

    }else{
      let id_ = JSON.stringify({c_client_id: id});
      services.requestGet(routes.sales.list_id,id_)
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

  }

  _start = () => {

     const { fadeValueAlert } = this.state;
     Animated.sequence([
           Animated.parallel([
             Animated.timing(fadeValueAlert, {
               toValue: 1,
               duration: 400,
             }),

           ]),
           Animated.delay(2500),
         Animated.parallel([
           Animated.timing(fadeValueAlert, {
             toValue: 0,
             duration: 400,
           }),
         ]),
     ]).start();


     Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.fadeValue, {
          toValue: 0,
          duration: 100,
        }),

      ]),
      Animated.delay(50),
      Animated.parallel([
        Animated.timing(this.state.bottomValue, {
          toValue: 50,
          duration: 100,
        }),
      ]),
    ]).start();

  };

  deleteSales(){
    let data_ = JSON.stringify({
      s_sales_id: this.state.s_sales_id,
    });
    services.requestSet(routes.sales.delete,data_)
    .then(res => res.text())
    .then(res => {
      //alert(res);
      if(res == "ok"){
        this.setState({message_alert:'Se ha eliminado el venta correctamente!',bgalert:styles.bgroundGreen});
        this._start();
        this.setState({modalVisible:false,c_client_id:0});
      }else{
        this.setState({message_alert:'Ah ocurrido un error al intentar eliminar esta venta',bgalert:styles.bgroundRed});
        this._start();
        this.setState({modalVisible:false,c_client_id:0});
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

  showModal(){
    //alert('showing...');
    this.setState({modalVisible:true});
  }

  hideModal(){
    this.setState({modalVisible:false});
  }

  goToEdit(){
    const { s_sales_id , product , qty, datesale, price, c_client_id } = this.state;
    //alert(product);
    this.props.navigation.navigate('AddSales',{product:product,s_sales_id:s_sales_id,qty:qty,datesale:datesale, price:price, c_client_id: c_client_id});
  }

  render(){
		const { fontsLoaded, poppins, poppinsBold, value, showing, expand, nameicon, nameorder,data, fadeValue, fadeValueAlert,bottomValue,message_alert,bgalert,showingPreloader,modalVisible } = this.state;
    var total = 0;
    data.map((item,i) => {
      total += parseInt(item.price) - parseInt(item.p_payment_product);
    });
      return(
        <View style={styles.container}>
             <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
            >
              <View style={styles.containerModal}>
                <View style={[styles.containerOptions,styles.containerOptionsExpand]}>
                  <Text style={[styles.title,{fontFamily:'Poppins-Bold',right:5,marginTop:4,}]}>¿Deseas Eliminar esta Venta?</Text>
                  <Text style={[{fontFamily:'Poppins',left:5,color:'#a4a6ac'}]}>Recuerda que al aceptar,esta venta sera removida de este cliente</Text>
                  <View style={styles.containerButton}>
                    <TouchableOpacity style={[styles.btnwground,{fontFamily:'Poppins'}]} onPress={() => this.deleteSales()}><Text style={[{fontSize:12,color:'#5c5b5e',fontFamily:'Poppins-Bold',},styles.textgreen]}>ACEPTAR</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.btnwground,{fontFamily:'Poppins'}]} onPress={() => this.hideModal()}><Text style={[{fontSize:12,color:'#5c5b5e',fontFamily:'Poppins-Bold',},styles.textgreen]}>CANCELAR</Text></TouchableOpacity>
                  </View>
                </View>
                {
                  showingPreloader ? <View style={[styles.container_preloader,{backgroundColor:'transparent'},styles.containerOptionsExpandPreloader]}>
                    <View style={[styles.preloader,{top:-13}]}><ActivityIndicator size="large" /></View>
                  </View> : null
                }
              </View>
            </Modal>
            <Animated.View style={[styles.toast,bgalert,{opacity: fadeValueAlert}]}>
              <Text style={[styles.textwhite,{position:'relative',left:7,fontFamily:'Poppins'}]}>{message_alert}</Text>
             </Animated.View>
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
             <Animated.View style={[styles.container_float_bottom,{opacity: fadeValue, bottom: bottomValue}]}>
                 <View style={[styles.btnGroup,{top:1,width:(WIDTH-180),textAlign:'center',justifyContent:'center',alignItems:'center'}]}>
                   <TouchableOpacity style={[styles.btnwground,styles.btntextcenter,{borderRightWidth:1,borderRightColor:'#e1e1e6',width:90}]} onPress={() => this.goToEdit()}>
                     <FontAwesome name="edit" size={22} style={[styles.iconInput,{position:'relative',left:0,top:-2,color:'#c4cdff'}]} />
                   </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnwground,styles.btntextcenter]} onPress={() => this.showModal()}>
                     <FontAwesome name="trash-o" size={22} style={[styles.iconInput,{position:'relative',left:-8,top:-2,color:'#c4cdff'}]} />
                   </TouchableOpacity>
                 </View>
             </Animated.View>
        </View>
      );
	}
}
