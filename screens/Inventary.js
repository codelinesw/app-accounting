import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image, TextInput,RefreshControl,FlatList,
ActivityIndicator, Animated, ScrollView } from 'react-native';
import styles from '../styles/styles_template';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Pie from 'react-native-pie';
import { connect } from 'react-redux';
import {
  getProducts,
  showOptions,
  isOptionVisible,
  setIndexProduct,
  getSelectedProductId,
  message,
  response,
  setResponse
} from '../src/actions';
import services from "../request/services";
import routes from "../request/routes";
import MenuControls from "../components/MenuControls";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class Inventary extends React.Component{

  static navigationOptions = ({ navigation, screenProps }) => ({
    title:'Inventarios',
    headerTitleStyle: {
         fontSize: 16,
         fontFamily:"Poppins",
         top:2,
     },
    headerRight:(
      <MenuControls navigation={navigation}/>
    )
  });

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
      arrayholder:[''],
      data:[''],
      isLoaded:false,
      fadeValue: new Animated.Value(0),
      fadeValueAlert:new Animated.Value(0),
      bottomValue: new Animated.Value(0),
      isSelected:0,
      message_alert: 'Por favor complete los campos vacios.',
      bgalert:'',
      showingPreloader:false,
      modalVisible:false,
      showMenu:false,
      IndexItem:0
    };
    this._count_ = 0;
    this.isMounted_ = false;
  }

  componentDidMount(){
    this.getProducts();
    // if(this.props.products.response == "ok"){
    //   this.setState({message_alert:'Se ha eliminado correctamente este producto',bgalert:styles.bgroundRed});
    //   this._start();
    // }
  }

  componentWillUnmount(){
    this.props.showOptions(false);
    this.props.setResponse('goback');
  }

  moneyFormat(num){
    num = (num == "") ? 0 : num;
    num = (num == null) ? 0 : num;
    num = num.toString();
    num = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return num;
  }

  _renderItems_(item,index){
    //alert(routes.baseulr+item.image);
    let activeItem = this.props.products.isOptionVisible;
    if(item == "" || item == "undefined" || item == null){
      return  (<View style={[styles.container_preloader,{backgroundColor:'transparent'}]}>
        <View style={styles.preloader}><ActivityIndicator size="large" /></View>
      </View>)
    }else{
      if(Object.values(item) == "empty"){
        return (
          <View><Text style={{fontFamily:"Poppins",}}>No hay products aún</Text></View>
        )
      }else{
          //alert(item.image);
          if(index > (this.state.data.length-2)){
            return(
              <View>
                <View style={[styles.container_divider,styles.container_divider_white,this.state.IndexItem == item.p_products_id ? styles.itemSelected : styles.itemnoSelected]}>
                  <View style={styles.panel_left}>
                  {
                    (item.image == "" || item.image == null || item.image == "undefined" || (typeof item.image == 'undefined' || item.image == undefined)) ? <View style={[styles.avatar,styles.bgroundGreen,{display:'flex',justifyContent:'center',alignItems:'center'}]}>
                      <Image source={require('../images/hoodie.png')} style={[styles.icon_link,{width:38,height:38}]} />
                    </View>
                    :<Image source={{uri:routes.baseurl.url+item.image}} style={[styles.avatar,styles.bgroundGreen,{display:'flex',justifyContent:'center',alignItems:'center'}]} />
                  }
                  </View>
                  <View style={styles.panel_right}>
                    <TouchableOpacity onPress={() => this.inactiveElementForDelete()} onLongPress={() => this.activeElementForDelete(item.p_products_id,index)}><Text style={[styles.title,{fontFamily:"Poppins-Bold",fontSize:14,marginTop:9,}]}>{item.p_name + " - " + "00"+index.toString()}</Text></TouchableOpacity>
                    <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:11,top:-2}]}>Cantidad en existencia {item.p_count}</Text>
                    <View style={{flexDirection:'row'}}>
                      <Text style={[styles.text,{fontFamily:"Poppins",fontSize:12,top:-5}]}>Precio de compra ${this.moneyFormat(item.p_price)}</Text>
                    </View>
                    <Text style={[{fontFamily:"Poppins-Bold"},styles.bottomRight]}>${this.moneyFormat(item.p_sale_price)}</Text>
                  </View>
                </View>
                <View style={[styles.bar_show_state_,styles.bar_balance,styles.bar_bnobottom]}>
                    <View style={[{flexDirection:'row',balignItems:'center'}]}>
                      <Text style={[{fontFamily:"Poppins",left:3}]}></Text>
                    </View>
                </View>
              </View>
            )
        }else{
          return(
            <View style={[styles.container_divider,styles.container_divider_white,this.state.IndexItem == item.p_products_id ? styles.itemSelected : styles.itemnoSelected]}>
              <View style={styles.panel_left}>
              {
                (item.image == "" || item.image == null || item.image == "undefined" || (typeof item.image == 'undefined' || item.image == undefined)) ? <View style={[styles.avatar,styles.bgroundGreen,{display:'flex',justifyContent:'center',alignItems:'center'}]}>
                  <Image source={require('../images/hoodie.png')} style={[styles.icon_link,{width:38,height:38}]} />
                </View>
                :<Image source={{uri:routes.baseurl.url+item.image}} style={[styles.avatar,styles.bgroundGreen,{display:'flex',justifyContent:'center',alignItems:'center'}]} />
              }
              </View>
              <View style={styles.panel_right}>
                <TouchableOpacity onPress={() => this.inactiveElementForDelete()} onLongPress={() => this.activeElementForDelete(item.p_products_id)}><Text style={[styles.title,{fontFamily:"Poppins-Bold",fontSize:14,marginTop:9,}]}>{item.p_name + " - " + "00"+index.toString()}</Text></TouchableOpacity>
                <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:11,top:-2}]}>Cantidad en existencia {item.p_count}</Text>
                <View style={{flexDirection:'row'}}>
                  <Text style={[styles.text,{fontFamily:"Poppins",fontSize:12,top:-5}]}>Precio de compra ${this.moneyFormat(item.p_price)}</Text>
                </View>
                <Text style={[{fontFamily:"Poppins-Bold"},styles.bottomRight]}>${this.moneyFormat(item.p_sale_price)}</Text>
              </View>
            </View>
          )

        }

      }
    }
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
        this.setState({data:res});
        this.props.getProducts(res);
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

  onRefresh() {
    //Clear old data of the list
    this.setState({ data_: [] });
    //Call the Service to get the latest data
    this.getProducts();
  }

  activeElementForDelete(id,index){

    if(!this.props.products.isOptionVisible){
      this.setState({IndexItem:id});
      this.props.showOptions(true);
      this.props.setIndexProduct(index);
      this.props.getSelectedProductId(id);
    }

  }

  inactiveElementForDelete(id){
    if(this.props.products.isOptionVisible){
      this.setState({IndexItem:0});
      this.props.showOptions(false);
    }
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
       setTimeout(() => {
         this.props.setResponse('goback');
         this.props.showOptions(false);
       },2000);
  };

  render(){
    const { fontsLoaded, poppins, poppinsBold, value, showing, expand, nameicon, nameorder, isLoaded, fadeValue, bottomValue, message_alert, bgalert } = this.state;
    if(this.props.products.response == "ok"){
      this._start();
    }

    return(
        <View style={styles.container}>
             <View style={styles.body_}>
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
               </View>
               <View style={styles.headerTitle}>
                  <Text style={[styles.textlight,{fontSize:12},{fontFamily:"Poppins",}]}>DETALLES DE LOS INGRESOS</Text>
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
               <View style={styles.container_details_accounting,{height:520,marginBottom:300}}>
                 <FlatList
                  contentContainerStyle={{ justifyContent: 'center', alignItems:'center'}}
                  style={{width:WIDTH}}
                  paddingEnable={false}
                  data={this.props.products.products}
                  renderItem={({ item,index }) => this._renderItems_(item,index)}
                  keyExtractor={(item,index) => {return index.toString()}}
                  refreshing={isLoaded}
                  onRefresh={this.getProducts}
                  refreshControl={
                    <RefreshControl
                      //refresh control used for the Pull to Refresh
                      refreshing={isLoaded}
                      onRefresh={this.onRefresh.bind(this)}
                    />
                  }
                 />
               </View>
             </View>
             <Animated.View style={[styles.toast_bottom,this.props.products.response == "ok" ? styles.bgroundGreen : (this.props.products.response == "goback") ? null : styles.bgroundRed, {opacity: fadeValue}]}>
               <Text style={[styles.textwhite,{position:'relative',left:7,fontFamily:'Poppins'}]}>{this.props.products.message}</Text>
             </Animated.View>
        </View>
      );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = {
  getProducts,
  showOptions,
  isOptionVisible,
  setIndexProduct,
  getSelectedProductId,
  message,
  response,
  setResponse
};

export default connect( mapStateToProps , mapDispatchToProps )(Inventary)
