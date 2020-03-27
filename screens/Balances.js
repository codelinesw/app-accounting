import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image, TextInput, Modal, ActivityIndicator, FlatList} from 'react-native';
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
      nameorder:'ASCENDETE',
      modalVisible:false,
      data:[''],
      isLoaded:false,
      isMounted_:false
    };
    this._count_ = 0;
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
      this.getBalances();
    }
  }

  componentDidMount(){
    this.getBalances();
    this.isMounted_ = true;
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

  getBalances(){
    this.isMounted_ = true;
    services.requestGet(routes.balances.list,0)
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

  _renderItems_(item,index){
    let style_ = (index%2) ? styles.bgroundPurpple : styles.bgroundGreen;
    if(item == "" || item == "undefined" || item == null){
      return  (<View style={[styles.container_preloader,{backgroundColor:'transparent'}]}>
        <View style={styles.preloader}><ActivityIndicator size="large" /></View>
      </View>)
    }else{
      if(Object.values(item) == "empty"){
        return (
          <View><Text style={{fontFamily:"Poppins",}}>No hay clientes aún</Text></View>
        )
      }else{
        return(
          <View style={[styles.box_information,styles.borderYellow]}>
             <Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>{item.c_name}</Text>
             <Text style={[styles.text,{fontFamily:"Poppins",}]}>Prenda: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>{item.p_name}</Text></Text>
             <Text style={[styles.text,{fontFamily:"Poppins",}]}>Cantidad: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>{item.s_count}</Text></Text>
             <Text style={[styles.text,{fontFamily:"Poppins",}]}>Fecha: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>{this.formatdate(item.s_sale_date)}</Text></Text>
             <Text style={[styles.text,{fontFamily:"Poppins",}]}>Valor: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>${this.moneyFormat(item.s_price)}</Text></Text>
             <Text style={[styles.text,{fontFamily:"Poppins",}]}>Abono: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>${this.moneyFormat(item.p_payment_product)}</Text></Text>
             <Text style={[{fontFamily:"Poppins",},styles.bottomRight]}>Saldo: <Text style={[styles.textlight,{fontFamily:"Poppins-Bold",}]}>${this.moneyFormat((parseInt(item.s_price) - parseInt(item.p_payment_product)))}</Text></Text>
             <TouchableOpacity style={[styles.btnfavorites,{width:15,}]} onPress={() => this.showModal()}>
                <FontAwesome name="ellipsis-v" size={14} style={{ color: '#a4a6ac' }} />
             </TouchableOpacity>
          </View>
        )
      }

    }
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
    this.setState({modalVisible:true});
  }
  Viewmore(){
    this.setState({modalVisible:false});
    this.props.navigation.navigate('ViewClient');
  }
  render(){
      const { fontsLoaded, poppins, poppinsBold, value, showing, expand, nameicon, nameorder, modalVisible,data } = this.state;
      var total = 0;
      data.map((item,i) => {
        total += parseInt(item.s_price) - parseInt(item.p_payment_product);
      });
      return(
        <View style={styles.container}>
             <View style={styles.body_}>
             <Modal
             animationType="fade"
             transparent={true}
             visible={modalVisible}
             onRequestClose={() => {
               Alert.alert('Modal has been closed.');
             }}
             >
               <View style={styles.containerModal}>
                 <View style={styles.containerOptions}>
                   <TouchableOpacity style={[styles.btnModal,{fontFamily:'Poppins'}]} onPress={this.Viewmore.bind(this)}><Text style={{fontSize:15,color:'#5c5b5e',fontFamily:'Poppins',}}>Ver más</Text></TouchableOpacity>
                   <TouchableOpacity style={[styles.btnModal,{fontFamily:'Poppins'},styles.btnTopradius]}><Text style={{fontSize:15,color:'#5c5b5e',fontFamily:'Poppins',}}>Compartir</Text></TouchableOpacity>
                   <TouchableOpacity style={[styles.btnModal,{fontFamily:'Poppins'},styles.btnTopradius]}><Text style={{fontSize:15,color:'#5c5b5e',fontFamily:'Poppins',}}>Editar</Text></TouchableOpacity>
                   <TouchableOpacity style={[styles.btnModal,{fontFamily:'Poppins'},styles.btnTopradius]}><Text style={{fontSize:15,color:'#5c5b5e',fontFamily:'Poppins',}}>Eliminar</Text></TouchableOpacity>
                 </View>
               </View>
             </Modal>
               <View style={styles.container_filters}>
                   <View style={[styles.bar_show_state_,styles.search_bar,{top:10,}]}>
                     <Ionicons name="md-search" size={30} color="#a4a6ac" style={{top:1,}}/>
                     <TextInput
                        style={[styles.inputSearch,styles.textsearch,{fontFamily:"Poppins",},expand ? styles.inputExpand : '']}
                        onChangeText={text => this.onchangetext(text)}
                        value={value}
                        placeholder="Buscas algo?"
                      />
                      {showing ? <TouchableOpacity style={[styles.btnfavorites,styles.btndeletetext]}>
                        <Ionicons name="md-close" color="#a4a6ac" size={22} />
                     </TouchableOpacity> : null}
                   </View>
                   <View style={[styles.btnGroup,styles.extandar_width]}>
                     <TouchableOpacity style={[styles.btnwgray,{flexDirection:'row'}]}>
                       <FontAwesome name="sliders" size={20} style={{ color: '#a4a6ac', marginLeft:2, }} />
                       <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>Filtrar</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.btnwgray,{flexDirection:'column'}]}>
                       <Text style={[styles.textlight,{position:'relative',top:-2,right:5,fontFamily:"Poppins", fontSize:10,}]}>Desde</Text>
                       <Text style={[styles.title,{position:'relative',top:-6,right:6,fontFamily:"Poppins",fontSize:11,}]}>11 Ene 2020</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.btnwgray,{flexDirection:'column'}]}>
                       <Text style={[styles.textlight,{position:'relative',top:-2,right:5,fontFamily:"Poppins", fontSize:10,}]}>Hasta</Text>
                       <Text style={[styles.title,{position:'relative',top:-6,right:6,fontFamily:"Poppins",fontSize:11,}]}>11 Ene 2020</Text>
                     </TouchableOpacity>
                   </View>
               </View>
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
               {/*<View style={[styles.box_information,styles.borderGreen]}>
                 <Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Jhon Denver Murillo Mendez</Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Prenda: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>Jean</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Cantidad: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>1</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Fecha: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}> 9/01/2019</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Valor: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>$80.000</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Abono: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>$10.000</Text></Text>
                 <Text style={[{fontFamily:"Poppins",},styles.bottomRight]}>Saldo: <Text style={[styles.textlight,{fontFamily:"Poppins-Bold",}]}>$70.000</Text></Text>
                 <TouchableOpacity style={[styles.btnfavorites,{width:15,}]} onPress={() => this.showModal()}>
                    <FontAwesome name="ellipsis-v" size={14} style={{ color: '#a4a6ac' }} />
                 </TouchableOpacity>
               </View>*/}
               <View style={{width:WIDTH,alignItems: 'center'}}>
                 <FlatList
                 contentContainerStyle={{ justifyContent: 'center', alignItems:'center', }}
                  style={{width:WIDTH}}
                  data={data}
                  renderItem={({ item,index }) => this._renderItems_(item,index)}
                  keyExtractor={(item,index) => {return index.toString()}}
                />
                <View style={[styles.bar_show_state_,styles.bar_balance]}>
                    <View style={[{flexDirection:'row',balignItems:'center'}]}>
                      <Text style={[{fontFamily:"Poppins",left:3}]}>Saldo Total:</Text>
                      <Text style={[styles.textlight,{fontFamily:"Poppins-Bold",top:-1}]}>${this.moneyFormat(total)}</Text>
                    </View>
                </View>
               </View>

             </View>

        </View>
      );
  }
}
