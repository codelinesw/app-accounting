import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity,TouchableWithoutFeedback, Image, TextInput, FlatList, ActivityIndicator, Animated } from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import services from "../request/services";
import routes from "../request/routes";


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default class Balancedetails extends React.Component{

  _id_ = 0;
  static deleteItems = () => {
    const { p_payment_product_id } = this.state;
    alert('handle press ->  ' + this.state.p_payment_product_id);
  }
  
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
      c_client_id: JSON.stringify(this.props.navigation.getParam('c_client_id','0')).replace(/\"/g,""),
      s_sales_id: JSON.stringify(this.props.navigation.getParam('s_sale_id','0')).replace(/\"/g,""),
      bground:'',
      p_payment_product_id:0,
      fadeValue: new Animated.Value(0),
      bottomValue: new Animated.Value(0)
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

  activeElementForDelete(id){
    this._id_ = id;
    this.setState({bground:styles.bgroundActive,p_payment_product_id:id});
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.fadeValue, {
          toValue: 1,
          duration: 100,
        }),

      ]),
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(this.state.bottomValue, {
          toValue: 90,
          duration: 100,
        }),
      ]),
    ]).start();
  }

  inactiveElementForDelete(){
    this.setState({bground:''});
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
                <View><Text style={{fontFamily:"Poppins",}}>Este cliente no ha hecho abonos aun</Text></View>
            );
        }else{
          return (
              <TouchableWithoutFeedback onPress={() => this.inactiveElementForDelete()} onLongPress={() => this.activeElementForDelete(item.p_payment_product_id)}>
                <View style={[styles.container_payment_client,this.state.bground]}>
                   <View style={styles.panelLeft_}>
                     <Text style={[styles.text,{fontFamily:'Poppins-Bold',marginTop:3,marginBottom:0,}]}>Abono por el siguiente valor -></Text>
                     <Text style={[styles.textlight,{fontFamily:'Poppins',top:-2,}]}>Fue realizado el {this.formatdate(item.p_date_payment)}</Text>
                   </View>
                   <View style={styles.panelRight_}>
                     <Text style={[styles.text,{fontFamily:'Poppins-Bold',marginTop:3,marginBottom:0,right:5,top:16}]}>${this.moneyFormat(item.p_payment_product)}</Text>
                   </View>
                </View>
              </TouchableWithoutFeedback>
            );
        }
      }
      
  }

  getShopping(){
    this.isMounted_ = true;
    const { c_client_id, s_sales_id } = this.state;
    let id = JSON.stringify({c_client_id: c_client_id,s_sales_id:s_sales_id});
    services.request(routes.sales.list_id_sale,id)
    .then(res => res.json())
    .then(res => {
      //alert(JSON.stringify(res));
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
		const { fontsLoaded, poppins, poppinsBold, value, showing, expand, nameicon, nameorder,data,fadeValue, bottomValue } = this.state;
    var total = 0;
      return(
        <View style={styles.container}>
             <View style={[styles.container_divider,styles.container_divider_green]}>
               <View style={styles.balancedescription}>
                 <View style={[styles.panelTop,{borderTopLeftRadius:6,borderTopRightRadius:6,backgroundColor:'transparent'}]}>
                   <View style={[styles.container_divider,styles.container_divider_white,{top:-2,width:(WIDTH-25),height:70,borderBottomWidth:0,borderTopLeftRadius:6,borderTopRightRadius:6}]}>
                     <View style={styles.panel_left}>
                       <Image source={require('../images/user.png')} style={styles.avatar} />
                     </View>
                     <View style={styles.panel_right}>
                       <Text style={[styles.title,{fontFamily:"Poppins-Bold",fontSize:12,marginTop:9,}]}>{JSON.stringify(this.props.navigation.getParam('c_name','Administrador')).replace(/\"/g,"")}</Text>
                       <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:11,width:200,}]}>Venta de {JSON.stringify(this.props.navigation.getParam('description','Administrador')).replace(/\"/g,"")}</Text>
                     </View>
                    </View>
                 </View>
                 <View style={styles.panelBottom}>
                   <View style={[styles.info_balance_,{flexDirection:'row',justifyContent:'space-between'}]}>
                     <View>
                       <Text style={[styles.textlight,{fontFamily:'Poppins'}]}>Saldo</Text>
                       <Text style={[styles.text,{fontFamily:'Poppins-Bold'}]}>${this.moneyFormat(JSON.stringify(this.props.navigation.getParam('balance','0')).replace(/\"/g,""))}</Text>
                     </View>
                     <View>
                       <Text style={[styles.textlight,{fontFamily:'Poppins'}]}>Fecha</Text>
                       <Text style={[styles.text,{fontFamily:'Poppins-Bold'}]}>{this.formatdate(JSON.stringify(this.props.navigation.getParam('date','Administrador')).replace(/\"/g,""))}</Text>
                     </View>
                     <View>
                       <Text style={[styles.textlight,{fontFamily:'Poppins'}]}>Estado</Text>
                       <View style={{flexDirection:'row'}}>
                         <View style={[styles.circle,styles.bgroundGreen]}></View>
                         <Text style={[styles.text,{fontFamily:"Poppins-Bold",fontSize:12,}]}>Pagado</Text>
                       </View>
                     </View>
                   </View>
                 </View>
               </View>
             </View>
             <View style={styles.body_}>
               <View style={[styles.headerTitle,{marginTop:50}]}>
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
                   <TouchableOpacity style={[styles.btnwground,styles.btntextcenter,{borderRightWidth:1,borderRightColor:'#e1e1e6',width:90}]}>
                     <FontAwesome name="edit" size={22} style={[styles.iconInput,{position:'relative',left:0,top:-2,color:'#c4cdff'}]} />
                   </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnwground,styles.btntextcenter]}>
                     <FontAwesome name="trash-o" size={22} style={[styles.iconInput,{position:'relative',left:-8,top:-2,color:'#c4cdff'}]} />
                   </TouchableOpacity>
                 </View>
             </Animated.View>
        </View>
      );
	}
}
