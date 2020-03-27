import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity,TouchableWithoutFeedback, Image, TextInput, FlatList, ActivityIndicator, Animated, Alert, Modal } from 'react-native';
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
      fadeValueAlert:new Animated.Value(0),
      bottomValue: new Animated.Value(0),
      isSelected:0,
      message_alert: 'Por favor complete los campos vacios.',
      bgalert:'',
      showingPreloader:false,
      modalVisible:false,
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
      let c_client_id = JSON.stringify(prevProps.navigation.getParam('c_client_id','0')).replace(/\"/g,"");
      let s_sales_id = JSON.stringify(prevProps.navigation.getParam('s_sale_id','0')).replace(/\"/g,"");
      this.getShopping(c_client_id,s_sales_id);

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
    this.setState({bground:styles.bgroundActive,p_payment_product_id:id,isSelected:id});
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

  inactiveElementForDelete(){
    this.setState({bground:styles.bgGray,isSelected:0,p_payment_product_id:0});
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
                <View style={[styles.container_payment_client,this.state.isSelected == item.p_payment_product_id ? this.state.bground : styles.bgGray]}>
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

  getShopping(idc,ids){
    this.isMounted_ = true;
    if((idc == "0" && ids == "0") || (idc == "" && ids == "") || (idc == null || ids == null)) {
        const { c_client_id, s_sales_id } = this.state;
        let id = JSON.stringify({c_client_id: c_client_id,s_sales_id:s_sales_id});
        services.requestGet(routes.sales.list_id_sale,id)
        .then(res => {
          //alert(id);
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
          //alert(id);
        }).catch(function(error) {
          Alert.alert(
            error.message
          )
         // ADD THIS THROW error
          throw error;
        });
    }else{
        //alert("hello");
        let id = JSON.stringify({ c_client_id: idc,s_sales_id:ids });
        services.requestGet(routes.sales.list_id_sale,id)
        .then(res => {
          //alert(id);
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
          //alert(id);
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

  deleteBalances(){
    let data_ = JSON.stringify({
      p_payment_product_id: this.state.p_payment_product_id,
    });
    services.requestSet(routes.balances.delete,data_)
    .then(res => {
      //alert(res);
      if(res == "ok"){
        this.setState({message_alert:'Se ha eliminado el saldo correctamente!',bgalert:styles.bgroundGreen});
        this._start();
        this.setState({modalVisible:false,c_client_id:0});
      }else{
        this.setState({message_alert:'Ah ocurrido un error al intentar eliminar este saldo',bgalert:styles.bgroundRed});
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

  render(){
		const { fontsLoaded, poppins, poppinsBold, value, showing, expand, nameicon, nameorder,data,fadeValue,fadeValueAlert,bottomValue,message_alert,bgalert,showingPreloader,modalVisible} = this.state;
    var total = 0;
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
                  <Text style={[styles.title,{fontFamily:'Poppins-Bold',right:5,marginTop:4,}]}>¿Deseas Eliminar este Saldo?</Text>
                  <Text style={[{fontFamily:'Poppins',left:5,color:'#a4a6ac'}]}>Recuerda que al aceptar,este sera borrado de este cliente</Text>
                  <View style={styles.containerButton}>
                    <TouchableOpacity style={[styles.btnwground,{fontFamily:'Poppins'}]} onPress={() => this.deleteBalances()}><Text style={[{fontSize:12,color:'#5c5b5e',fontFamily:'Poppins-Bold',},styles.textgreen]}>ACEPTAR</Text></TouchableOpacity>
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
                   <TouchableOpacity style={[styles.btnwground,styles.btntextcenter,{borderRightWidth:1,borderRightColor:'#e1e1e6',width:90}]} onPress={() => this.props.navigation.navigate('AddBalances')}>
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
